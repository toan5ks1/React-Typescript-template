import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import {
    createMockRetrieveBillingItem,
    createRetrieveBillingDetail,
} from "src/squads/payment/test-utils/mocks/bill-item";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useBillItemListV2, {
    useBillItemListV2Return,
} from "src/squads/payment/domains/OrderManagement/hooks/useBillItemListV2";
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

const mockRetrieveListOfOrderDetail = createRetrieveBillingDetail();
const mockBillingItems = createMockRetrieveBillingItem();

describe("useBillItemListV2", () => {
    const std = mockWarner();

    it("should return Order items successfully", () => {
        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveBillingOfOrderDetailsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveBillingOfOrderDetailsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveBillingOfProductsDetail") {
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
        }: RenderHookResult<{}, useBillItemListV2Return> = renderHook(() =>
            useBillItemListV2({ orderId: "order_id_1" })
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
                    _params: NsFatimaOrderService.RetrieveBillingOfOrderDetailsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveBillingOfOrderDetailsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveBillingOfProductsDetail") {
                        options.onError?.(
                            Error("Error order - paymentGetRetrieveBillingOfProductsDetail")
                        );

                        return {
                            results: { data: undefined, isFetching: false },
                        };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() => useBillItemListV2({ orderId: "order_id_1" }));

        expect(std.warn).toBeCalledWith(
            "useBillItemListV2",
            Error("Error order - paymentGetRetrieveBillingOfProductsDetail")
        );
        expect(showSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData order - paymentGetRetrieveBillingOfProductsDetail`,
            "error"
        );
    });
});
