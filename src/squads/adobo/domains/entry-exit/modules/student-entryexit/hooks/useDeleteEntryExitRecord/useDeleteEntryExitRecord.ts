import { useCallback } from "react";

import { AppError } from "src/internals/errors";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";

import useShowSnackbar from "src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar";
import useTranslate from "src/squads/adobo/domains/entry-exit/hooks/useTranslate";

const useDeleteEntryExitRecord = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({
        entity: "studentEntryExit",
        action: "DELETE",
    })({
        onSuccess: () => {
            showSnackbar(t("ra.common.deleteSuccess", { smart_count: 0 }));
        },
        onError: (e) => {
            if (AppError.isAppError(e)) {
                return showSnackbar(t(`ra.manabie-error.${e.message}`), "error");
            }

            showSnackbar(`${t("ra.common.deleteFail")}: ${t("ra.manabie-error.unknown")}`, "error");
        },
    });

    const deleteEntryExitRecord = useCallback(
        (
            params: NsStudentEntryExitService.DeleteEntryExitRequest,
            options: UseMutationOptions<
                NsStudentEntryExitService.DeleteEntryExitRequest,
                NsStudentEntryExitService.DeleteEntryExitResponse
            >
        ) => {
            mutate(params, options);
        },
        [mutate]
    );

    return { deleteEntryExitRecord, isLoading };
};

export default useDeleteEntryExitRecord;
