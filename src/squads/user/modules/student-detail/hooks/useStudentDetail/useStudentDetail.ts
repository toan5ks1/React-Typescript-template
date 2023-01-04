import { StudentInformation } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";
import type {
    UseQueryBaseOptions,
    UseQueryBaseV2Return,
} from "src/squads/user/service/service-creator";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export interface UseStudentDetailReturn<R> {
    student?: R;
    isLoading: boolean;
    refetch: UseQueryBaseV2Return<R>["refetch"];
}

export interface UseStudentDetailProps<R> {
    studentId: string;
    selector?: UseQueryBaseOptions<StudentInformation, R>["selector"];
}

export default function useStudentDetail<R>({
    studentId,
    selector,
}: UseStudentDetailProps<R>): UseStudentDetailReturn<R> {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const isShowNamePhonetic = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_PHONETIC_NAME");

    const {
        data: student,
        isLoading,
        refetch,
    } = inferQuery({
        action: isShowNamePhonetic ? "userGetOneStudentV4" : "userGetOneStudent",
        entity: "student",
    })(
        {
            id: studentId,
        },
        {
            enabled: true,
            selector,
            onError(error) {
                window.warner?.warn(`useStudentDetail fetch student data`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );
    return {
        student,
        isLoading,
        refetch,
    };
}
