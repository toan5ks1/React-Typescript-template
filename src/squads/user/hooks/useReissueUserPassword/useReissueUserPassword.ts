import { useCallback } from "react";

import { inferMutation } from "src/squads/user/service/infer-service";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

export interface UseReissueUserPasswordReturn {
    reissueUserPassword: (
        userId: NsUsermgmtStudentService.ReissueUserPasswordReq
    ) => Promise<NsUsermgmtStudentService.ReissueUserPasswordResp>;
}

const useReissueUserPassword = (): UseReissueUserPasswordReturn => {
    const { mutateAsync: onMutation } = inferMutation({
        entity: "student",
        action: "userReissueUserPassword",
    })();

    const reissueUserPassword = useCallback(
        async (
            userId: NsUsermgmtStudentService.ReissueUserPasswordReq
        ): Promise<NsUsermgmtStudentService.ReissueUserPasswordResp> => {
            const resp = await onMutation(userId);
            return resp;
        },
        [onMutation]
    );

    return { reissueUserPassword };
};
export default useReissueUserPassword;
