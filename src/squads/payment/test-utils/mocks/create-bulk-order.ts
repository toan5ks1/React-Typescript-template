import {
    BulkOrderRequest,
    BulkOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { createMockOrderVariable } from "src/squads/payment/test-utils/mocks/create-order";

const bulkOrderItem: number = 2;

const mockOrderVariable = createMockOrderVariable();

export const createMockBulkOrderRequest = (): BulkOrderRequest => {
    return { newOrderRequestsList: Array(bulkOrderItem).fill(mockOrderVariable) };
};

export const createMockBulkOrderResponse = (): BulkOrderResponse => {
    return {
        newOrderResponsesList: [
            {
                successful: true,
                orderId: "order_id_1",
            },
        ],
    };
};
