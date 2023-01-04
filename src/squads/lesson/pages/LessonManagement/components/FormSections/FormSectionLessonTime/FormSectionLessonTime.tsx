import { ReactNode, useMemo } from "react";

import { UseControllerProps, useFormContext, useFormState, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { timeIsAfter } from "src/common/utils/time";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

interface FormSectionLessonTimeRenderProps {
    validateRules: {
        startTime: UseControllerProps["rules"];
        endTime: UseControllerProps["rules"];
    };
    totalTimeByMinutes: number;
}

export interface FormSectionLessonTimeProps {
    render: (props: FormSectionLessonTimeRenderProps) => ReactNode;
}

const getTotalTimeByMinutes = (
    startTime: LessonManagementUpsertFormType["startTimeAutocomplete"],
    endTime: LessonManagementUpsertFormType["endTimeAutocomplete"]
) => {
    if (!startTime?.value || !endTime?.value) return 0;

    const milliseconds = endTime.value.getTime() - startTime.value.getTime();
    if (milliseconds <= 0) return 0;

    const RATIO_BETWEEN_SECONDS_AND_MILLISECONDS = 1 / 1000;
    const RATIO_BETWEEN_MINUTES_AND_SECONDS = 1 / 60;

    return (
        milliseconds * RATIO_BETWEEN_SECONDS_AND_MILLISECONDS * RATIO_BETWEEN_MINUTES_AND_SECONDS
    );
};

const FormSectionLessonTime = ({ render }: FormSectionLessonTimeProps) => {
    const tCommon = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { errors } = useFormState<LessonManagementUpsertFormType>();
    const { clearErrors } = useFormContext<LessonManagementUpsertFormType>();

    const [startTime, endTime] = useWatch<
        LessonManagementUpsertFormType,
        ["startTimeAutocomplete", "endTimeAutocomplete"]
    >({ name: ["startTimeAutocomplete", "endTimeAutocomplete"] });

    const errorMessage = tCommon("resources.input.error.timeMustComeBefore", {
        startTime: tLessonManagement("startTime"),
        endTime: tLessonManagement("endTime"),
    });

    const rulesForStartTime: UseControllerProps["rules"] = useMemo(() => {
        return {
            validate: (startTime: LessonManagementUpsertFormType["startTimeAutocomplete"]) => {
                if (!endTime?.value || !startTime?.value) return errorMessage;
                if (!timeIsAfter(endTime.value, startTime.value)) return errorMessage;

                errors["endTimeAutocomplete"] && clearErrors("endTimeAutocomplete");
                return undefined;
            },
        };
    }, [clearErrors, endTime, errorMessage, errors]);

    const rulesForEndTime: UseControllerProps["rules"] = useMemo(() => {
        return {
            validate: (endTime: LessonManagementUpsertFormType["endTimeAutocomplete"]) => {
                if (!endTime?.value || !startTime?.value) return errorMessage;
                if (!timeIsAfter(endTime.value, startTime.value)) return errorMessage;

                errors["startTimeAutocomplete"] && clearErrors("startTimeAutocomplete");
                return undefined;
            },
        };
    }, [clearErrors, errorMessage, errors, startTime]);

    const renderFormSection: ReactNode = useMemo(() => {
        return render({
            validateRules: { startTime: rulesForStartTime, endTime: rulesForEndTime },
            totalTimeByMinutes: getTotalTimeByMinutes(startTime, endTime),
        });
    }, [endTime, render, rulesForEndTime, rulesForStartTime, startTime]);

    return <>{renderFormSection}</>;
};

export default FormSectionLessonTime;
