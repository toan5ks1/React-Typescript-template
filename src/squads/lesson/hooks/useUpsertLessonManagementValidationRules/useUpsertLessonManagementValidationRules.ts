import { timeIsAfter } from "src/common/utils/time";
import { TeacherMany } from "src/squads/lesson/service/bob/bob-modify-types";
import { TypeEntity } from "src/squads/lesson/typings/react-admin";

import { useFormContext } from "src/components/Forms/HookForm";

import useValidateHFEmptyArray from "../useValidateHFEmptyArray";

import useDatePickerPairHF from "src/squads/lesson/hooks/useDatePickerPairHF";
import { UseTranslateReturn } from "src/squads/lesson/hooks/useTranslate";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

const useUpsertLessonManagementValidationRules = (
    t: UseTranslateReturn,
    tResource: (resourceName: TypeEntity | string) => string
) => {
    useDatePickerPairHF("startDate", "endDate");
    const { getValues, clearErrors } = useFormContext<LessonManagementUpsertFormType>();

    return {
        teachers: {
            validate: useValidateHFEmptyArray<TeacherMany>(t("resources.input.error.required")),
        },
        center: {
            required: t("resources.input.error.required"),
        },
        startTime: {
            validate: (startTime: Date) => {
                if (!timeIsAfter(getValues("endTime"), startTime)) {
                    return t("resources.input.error.timeMustComeBefore", {
                        startTime: tResource("startTime"),
                        endTime: tResource("endTime"),
                    });
                } else clearErrors("endTime");
            },
        },
        endTime: {
            validate: (endTime: Date) => {
                if (!timeIsAfter(endTime, getValues("startTime"))) {
                    return t("resources.input.error.timeMustComeBefore", {
                        startTime: tResource("startTime"),
                        endTime: tResource("endTime"),
                    });
                } else clearErrors("startTime");
            },
        },
    };
};

export default useUpsertLessonManagementValidationRules;
