import { useHistory } from "react-router";
import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import inferMutation from "src/squads/payment/service/infer-mutation";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import {
    BulkOrderRequest,
    BulkOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { createMockBulkOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form-bulk";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { UseMutationOptions, MutationParams } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import { transformDataToCreateOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useBulkOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useBulkOrderMutation/useBulkOrderMutation";
import ProductExtensionPluginsProvider, {
    useProductPluginsContext,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order";

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

const mockCreateMockBulkOrderFormValues = createMockBulkOrderFormValues();
const mockOrderId = "order_id_1";
const mockErrorMessage = "CREATE BULK ORDER ERROR";

const {
    result: {
        current: { getProductPluginsMap },
    },
} = renderHook(() => useProductPluginsContext(), {
    wrapper: ProductExtensionPluginsProvider,
});

const transformedData = transformDataToCreateOrder(
    mockCreateMockBulkOrderFormValues,
    OrderType.ORDER_TYPE_NEW,
    getProductPluginsMap,
    "bulk-students-orders"
);

const mockInferMutationSuccess = () => {
    (inferMutation as jest.Mock).mockImplementation(
        (resource: {
                entity: "orderPayment";
                action: keyof typeof orderPaymentService["mutation"];
            }) =>
            (options?: UseMutationOptions<MutationParams<BulkOrderRequest>, BulkOrderResponse>) => {
                switch (resource.action) {
                    case "paymentBulkOrder":
                        return {
                            mutate: async (params: MutationParams<BulkOrderRequest>) => {
                                await options?.onSuccess?.(
                                    {
                                        newOrderResponsesList: [
                                            { orderId: mockOrderId, successful: true },
                                        ],
                                    },
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
            (options?: UseMutationOptions<MutationParams<BulkOrderRequest>, BulkOrderResponse>) => {
                switch (resource.action) {
                    case "paymentBulkOrder":
                        return {
                            mutate: async (params: MutationParams<BulkOrderRequest>) => {
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

describe("useBulkOrderMutation", () => {
    const std = mockWarner();
    it("should call snackbar with success message of onCreateBulkOrder", () => {
        const historyPush = jest.fn();
        mockInferMutationSuccess();

        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        const {
            result: {
                current: { onCreateBulkOrder },
            },
        } = renderHook(() => useBulkOrderMutation());

        onCreateBulkOrder({ data: transformedData });

        expect(mockShowSnackbar).toHaveBeenCalledWith(
            "resources.orders.message.success.createOrder"
        );
        expect(historyPush).toBeCalledWith(`/${MicroFrontendTypes.PAYMENT}/${Entities.ORDERS}`);
    });

    it("should call snackbar with error message on error of onCreateBulkOrder", () => {
        mockInferMutationError();

        const {
            result: {
                current: { onCreateBulkOrder },
            },
        } = renderHook(() => useBulkOrderMutation());

        onCreateBulkOrder({ data: transformedData });

        expect(mockShowSnackbar).toBeCalledWith(mockErrorMessage, "error");
        expect(std.warn).toBeCalledWith(`Error useBulkOrderMutation: ${mockErrorMessage}`);
    });
});
