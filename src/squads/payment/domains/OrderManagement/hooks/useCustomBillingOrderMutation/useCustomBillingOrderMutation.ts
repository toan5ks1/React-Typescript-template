import { UseMutateFunction } from "react-query";
import { useHistory } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import inferMutation from "src/squads/payment/service/infer-mutation";
import {
    CustomBillingOrderRequest,
    CustomBillingOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";

import { MutationParams } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseCustomBillingOrderMutationReturn {
    onCreateCustomBillingOrder: UseMutateFunction<
        CustomBillingOrderResponse,
        Error,
        MutationParams<CustomBillingOrderRequest>,
        unknown
    >;
    isOnCreateCustomBillingOrderLoading: boolean;
}

const useCustomBillingOrderMutation = (): UseCustomBillingOrderMutationReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const history = useHistory();

    const { mutate: onCreateCustomBillingOrder, isLoading: isOnCreateCustomBillingOrderLoading } =
        inferMutation({ entity: "orderPayment", action: "paymentCustomBillingOrder" })({
            onSuccess: (data) => {
                showSnackbar(tOrder("message.success.createCustomBillingOrder"));
                history.push(
                    `/${MicroFrontendTypes.PAYMENT}/${Entities.ORDERS}/${data.orderId}/show`
                );
            },

            onError: (error) => {
                showSnackbar(t(error.message), "error");
                window.warner?.warn(`Error CreateCustomBillingOrder: ${t(error.message)}`);
            },
        });

    return { onCreateCustomBillingOrder, isOnCreateCustomBillingOrderLoading };
};

export default useCustomBillingOrderMutation;
