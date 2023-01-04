import get from "lodash/get";
import { useFormContext, useFormState, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { dateIsAfter } from "src/common/utils/time";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

const useValidateRulesForLessonDate = () => {
    const { errors } = useFormState<LessonManagementUpsertFormType>();
    const { clearErrors } = useFormContext<LessonManagementUpsertFormType>();
    const [date, endDate] = useWatch<LessonManagementUpsertFormType, ["date", "endDate"]>({
        name: ["date", "endDate"],
    });

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const rulesForStartDate = () => {
        return {
            validate: (startDate: Date) => {
                if (!endDate) return;
                if (!dateIsAfter(endDate, startDate)) {
                    return tLessonManagement("errors.startDateMustComeBeforeEndDate", {
                        startTime: tLessonManagement("startTime"),
                        endTime: tLessonManagement("endTime"),
                    });
                }

                get(errors, "endDate") && clearErrors("endDate");
                return undefined;
            },
        };
    };

    const rulesForEndDate = (isShowEndDate: boolean) => {
        return {
            validate: (endDate: Date | null) => {
                if (!endDate) {
                    if (!isShowEndDate) return;
                    return t("resources.input.error.required");
                }

                if (!dateIsAfter(endDate, date)) {
                    return tLessonManagement("errors.startDateMustComeBeforeEndDate");
                }

                get(errors, "date") && clearErrors("date");
                return undefined;
            },
        };
    };

    return {
        rulesForStartDate,
        rulesForEndDate,
    };
};

export default useValidateRulesForLessonDate;
