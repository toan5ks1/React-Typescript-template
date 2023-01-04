import { useHistory } from "react-router";
import {
    CreateOrder,
    CreateOrderResponse,
} from "src/squads/payment/service/fatima/order-service/types";
import inferMutation from "src/squads/payment/service/infer-mutation";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { UseMutationOptions, MutationParams } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import { transformDataToCreateOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useOrderMutation/useOrderMutation";
import ProductExtensionPluginsProvider, {
    useProductPluginsContext,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order";

jest.mock("src/squads/payment/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

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

const mockOrderFormValues = createMockCompleteOrderFormValues();
const mockOrderId = "1";
const mockErrorMessage = "CREATE ERROR";

const {
    result: {
        current: { getProductPluginsMap },
    },
} = renderHook(() => useProductPluginsContext(), {
    wrapper: ProductExtensionPluginsProvider,
});

const transformedData = transformDataToCreateOrder(
    mockOrderFormValues,
    OrderType.ORDER_TYPE_NEW,
    getProductPluginsMap,
    "single-student-order"
);

const mockInferMutationSuccess = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "orderPayment";
                action: keyof typeof orderPaymentService["mutation"];
            }) =>
            (options?: UseMutationOptions<MutationParams<CreateOrder>, CreateOrderResponse>) => {
                switch (resource.action) {
                    case "paymentCreateOrder":
                        return {
                            mutate: async (params: MutationParams<CreateOrder>) => {
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
            (options?: UseMutationOptions<MutationParams<CreateOrder>, CreateOrderResponse>) => {
                switch (resource.action) {
                    case "paymentCreateOrder":
                        return {
                            mutate: async (params: MutationParams<CreateOrder>) => {
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

const onCreateError = jest.fn();

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

describe("useOrderMutation call onSuccess", () => {
    it("should call snackbar with success message of onCreate", () => {
        const historyPush = jest.fn();
        mockInferMutationSuccess();

        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        const {
            result: {
                current: { onCreate },
            },
        } = renderHook(() => useOrderMutation({ onCreateError }));

        onCreate({ data: transformedData });

        expect(mockShowSnackbar).toHaveBeenCalledWith(
            "resources.orders.message.success.createOrder"
        );
        expect(historyPush).toBeCalledWith(`/payment/orders/${mockOrderId}/show`);
    });
});

describe("useOrderMutation call onError", () => {
    const std = mockWarner();

    it("should call snackbar with error message on error of onCreate", () => {
        mockInferMutationError();

        const {
            result: {
                current: { onCreate },
            },
        } = renderHook(() => useOrderMutation({ onCreateError }));

        onCreate({ data: transformedData });

        expect(mockShowSnackbar).toBeCalledWith(mockErrorMessage, "error");
        expect(std.warn).toBeCalledWith(`Error useOrderMutation: ${mockErrorMessage}`);
        expect(onCreateError).toBeCalledWith(mockErrorMessage);
    });
});
