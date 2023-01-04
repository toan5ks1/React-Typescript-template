import { UseMutateAsyncFunction } from "react-query";
import { ERPModules } from "src/common/constants/enum";
import { UpsertStudentPayloadType } from "src/squads/user/service/define-service/student-service";
import { inferMutation } from "src/squads/user/service/infer-service";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import type { DialogAccountInfoProps } from "src/squads/user/components/DialogAccountInfo";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useSafeState from "src/squads/user/hooks/useSafeState";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

export interface UseCreateStudentReturn {
    createStudent: UseMutateAsyncFunction<
        NsUsermgmtStudentService.CreateStudentResp | undefined,
        Error,
        UpsertStudentPayloadType,
        unknown
    >;
    setStudentAccountInfo: React.Dispatch<
        React.SetStateAction<DialogAccountInfoProps["student"] | undefined>
    >;
    studentAccountInfo: DialogAccountInfoProps["student"] | undefined;
}

export default function useCreateStudent(): UseCreateStudentReturn {
    const [studentAccountInfo, setStudentAccountInfo] = useSafeState<
        DialogAccountInfoProps["student"] | undefined
    >();

    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    const showSnackbar = useShowSnackbar();

    const { mutateAsync: createStudent } = inferMutation({
        entity: "student",
        action: "userCreateStudent",
    })({
        onSuccess: (resp) => {
            if (!resp) {
                window.warner?.log("Response create a student undefined");
                return;
            }

            const { studentPassword, student } = resp;
            showSnackbar(tStudents("messages.success.addStudent"));
            setStudentAccountInfo({
                email: student?.userProfile?.email,
                password: studentPassword,
                userId: student?.userProfile?.userId,
            });
        },
    });

    return { studentAccountInfo, setStudentAccountInfo, createStudent };
}
