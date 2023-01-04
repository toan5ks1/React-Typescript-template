import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import {
    createMockFillDataFilter,
    createMockOrderList,
    createMockRetrieveOrder,
} from "src/squads/payment/test-utils/mocks/order";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import {
    RetrieveListOfOrdersRequest,
    RetrieveListOfOrdersResponse,
} from "manabuf/payment/v1/order_pb";

import useOrderList, { UseOrderListReturn } from "../useOrderList";

import { UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => ({
    __esModule: true,
    inferQueryWithGRPCPagination: jest.fn(),
}));

jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockRetrieveOrder = createMockRetrieveOrder();
const mockOrdersList = createMockOrderList();
const mockFillDataFilter = createMockFillDataFilter();
const pagination = createMockPaginationWithTotalObject();

const showSnackbar = jest.fn();
const goToFirstPage = jest.fn();

const mockUseOrderListModule = () => {
    let callbackRan = false;

    (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
        (request: { entity: "orderPayment"; action: keyof typeof orderPaymentService["query"] }) =>
            (
                _params: RetrieveListOfOrdersRequest.AsObject,
                options: UseQueryWithGRPCPaginationOptions<RetrieveListOfOrdersResponse.AsObject>
            ) => {
                if (request.action === "paymentGetListWithFilter") {
                    if (!callbackRan) {
                        options.onSuccess?.(mockRetrieveOrder);
                        callbackRan = true;
                    }
                }

                return {
                    results: { data: mockRetrieveOrder, isFetching: false, refetch: jest.fn() },
                    goToFirstPage,
                    pagination,
                };
            }
    );

    (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
};

describe("useOrderList filter, search list, and order status category", () => {
    const std = mockWarner();

    it("should return order list successfully", () => {
        mockUseOrderListModule();

        const {
            result: {
                current: { orders },
            },
        }: RenderHookResult<{}, UseOrderListReturn> = renderHook(() => useOrderList());

        expect(orders?.itemsList).toEqual(mockOrdersList);
    });

    it("should log warning and show snackbar when the query fails", () => {
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: RetrieveListOfOrdersRequest.AsObject,
                    options: UseQueryWithGRPCPaginationOptions<RetrieveListOfOrdersResponse.AsObject>
                ) => {
                    if (request.action === "paymentGetListWithFilter") {
                        options.onError?.(Error("ERROR order - paymentGetListWithFilter"));
                    }

                    return {
                        results: { data: undefined, isFetching: false },
                        goToFirstPage,
                    };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() => useOrderList());

        expect(std.warn).toBeCalledWith(
            "useOrderList",
            Error("ERROR order - paymentGetListWithFilter")
        );
        expect(showSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData order - paymentGetListWithFilter`,
            "error"
        );
    });

    it("should execute goToFirstPage correctly when onCategorize", () => {
        mockUseOrderListModule();

        const {
            result: {
                current: { onCategorize },
            },
        }: RenderHookResult<{}, UseOrderListReturn> = renderHook(() => useOrderList());

        act(() => {
            onCategorize(0);
        });

        expect(goToFirstPage).toBeCalledTimes(0);

        act(() => {
            onCategorize(1);
        });

        expect(goToFirstPage).toBeCalledTimes(1);
    });

    it("should execute goToFirstPage correctly when onSearch", () => {
        mockUseOrderListModule();

        const {
            result: {
                current: { onSearch },
            },
        }: RenderHookResult<{}, UseOrderListReturn> = renderHook(() => useOrderList());

        act(() => {
            onSearch("");
        });

        expect(goToFirstPage).toBeCalledTimes(0);

        act(() => {
            onSearch("keyword");
        });

        expect(goToFirstPage).toBeCalledTimes(1);
    });

    it("should execute goToFirstPage correctly when onFilter", () => {
        mockUseOrderListModule();

        const {
            result: {
                current: { onFilter },
            },
        }: RenderHookResult<{}, UseOrderListReturn> = renderHook(() => useOrderList());

        act(() => {
            onFilter(mockFillDataFilter);
        });

        expect(goToFirstPage).toBeCalledTimes(1);
    });
});
