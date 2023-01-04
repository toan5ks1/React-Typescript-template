import { arrayHasItem } from "src/common/utils/other";
import { UserAddress } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface useStudentHomeAddressesReturn {
    isLoading: boolean;
    mapHomeAddresses: Map<UserAddress["user_id"], UserAddress>;
}

const emptyMap = new Map<UserAddress["user_id"], UserAddress>();

function useStudentHomeAddresses(studentIds: string[]): useStudentHomeAddressesReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const { data = emptyMap, isFetching } = inferQuery({
        action: "userGetListUserAddress",
        entity: "userAddress",
    })(
        {
            user_ids: studentIds,
        },
        {
            enabled: arrayHasItem(studentIds),
            onError: (error) => {
                window.warner?.warn(`useStudentAddresses get student home addresses`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
            selector: (addresses) => {
                const mapHomeAddresses = new Map<UserAddress["user_id"], UserAddress>();

                (addresses || []).forEach((address) => {
                    mapHomeAddresses.set(address.user_id, address);
                });

                return mapHomeAddresses;
            },
        }
    );

    return { mapHomeAddresses: data, isLoading: isFetching };
}

export default useStudentHomeAddresses;
