import { useCallback } from "react";

import { ERPModules, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { CreateParentFormProps } from "src/squads/user/common/types";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseAddExistingParentReturn {
    addExistingParent: (
        data: {
            formData: CreateParentFormProps;
            studentId: string;
        },
        options: UseMutationOptions<NsUsermgmtStudentService.UpsertParent, {}>
    ) => void;
}

const useAddExistingParent = () => {
    const t = useTranslate();
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const showSnackbar = useShowSnackbar();

    const { mutateAsync } = inferMutation({
        entity: "studentParent",
        action: "userUpdateParent",
    })({
        onSuccess: () => {
            showSnackbar(tStudents(`messages.success.addParent`));
        },
    });

    const addExistingParent: UseAddExistingParentReturn["addExistingParent"] = useCallback(
        async ({ formData, studentId }, options) => {
            try {
                const payload = {
                    studentId,
                    parent: formData,
                };

                await mutateAsync(payload, options);
            } catch (err) {
                window.warner?.log("Add existing parent error", err);
                const error = handleUnknownError(err);
                showSnackbar(t(error.message), NotifyTypes.ERROR);
            }
        },
        [mutateAsync, showSnackbar, t]
    );

    return {
        addExistingParent,
    };
};

export default useAddExistingParent;
