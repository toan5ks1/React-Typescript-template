import {
    CreateOrder,
    CreateOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";

import { OrderType } from "manabuf/payment/v1/enums_pb";

export const createMockOrderVariable = (): CreateOrder => {
    return {
        studentId: "student_id_1",
        locationId: "location_id_1",
        orderComment: "order_comment",
        orderType: OrderType.ORDER_TYPE_NEW,
        orderItemsList: [
            {
                productId: "product_id_1",
                courseItemsList: [],
                productAssociationsList: [],
            },
        ],
        billingItemsList: [],
        upcomingBillingItemsList: [],
    };
};

export const createMockCreateOrderResponse = (): CreateOrderResponse => {
    return {
        successful: true,
        orderId: "order_id_1",
    };
};
