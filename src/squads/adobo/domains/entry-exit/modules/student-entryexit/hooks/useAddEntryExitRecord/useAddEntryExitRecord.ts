import { useCallback } from "react";

import { combineDateAndTime } from "src/common/utils/time";
import { AppError } from "src/internals/errors";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { inferMutation } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import type { UseMutationOptions } from "src/squads/adobo/domains/entry-exit/services/service-creator";

import useShowSnackbar from "src/squads/adobo/domains/entry-exit/hooks/useShowSnackbar";
import useTranslate from "src/squads/adobo/domains/entry-exit/hooks/useTranslate";

const useAddEntryExitRecord = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({
        entity: "studentEntryExit",
        action: "CREATE",
    })({
        onSuccess: () => {
            showSnackbar(t("ra.common.createdSuccess", { smart_count: 0 }));
        },
        onError: (e) => {
            if (AppError.isAppError(e)) {
                return showSnackbar(t(`ra.manabie-error.${e.message}`), "error");
            }

            showSnackbar(
                `${t("ra.common.createdFail")}: ${t("ra.manabie-error.unknown")}`,
                "error"
            );
        },
    });

    const addEntryExitRecord = useCallback(
        (
            params: EntryExitRecordFormData,
            options: UseMutationOptions<
                NsStudentEntryExitService.CreateEntryExitRequest,
                NsStudentEntryExitService.CreateEntryExitResponse
            >
        ) => {
            const entryDateTime = combineDateAndTime(params.entryDate, params.entryTime);

            let exitDateTime = null;

            if (params.exitTime) {
                exitDateTime = combineDateAndTime(params.entryDate, params.exitTime);
            }

            const payload: NsStudentEntryExitService.EntryExitPayload = {
                entryDateTime: entryDateTime,
                exitDateTime: exitDateTime,
                studentId: params.studentId,
                notifyParents: params.notifyParents,
            };

            const newRecord: NsStudentEntryExitService.CreateEntryExitRequest = {
                entryExitPayload: payload,
                ...payload,
            };

            mutate(newRecord, options);
        },
        [mutate]
    );

    return { addEntryExitRecord, isLoading };
};

export default useAddEntryExitRecord;
