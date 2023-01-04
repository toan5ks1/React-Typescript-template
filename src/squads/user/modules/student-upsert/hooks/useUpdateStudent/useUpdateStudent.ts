import { UseMutateAsyncFunction } from "react-query";
import { ERPModules } from "src/common/constants/enum";
import { UpsertStudentPayloadType } from "src/squads/user/service/define-service/student-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

export interface UseUpdateStudentProps {
    onSuccess: () => void;
}

export interface UseUpdateStudentReturn {
    updateStudent: UseMutateAsyncFunction<
        NsUsermgmtStudentService.UpdateStudentResp | undefined,
        Error,
        UpsertStudentPayloadType,
        unknown
    >;
}

function useUpdateStudent({ onSuccess }: UseUpdateStudentProps): UseUpdateStudentReturn {
    const showSnackbar = useShowSnackbar();

    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    const { mutateAsync: updateStudent } = inferMutation({
        entity: "student",
        action: "userUpdateStudent",
    })({
        onSuccess: () => {
            showSnackbar(tStudents("messages.success.updateStudent"));
            onSuccess();
        },
    });

    return { updateStudent };
}

export default useUpdateStudent;
