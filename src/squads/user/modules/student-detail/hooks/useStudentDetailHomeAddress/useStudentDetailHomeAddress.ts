import { UserAddress } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface useStudentDetailHomeAddressReturn {
    isLoading: boolean;
    homeAddress?: UserAddress;
    refetch: () => void;
}

function useStudentDetailHomeAddress(studentId: string): useStudentDetailHomeAddressReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const { data, isFetching, refetch } = inferQuery({
        action: "userGetOneUserAddress",
        entity: "userAddress",
    })(
        {
            user_id: studentId,
        },
        {
            enabled: !!studentId,
            onError: (error) => {
                window.warner?.warn(`useStudentDetailHomeAddress get student home address`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    return { homeAddress: data, isLoading: isFetching, refetch };
}

export default useStudentDetailHomeAddress;
