import { UseMutateFunction } from "react-query";
import { Entities } from "src/common/constants/enum";
import inferMutation from "src/squads/payment/service/infer-mutation";
import {
    VoidOrderReq,
    VoidOrderResp,
} from "src/squads/payment/service/payment/order-payment-service/types";

import { MutationParams } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export type UseVoidOrderMutationReturn = {
    onVoid: UseMutateFunction<VoidOrderResp, Error, MutationParams<VoidOrderReq>, unknown>;
    isOnVoidLoading: boolean;
};
interface UseVoidOrderMutationProps {
    refetch: () => void;
}

const useVoidOrderMutation = ({
    refetch,
}: UseVoidOrderMutationProps): UseVoidOrderMutationReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { mutate: onVoid, isLoading: isOnVoidLoading } = inferMutation({
        entity: "orderPayment",
        action: "paymentVoidOrder",
    })({
        onSuccess: () => {
            showSnackbar(tOrder("message.success.voidOrder"));
            refetch();
        },

        onError: (error) => {
            showSnackbar(t(error.message), "error");
            window.warner?.warn(`Error useVoidOrderMutation: ${error.message}`);
        },
    });

    return { onVoid, isOnVoidLoading };
};

export default useVoidOrderMutation;
