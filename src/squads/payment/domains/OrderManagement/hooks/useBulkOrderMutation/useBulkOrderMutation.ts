import { UseMutateFunction } from "react-query";
import { useHistory } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import inferMutation from "src/squads/payment/service/infer-mutation";
import {
    BulkOrderRequest,
    BulkOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";

import { MutationParams } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseBulkOrderMutationReturn {
    onCreateBulkOrder: UseMutateFunction<
        BulkOrderResponse,
        Error,
        MutationParams<BulkOrderRequest>,
        unknown
    >;
    isOnCreateBulkOrderLoading: boolean;
}

const useBulkOrderMutation = (): UseBulkOrderMutationReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const history = useHistory();

    const { mutate: onCreateBulkOrder, isLoading: isOnCreateBulkOrderLoading } = inferMutation({
        entity: "orderPayment",
        action: "paymentBulkOrder",
    })({
        onSuccess: () => {
            showSnackbar(tOrder("message.success.createOrder"));
            history.push(`/${MicroFrontendTypes.PAYMENT}/${Entities.ORDERS}`);
        },

        onError: (error) => {
            showSnackbar(t(error.message), "error");
            window.warner?.warn(`Error useBulkOrderMutation: ${error.message}`);
        },
    });

    return {
        onCreateBulkOrder,
        isOnCreateBulkOrderLoading,
    };
};

export default useBulkOrderMutation;
