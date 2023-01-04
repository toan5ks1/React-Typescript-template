import { useCallback, useMemo } from "react";

import { ERPModules, NotifyTypes, ModeOpenDialog } from "src/common/constants/enum";
import { CreateParentFormProps } from "src/squads/user/common/types";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseUpsertParentReturn {
    isLoading: boolean;
    upsertParent: (
        data: {
            formData: CreateParentFormProps;
            studentId: string;
        },
        options: UseMutationOptions<NsUsermgmtStudentService.UpsertParent, {}>
    ) => void;
}

export interface UseUpsertParentProps {
    mode: ModeOpenDialog;
}

const useUpsertParent = ({ mode }: UseUpsertParentProps) => {
    const t = useTranslate();
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const showSnackbar = useShowSnackbar();

    const isAddMode = useMemo(() => mode === ModeOpenDialog.ADD, [mode]);

    const { mutate, isLoading } = inferMutation({
        entity: "studentParent",
        action: isAddMode ? "userCreateParent" : "userUpdateParent",
    })({
        onSuccess: () => {
            showSnackbar(tStudents(`messages.success.${isAddMode ? "addParent" : "updateParent"}`));
        },
        onError: (err: Error) => {
            window.warner?.log("Upsert a parent error", err);
            showSnackbar(t(err.message), NotifyTypes.ERROR);
        },
    });

    const upsertParent: UseUpsertParentReturn["upsertParent"] = useCallback(
        ({ formData, studentId }, options) => {
            const payload = {
                studentId,
                parent: formData,
            };

            mutate(payload, options);
        },
        [mutate]
    );

    return {
        isLoading,
        upsertParent,
    };
};

export default useUpsertParent;
