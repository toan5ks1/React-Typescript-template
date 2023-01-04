import { useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { AppError } from "src/squads/syllabus/internals/errors";
import logger from "src/squads/syllabus/internals/logger";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const useDeleteLOs = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const loName = t(`resources.${Entities.LOS}.lo`);

    const { mutate, isLoading } = inferMutation({
        entity: "learningObjective",
        action: "syllabusLODelete",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.deleteSuccess",
                    {
                        smart_count: loName,
                    },
                    { lowercase: true }
                )
            );
        },
        onError: (error) => {
            logger.warn("[useDeleteLOs] LO delete", error);

            if (AppError.isAppError(error)) {
                return showSnackbar(`${t("ra.common.deleteFail")}: ${t(error.message)}`, "error");
            }

            showSnackbar(`${t("ra.common.deleteFail")}: ${t("ra.manabie-error.unknown")}`, "error");
        },
    });

    const deleteLOs = useCallback(
        (
            params: NsSyllabus_Yasuo_CoursesService.DeleteLos,
            options: UseMutationOptions<NsSyllabus_Yasuo_CoursesService.DeleteLos, {}>
        ) => {
            mutate(params, options);
        },
        [mutate]
    );

    return { deleteLOs, isLoading };
};

export default useDeleteLOs;
