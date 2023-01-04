import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import {
    createMockRetrieveOrderItems,
    createRetrieveListOfOrderDetail,
} from "src/squads/payment/test-utils/mocks/order-items";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useOrderItemsInfoListV2, {
    useOrderItemsInfoListV2Return,
} from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => ({
    __esModule: true,
    inferQueryWithGRPCPagination: jest.fn(),
}));

jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const showSnackbar = jest.fn();

const mockRetrieveListOfOrderDetail = createRetrieveListOfOrderDetail();
const mockBillingItems = createMockRetrieveOrderItems();

describe("useOrderItemsInfoListV2", () => {
    const std = mockWarner();

    it("should return Order items successfully", () => {
        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfOrderDetailProductsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfOrderDetailProductsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfProductsDetail") {
                        if (!callbackRan) {
                            options.onSuccess?.(mockRetrieveListOfOrderDetail);
                            callbackRan = true;
                        }

                        return {
                            results: { data: mockRetrieveListOfOrderDetail, isFetching: false },
                        };
                    }
                }
        );

        const {
            result: {
                current: { data },
            },
        }: RenderHookResult<{}, useOrderItemsInfoListV2Return> = renderHook(() =>
            useOrderItemsInfoListV2({ orderId: "order_id_1" })
        );

        expect(data?.itemsList).toEqual(mockBillingItems);
    });

    it("should log warning and show snackbar when the query fails", () => {
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfOrderDetailProductsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfOrderDetailProductsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfProductsDetail") {
                        options.onError?.(
                            Error("Error order - paymentGetRetrieveListOfProductsDetail")
                        );

                        return {
                            results: { data: undefined, isFetching: false },
                        };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() => useOrderItemsInfoListV2({ orderId: "order_id_1" }));

        expect(std.warn).toBeCalledWith(
            "useOrderItemsInfoListV2",
            Error("Error order - paymentGetRetrieveListOfProductsDetail")
        );
        expect(showSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData order - paymentGetRetrieveListOfProductsDetail`,
            "error"
        );
    });

    it("should not call useOrderItemsInfoListV2 when enabled is falsy", () => {
        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfOrderDetailProductsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfOrderDetailProductsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfProductsDetail") {
                        if (!callbackRan) {
                            options.onSuccess?.(mockRetrieveListOfOrderDetail);
                            options.enabled = false;
                            callbackRan = true;
                        }

                        return {
                            results: { status: "idle" },
                        };
                    }
                }
        );

        const {
            result: {
                current: { data },
            },
        }: RenderHookResult<{}, useOrderItemsInfoListV2Return> = renderHook(() =>
            useOrderItemsInfoListV2({ orderId: "order_id_1", enabled: false })
        );
        expect(data).toBeUndefined();
    });
});
