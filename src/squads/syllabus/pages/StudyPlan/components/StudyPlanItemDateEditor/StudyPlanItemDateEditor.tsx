import { FocusEvent, forwardRef, useCallback } from "react";

import get from "lodash/get";
import { useFormContext } from "react-hook-form";
import { convertString } from "src/common/constants/helper";
import { useTimezoneCtx } from "src/squads/syllabus/contexts/timezone";

import { Tooltip } from "@mui/material";
import TextFieldHF, { TextFieldHFProps } from "src/components/TextFields/TextFieldHF";

import { datePattern, dateTimePattern } from "../../common/constants";
import { StudyPlanItemDateField, StudyPlanItemFormValues } from "../../common/types";
import { formatDate } from "../../common/utils";
import useStudyPlanItemDateRules from "../../hooks/useStudyPlanItemDateRules";

const isDateFormatValid = (date: string) => datePattern.test(date) || dateTimePattern.test(date);

const TextFieldHFWrapper = forwardRef<typeof TextFieldHF, TextFieldHFProps>((props, _ref) => (
    <TextFieldHF {...props} />
));

interface StudyPlanItemDateEditorProps {
    fieldName: StudyPlanItemDateField;
    studyPlanItemId: string;
    value: string;
}

const placeholder = "yyyy/mm/dd, hh:mm";

const StudyPlanItemDateEditor = (props: StudyPlanItemDateEditorProps) => {
    const { studyPlanItemId, fieldName } = props;

    const { timezone } = useTimezoneCtx();
    const {
        formState: { errors },
        getValues,
        setValue,
    } = useFormContext<StudyPlanItemFormValues>();
    const rules = useStudyPlanItemDateRules({ studyPlanItemId, fieldName });

    const prefixObjectKey: `studyPlanItem.${string}` = `studyPlanItem.${studyPlanItemId}`;
    const name: `studyPlanItem.${string}.${StudyPlanItemDateField}` = `studyPlanItem.${studyPlanItemId}.${fieldName}`;

    const setDefaultTime = useCallback(
        (value: string) => {
            switch (fieldName) {
                case "availableFrom":
                case "startDate": {
                    setValue(`${prefixObjectKey}.${fieldName}`, `${value}, 00:00`);
                    break;
                }
                case "availableTo":
                case "endDate": {
                    setValue(`${prefixObjectKey}.${fieldName}`, `${value}, 23:59`);
                    break;
                }
            }
        },
        [fieldName, setValue, prefixObjectKey]
    );

    const setDefaultEndDate = useCallback(
        (startDate: string) => {
            const endDate = new Date(startDate);
            const availableUntil = getValues(`${prefixObjectKey}.availableTo`);

            endDate.setDate(endDate.getDate() + 7);
            endDate.setHours(23);
            endDate.setMinutes(59);

            if (
                availableUntil &&
                isDateFormatValid(availableUntil) &&
                endDate > new Date(availableUntil)
            ) {
                endDate.setTime(new Date(availableUntil).getTime());
            }

            setValue(
                `${prefixObjectKey}.endDate`,
                formatDate({ isoDate: endDate.toISOString(), timezone, withYear: true }),
                {
                    shouldDirty: true,
                }
            );
        },
        [getValues, prefixObjectKey, setValue, timezone]
    );

    const onBlur = useCallback(
        ({ currentTarget: { value } }: FocusEvent<HTMLInputElement>) => {
            if (!value || !isDateFormatValid) return;

            if (datePattern.test(value)) {
                setDefaultTime(value);
            }

            if (fieldName === "startDate") {
                const isEndDateFilled = convertString(getValues(`${prefixObjectKey}.endDate`));

                if (isEndDateFilled) return;
                setDefaultEndDate(value);
            }
        },
        [fieldName, setDefaultTime, getValues, prefixObjectKey, setDefaultEndDate]
    );

    const onFocus = useCallback(({ currentTarget }: FocusEvent<HTMLInputElement>) => {
        currentTarget.select();
    }, []);

    return (
        <Tooltip title={get(errors, `${name}.message`, "")}>
            <span>
                <TextFieldHFWrapper
                    sx={(theme) => ({ backgroundColor: theme.palette.background.default })}
                    name={name}
                    placeholder={placeholder}
                    helperText={undefined}
                    rules={rules}
                    onBlur={onBlur}
                    onFocus={onFocus}
                />
            </span>
        </Tooltip>
    );
};

export default StudyPlanItemDateEditor;
