import { EurekaEntities } from "src/common/constants/enum";
import { AppError } from "src/squads/syllabus/internals/errors";
import logger from "src/squads/syllabus/internals/logger";
import { NsAssignmentEureka } from "src/squads/syllabus/services/eureka/assignment-eureka";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const useDeleteTaskAssignment = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const tTask = useResourceTranslate(EurekaEntities.TASK_ASSIGNMENTS);

    const { mutate, isLoading } = inferMutation({
        entity: "assignment",
        action: "syllabusDeleteAssignments",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.deleteSuccess",
                    {
                        smart_count: tTask(`task`),
                    },
                    { lowercase: true }
                )
            );
        },
        onError: (error) => {
            logger.warn("[TASK ASSIGNMENT delete]", error);

            if (AppError.isAppError(error)) {
                return showSnackbar(`${t("ra.common.deleteFail")}: ${t(error.message)}`, "error");
            }

            showSnackbar(`${t("ra.common.deleteFail")}: ${t("ra.manabie-error.unknown")}`, "error");
        },
    });

    const deleteTaskAssignment = (
        data: NsAssignmentEureka.DeleteAssignments,
        options: UseMutationOptions<NsAssignmentEureka.DeleteAssignments, {}>
    ) => {
        mutate(data, options);
    };

    return { deleteTaskAssignment, isLoading };
};

export default useDeleteTaskAssignment;
