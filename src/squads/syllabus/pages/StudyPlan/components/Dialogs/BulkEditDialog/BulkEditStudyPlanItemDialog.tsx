import { Fragment, memo, SyntheticEvent, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { Entities, Features } from "src/common/constants/enum";
import {
    combineDateAndTime,
    formatDate,
    setDefaultTime,
    setEndOfDate,
} from "src/common/utils/time";
import { TimeAutocompleteOption } from "src/models/time-autocomplete";

import TimePickerAutocompleteHF from "src/components/Autocompletes/TimePickerAutocompleteHF";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import TextFieldBase, { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";

import { StudyPlanItemDateField } from "../../../common/types";
import DialogTabPanel from "./DialogTabPanel";
import DialogTabsHeader from "./DialogTabsHeader";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { PostponeAdvanceDateType } from "src/squads/syllabus/pages/StudyPlan/hooks/studyPlanItemTable/useBulkActionUpdate";

const textFieldProps: Pick<TextFieldBaseProps, "size" | "type" | "sx"> = {
    size: "small",
    type: "number",
    sx: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
    },
};

type BulkEditDialogDateForm = {
    bulkEditDate: Date | null;
    bulkEditTime: TimeAutocompleteOption | null;
    bulkEditPostpone?: number;
    bulkEditAdvance?: number;
};

const defaultValues: BulkEditDialogDateForm = {
    bulkEditDate: null,
    bulkEditTime: null,
};

export interface BulkEditStudyPlanItemDialogProps {
    open: boolean;
    onUpdateDateTime: (date: string | null) => void;
    onPostponeAdvance: (type: PostponeAdvanceDateType, value: number) => void;
    onClose: () => void;
    dialogContext?: {
        label: string;
        fieldName: StudyPlanItemDateField;
    };
}

const BulkEditStudyPlanItemDialog = ({
    open,
    onClose,
    dialogContext,
    onUpdateDateTime,
    onPostponeAdvance,
}: BulkEditStudyPlanItemDialogProps) => {
    const { isEnabled: isStudyPlanBulkEditPhase2Enabled } = useFeatureToggle(
        Features.STUDY_PLAN_MANAGEMENT_BULK_EDIT_PHASE2
    );

    const [tabValue, setTabValue] = useState<number>(0);

    const t = useTranslate();

    const tCourse = useResourceTranslate(Entities.COURSES);

    const dialogTitle = tCourse("studyPlan.bulkEdit.editDate");

    const methods = useForm<BulkEditDialogDateForm>({
        defaultValues,
    });

    const { register, watch, reset, handleSubmit } = methods;

    const dateValue = watch("bulkEditDate");

    const tabPanels = useMemo(() => {
        return [
            {
                id: 0,
                columns: [
                    <DatePickerHF
                        key="bulkEditDate"
                        name="bulkEditDate"
                        label={dialogContext?.label}
                    />,
                    <TimePickerAutocompleteHF
                        key="bulkEditTime"
                        name="bulkEditTime"
                        getOptionSelectedField="value"
                        disabled={!dateValue}
                        placeholder="hh:mm"
                        sx={(theme) => ({
                            backgroundColor: dateValue ? {} : theme.palette.grey[50],
                        })}
                    />,
                ],
            },
            {
                id: 1,
                columns: [
                    <TextFieldBase
                        {...textFieldProps}
                        key="bulkEditPostpone"
                        inputProps={{
                            ...register("bulkEditPostpone"),
                            "data-testid": "BulkEditStudyPlanItemDialog__postponeInput",
                        }}
                        label={tCourse("studyPlan.bulkEdit.postpone")}
                    />,
                    <Fragment key="bulkEditPostpone_days">
                        {tCourse("studyPlan.bulkEdit.days")}
                    </Fragment>,
                ],
            },
            {
                id: 2,
                columns: [
                    <TextFieldBase
                        {...textFieldProps}
                        key="bulkEditAdvance"
                        inputProps={{
                            ...register("bulkEditAdvance"),
                            "data-testid": "BulkEditStudyPlanItemDialog__advanceInput",
                        }}
                        label={tCourse("studyPlan.bulkEdit.advance")}
                    />,
                    <Fragment key="bulkEditAdvance_days">
                        {tCourse("studyPlan.bulkEdit.days")}
                    </Fragment>,
                ],
            },
        ];
    }, [dateValue, dialogContext?.label, register, tCourse]);

    const handleChangeTab = (_: SyntheticEvent, newTab: number) => {
        reset(defaultValues);
        setTabValue(newTab);
    };

    const handleClose = () => {
        setTabValue(0);
        reset(defaultValues);
        onClose();
    };

    const handleSaveBulkUpdateField = ({
        bulkEditDate,
        bulkEditTime,
        bulkEditPostpone,
        bulkEditAdvance,
    }: BulkEditDialogDateForm) => {
        let updateDate: Date | null = null;
        // specific date
        if (bulkEditDate) {
            if (!bulkEditTime && dialogContext) {
                switch (dialogContext.fieldName) {
                    case "availableFrom":
                    case "startDate":
                        updateDate = setDefaultTime(bulkEditDate);
                        break;
                    case "availableTo":
                    case "endDate":
                        updateDate = setEndOfDate(bulkEditDate);
                        break;
                }
            }

            if (bulkEditTime?.value) {
                updateDate = combineDateAndTime(bulkEditDate, bulkEditTime.value);
            }
        }

        if (!bulkEditPostpone && !bulkEditAdvance) {
            onUpdateDateTime(updateDate ? formatDate(updateDate, "yyyy/LL/dd, HH:mm") : null);
        }

        // postpone
        if (bulkEditPostpone) {
            onPostponeAdvance("postpone", bulkEditPostpone);
        }
        // advance
        if (bulkEditAdvance) {
            onPostponeAdvance("advance", bulkEditAdvance);
        }

        handleClose();
    };

    return (
        <DialogWithHeaderFooterHF
            title={dialogTitle}
            header={
                isStudyPlanBulkEditPhase2Enabled ? (
                    <DialogTabsHeader
                        title={dialogTitle}
                        onClose={handleClose}
                        onChangeTab={handleChangeTab}
                        tabValue={tabValue}
                    />
                ) : undefined
            }
            open={open}
            onClose={handleClose}
            textSave={t("ra.common.action.update")}
            onSave={handleSubmit(handleSaveBulkUpdateField)}
            methods={methods}
            data-testid="BulkEditStudyPlanItem__dialog"
        >
            {tabPanels.map((panel) => {
                return (
                    <DialogTabPanel
                        key={panel.id}
                        index={panel.id}
                        tabValue={tabValue}
                        columns={panel.columns}
                    />
                );
            })}
        </DialogWithHeaderFooterHF>
    );
};

export default memo(BulkEditStudyPlanItemDialog);
