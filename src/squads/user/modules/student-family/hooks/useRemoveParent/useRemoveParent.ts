import { useCallback } from "react";

import { ERPModules, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseRemoveParentReturn {
    removeParent: (
        data: NsUsermgmtStudentService.RemoveParentReq,
        options: UseMutationOptions<NsUsermgmtStudentService.RemoveParentReq, {}>
    ) => void;
}

const useRemoveParent = () => {
    const t = useTranslate();
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const showSnackbar = useShowSnackbar();

    const { mutateAsync } = inferMutation({ entity: "studentParent", action: "userRemoveParent" })({
        onSuccess: () => {
            showSnackbar(tStudents(`messages.success.removeParent`));
        },
    });

    const removeParent = useCallback(
        async (data, options) => {
            try {
                await mutateAsync(data, options);
            } catch (err) {
                window.warner?.log("Remove parent error", err);
                const error = handleUnknownError(err);
                showSnackbar(t(error.message), NotifyTypes.ERROR);
            }
        },
        [mutateAsync, showSnackbar, t]
    );

    return {
        removeParent,
    };
};

export default useRemoveParent;
