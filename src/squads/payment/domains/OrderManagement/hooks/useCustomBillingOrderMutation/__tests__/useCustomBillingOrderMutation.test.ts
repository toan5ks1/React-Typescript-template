import { useHistory } from "react-router";
import inferMutation from "src/squads/payment/service/infer-mutation";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import {
    CustomBillingOrderRequest,
    CustomBillingOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { createMockCustomBillingOrderFormValue } from "src/squads/payment/test-utils/mocks/order-form-custom-billing";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { UseMutationOptions, MutationParams } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import { transformDataToCreateCustomBillingOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useCustomBillingOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useCustomBillingOrderMutation/useCustomBillingOrderMutation";

jest.mock("src/squads/payment/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
    };
});

const mockCustomBillingOrderFormValue = createMockCustomBillingOrderFormValue();
const mockOrderId = "order_id_1";
const mockErrorMessage = "CREATE CUSTOM BILLING ERROR";

const transformedData = transformDataToCreateCustomBillingOrder(
    mockCustomBillingOrderFormValue,
    OrderType.ORDER_TYPE_CUSTOM_BILLING
);

const mockInferMutationSuccess = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "orderPayment";
                action: keyof typeof orderPaymentService["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    MutationParams<CustomBillingOrderRequest>,
                    CustomBillingOrderResponse
                >
            ) => {
                switch (resource.action) {
                    case "paymentCustomBillingOrder":
                        return {
                            mutate: async (params: MutationParams<CustomBillingOrderRequest>) => {
                                await options?.onSuccess?.(
                                    { orderId: mockOrderId, successful: true },
                                    params,
                                    undefined
                                );
                            },
                            isLoading: false,
                        };
                    default:
                        break;
                }

                return { mutate: jest.fn() };
            }
    );
};

const mockInferMutationError = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "orderPayment";
                action: keyof typeof orderPaymentService["mutation"];
            }) =>
            (
                options?: UseMutationOptions<
                    MutationParams<CustomBillingOrderRequest>,
                    CustomBillingOrderResponse
                >
            ) => {
                switch (resource.action) {
                    case "paymentCustomBillingOrder":
                        return {
                            mutate: async (params: MutationParams<CustomBillingOrderRequest>) => {
                                await options?.onError?.(
                                    Error(mockErrorMessage),
                                    params,
                                    undefined
                                );
                            },
                        };
                    default:
                        break;
                }

                return { mutate: jest.fn() };
            }
    );
};

describe("useCustomBillingOrderMutation", () => {
    const std = mockWarner();

    it("should call onSuccess and show snackbar with success message of onCreateCustomBillingOrder", () => {
        const historyPush = jest.fn();
        mockInferMutationSuccess();

        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        const {
            result: {
                current: { onCreateCustomBillingOrder },
            },
        } = renderHook(() => useCustomBillingOrderMutation());

        onCreateCustomBillingOrder({ data: transformedData });

        expect(mockShowSnackbar).toHaveBeenCalledWith(
            "resources.orders.message.success.createCustomBillingOrder"
        );
        expect(historyPush).toBeCalledWith(`/payment/orders/${mockOrderId}/show`);
    });

    it("should call onError and show snackbar with error message of onCreateCustomBillingOrder", () => {
        mockInferMutationError();

        const {
            result: {
                current: { onCreateCustomBillingOrder },
            },
        } = renderHook(() => useCustomBillingOrderMutation());

        onCreateCustomBillingOrder({ data: transformedData });

        expect(mockShowSnackbar).toBeCalledWith(mockErrorMessage, "error");
        expect(std.warn).toBeCalledWith(`Error CreateCustomBillingOrder: ${mockErrorMessage}`);
    });
});
