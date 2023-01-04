import { CreateOrder } from "src/squads/payment/service/fatima/order-service/types";
import {
    BulkOrderRequest,
    CustomBillingOrderRequest,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { createMockBulkOrderRequest } from "src/squads/payment/test-utils/mocks/create-bulk-order";
import { createMockOrderVariable } from "src/squads/payment/test-utils/mocks/create-order";
import { createMockCustomBillingOrderRequest } from "src/squads/payment/test-utils/mocks/create-order-custom-billing";

import { OrderServicePromiseClient } from "manabuf/payment/v1/order_grpc_web_pb";

import { MutationParams } from "@manabie-com/react-utils";
import orderModifierMutationService, {
    newCreateBulkOrderRequest,
    newCreateCustomBillingOrderRequest,
    newCreateOrderRequest,
} from "src/squads/payment/service/payment/order-payment-service/order-payment-modifier.mutation";

jest.mock("manabuf/payment/v1/order_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/payment/v1/order_grpc_web_pb");

    actual.OrderServicePromiseClient.prototype.createOrder = jest.fn();
    actual.OrderServicePromiseClient.prototype.createCustomBilling = jest.fn();
    actual.OrderServicePromiseClient.prototype.createBulkOrder = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

const mockOrderVariable = createMockOrderVariable();
const mockBulkOrderRequest = createMockBulkOrderRequest();
const mockCustomBillingOrderRequest = createMockCustomBillingOrderRequest();

describe("createOrder successfully create order", () => {
    it("should successfully create order with valid variable", async () => {
        (OrderServicePromiseClient.prototype.createOrder as jest.Mock).mockImplementation(() => {
            return fakeReturn;
        });

        const queryVariable: MutationParams<CreateOrder> = {
            data: mockOrderVariable,
        };

        await orderModifierMutationService.createOrder(queryVariable);

        expect(OrderServicePromiseClient.prototype.createOrder).toBeCalledWith(
            newCreateOrderRequest(mockOrderVariable)
        );
    });

    it("should throw error when calling createOrder with invalid variable", async () => {
        (OrderServicePromiseClient.prototype.createOrder as jest.Mock).mockImplementation(() => {
            return fakeReturn;
        });

        const queryVariable: MutationParams<CreateOrder> = {
            data: undefined,
        };

        await expect(orderModifierMutationService.createOrder(queryVariable)).rejects.toThrow(
            Error("ra.message.invalid_form")
        );
    });
});

describe("createCustomBilling", () => {
    it("should successfully create custom billing order with valid variable", async () => {
        (OrderServicePromiseClient.prototype.createCustomBilling as jest.Mock).mockImplementation(
            () => {
                return fakeReturn;
            }
        );

        const queryVariable: MutationParams<CustomBillingOrderRequest> = {
            data: mockCustomBillingOrderRequest,
        };

        await orderModifierMutationService.createCustomBillingOrder(queryVariable);

        expect(OrderServicePromiseClient.prototype.createCustomBilling).toBeCalledWith(
            newCreateCustomBillingOrderRequest(mockCustomBillingOrderRequest)
        );
    });

    it("should throw error when calling createCustomBilling with invalid variable", async () => {
        (OrderServicePromiseClient.prototype.createCustomBilling as jest.Mock).mockImplementation(
            () => {
                return fakeReturn;
            }
        );

        const queryVariable: MutationParams<CustomBillingOrderRequest> = {
            data: undefined,
        };

        await expect(
            orderModifierMutationService.createCustomBillingOrder(queryVariable)
        ).rejects.toThrow(Error("ra.message.invalid_form"));
    });
});

describe("createBulkOrder", () => {
    it("should successfully create bulk order with valid variable", async () => {
        (OrderServicePromiseClient.prototype.createBulkOrder as jest.Mock).mockImplementation(
            () => {
                return fakeReturn;
            }
        );

        const queryVariable: MutationParams<BulkOrderRequest> = {
            data: mockBulkOrderRequest,
        };

        await orderModifierMutationService.createBulkOrder(queryVariable);

        expect(OrderServicePromiseClient.prototype.createBulkOrder).toBeCalledWith(
            newCreateBulkOrderRequest(mockBulkOrderRequest)
        );
    });

    it("should throw error when calling createBulkOrder with invalid variable", async () => {
        (OrderServicePromiseClient.prototype.createBulkOrder as jest.Mock).mockImplementation(
            () => {
                return fakeReturn;
            }
        );

        const queryVariable: MutationParams<BulkOrderRequest> = {
            data: undefined,
        };

        await expect(orderModifierMutationService.createBulkOrder(queryVariable)).rejects.toThrow(
            Error("ra.message.invalid_form")
        );
    });
});
