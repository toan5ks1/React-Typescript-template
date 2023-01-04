import { CreateOrder } from "src/squads/payment/service/fatima/order-service/types";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import {
    BulkOrderRequest,
    CustomBillingOrderRequest,
} from "src/squads/payment/service/payment/order-payment-service/types";
import {
    createMockBulkOrderRequest,
    createMockBulkOrderResponse,
} from "src/squads/payment/test-utils/mocks/create-bulk-order";
import {
    createMockCreateOrderResponse,
    createMockOrderVariable,
} from "src/squads/payment/test-utils/mocks/create-order";
import {
    createMockCustomBillingOrderRequest,
    createMockCustomBillingOrderResponse,
} from "src/squads/payment/test-utils/mocks/create-order-custom-billing";

import { MutationParams } from "@manabie-com/react-utils";
import orderModifierMutationService from "src/squads/payment/service/payment/order-payment-service/order-payment-modifier.mutation";

jest.mock(
    "src/squads/payment/service/payment/order-payment-service/order-payment-modifier.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                createOrder: jest.fn(),
                createCustomBillingOrder: jest.fn(),
                createBulkOrder: jest.fn(),
            },
        };
    }
);

const mockOrderVariable = createMockOrderVariable();
const mockCreateOrderResponse = createMockCreateOrderResponse();
const mockCustomBillingOrderRequest = createMockCustomBillingOrderRequest();
const mockCustomBillingOrderResponse = createMockCustomBillingOrderResponse();
const mockBulkOrderRequest = createMockBulkOrderRequest();
const mockBulkOrderResponse = createMockBulkOrderResponse();

describe("create order by orderPaymentService", () => {
    it("should create order successfully", async () => {
        (orderModifierMutationService.createOrder as jest.Mock).mockResolvedValue(
            mockCreateOrderResponse
        );

        const queryVariable: MutationParams<CreateOrder> = {
            data: mockOrderVariable,
        };

        const response = await orderPaymentService.mutation.paymentCreateOrder(queryVariable);

        expect(orderModifierMutationService.createOrder).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockCreateOrderResponse);
    });
});

describe("create custom billing order by orderPaymentService", () => {
    it("should create custom billing order successfully", async () => {
        (orderModifierMutationService.createCustomBillingOrder as jest.Mock).mockResolvedValue(
            mockCustomBillingOrderResponse
        );

        const queryVariable: MutationParams<CustomBillingOrderRequest> = {
            data: mockCustomBillingOrderRequest,
        };

        const response = await orderPaymentService.mutation.paymentCustomBillingOrder(
            queryVariable
        );

        expect(orderModifierMutationService.createCustomBillingOrder).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockCustomBillingOrderResponse);
    });
});

describe("create bulk order by orderPaymentService", () => {
    it("should create bulk order successfully", async () => {
        (orderModifierMutationService.createBulkOrder as jest.Mock).mockResolvedValue(
            mockBulkOrderResponse
        );

        const queryVariable: MutationParams<BulkOrderRequest> = {
            data: mockBulkOrderRequest,
        };

        const response = await orderPaymentService.mutation.paymentBulkOrder(queryVariable);

        expect(orderModifierMutationService.createBulkOrder).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockBulkOrderResponse);
    });
});
