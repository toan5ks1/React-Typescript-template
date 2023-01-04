import {
    CustomBillingOrderRequest,
    CustomBillingOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";

import { OrderType } from "manabuf/payment/v1/enums_pb";

export const createMockCustomBillingOrderRequest = (): CustomBillingOrderRequest => {
    return {
        studentId: createMockStudentInfo()["student_id"],
        locationId: createMockCenterChoices()[0]["locationId"],
        orderComment: "Test comment",
        customBillingItemsList: [
            {
                name: "Billing Item 1",
                price: 1000,
            },
        ],
        orderType: OrderType.ORDER_TYPE_CUSTOM_BILLING,
    };
};

export const createMockCustomBillingOrderResponse = (): CustomBillingOrderResponse => {
    return {
        successful: true,
        orderId: "order_id_1",
    };
};
