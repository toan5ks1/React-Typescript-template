import { useCallback } from "react";

import { combineDateAndTime } from "src/common/utils/time";
import { AppError } from "src/internals/errors";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";

import useShowSnackbar from "src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar";
import useTranslate from "src/squads/adobo/domains/entry-exit/hooks/useTranslate";

export interface EditEntryExitRecordParams {
    updatedFormData: EntryExitRecordFormData;
    entryExitId: number;
}

const useEditEntryExitRecord = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({
        entity: "studentEntryExit",
        action: "UPDATE",
    })({
        onSuccess: () => {
            showSnackbar(t("ra.common.editedSuccess", { smart_count: 0 }));
        },
        onError: (e) => {
            if (AppError.isAppError(e)) {
                return showSnackbar(t(`ra.manabie-error.${e.message}`), "error");
            }

            showSnackbar(`${t("ra.common.editedFail")}: ${t("ra.manabie-error.unknown")}`, "error");
        },
    });

    const editEntryExitRecord = useCallback(
        (
            params: EditEntryExitRecordParams,
            options: UseMutationOptions<
                NsStudentEntryExitService.UpdateEntryExitRequest,
                NsStudentEntryExitService.UpdateEntryExitResponse
            >
        ) => {
            const { updatedFormData, entryExitId } = params;
            const entryDateTime = combineDateAndTime(
                updatedFormData.entryDate,
                updatedFormData.entryTime
            );

            let exitDateTime = null;

            if (updatedFormData.exitTime) {
                exitDateTime = combineDateAndTime(
                    updatedFormData.entryDate,
                    updatedFormData.exitTime
                );
            }

            const payload: NsStudentEntryExitService.EntryExitPayload = {
                entryDateTime: entryDateTime,
                exitDateTime: exitDateTime,
                studentId: updatedFormData.studentId,
                notifyParents: updatedFormData.notifyParents,
            };

            const updatedRecord: NsStudentEntryExitService.UpdateEntryExitRequest = {
                entryexitId: entryExitId,
                entryExitPayload: payload,
            };

            mutate(updatedRecord, options);
        },
        [mutate]
    );

    return { editEntryExitRecord, isLoading };
};

export default useEditEntryExitRecord;
