import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/common/providers/ProductExtensionPluginsProvider";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { transformDataToCreateOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useOrderMutation";

export interface UseSubmitOrderProps {
    orderType: OrderType;
    onCreateError: (error: string) => void;
}

export interface UseSubmitOrderReturn {
    isOnCreateLoading: boolean;
    createOrder: (data: OrderFormValues) => void;
}

const useSubmitOrder = ({
    orderType,
    onCreateError,
}: UseSubmitOrderProps): UseSubmitOrderReturn => {
    const { onCreate, isOnCreateLoading } = useOrderMutation({
        onCreateError,
    });

    const { getProductPluginsMap } = useProductPluginsContext();

    const createOrder = (data: OrderFormValues) => {
        const dataToSubmit = transformDataToCreateOrder(
            data,
            orderType,
            getProductPluginsMap,
            "single-student-order"
        );

        onCreate({ data: dataToSubmit });
    };

    return { createOrder, isOnCreateLoading };
};

export default useSubmitOrder;
