import { UseMutateFunction } from "react-query";
import { useHistory } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import {
    CreateOrder,
    CreateOrderResponse,
} from "src/squads/payment/service/fatima/order-service/types";
import inferMutation from "src/squads/payment/service/infer-mutation";

import { MutationParams } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseOrderMutationProps {
    onCreateError: (error: string) => void;
}

export type UseOrderMutationReturn = {
    onCreate: UseMutateFunction<CreateOrderResponse, Error, MutationParams<CreateOrder>, unknown>;
    isOnCreateLoading: boolean;
};

const useOrderMutation = ({ onCreateError }: UseOrderMutationProps): UseOrderMutationReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const history = useHistory();

    const { mutate: onCreate, isLoading: isOnCreateLoading } = inferMutation({
        entity: "orderPayment",
        action: "paymentCreateOrder",
    })({
        onSuccess: (data) => {
            showSnackbar(tOrder("message.success.createOrder"));
            history.push(`/${MicroFrontendTypes.PAYMENT}/${Entities.ORDERS}/${data.orderId}/show`);
        },

        onError: (error) => {
            showSnackbar(t(error.message), "error");
            window.warner?.warn(`Error useOrderMutation: ${error.message}`);
            onCreateError(t(error.message));
        },
    });

    return { onCreate, isOnCreateLoading };
};

export default useOrderMutation;
