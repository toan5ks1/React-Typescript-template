import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import {
    createMockOrderProducts,
    createRetrieveListOfOrderProducts,
} from "src/squads/payment/test-utils/mocks/order-products";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useStudentBillingProductList, {
    UseStudentBillingProductListReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingProductList/useStudentBillingProductList";

jest.mock("src/squads/payment/service/infer-query", () => ({
    __esModule: true,
    inferQueryWithGRPCPagination: jest.fn(),
}));

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

const mockRetrieveListOfOrderProducts = createRetrieveListOfOrderProducts();
const mockOrderProducts = createMockOrderProducts();

describe("useStudentBillingProductList", () => {
    const std = mockWarner();

    it("should return student billing product list successfully", () => {
        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfOrderProductsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfOrderProductsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfOrderProducts") {
                        if (!callbackRan) {
                            options.onSuccess?.(mockRetrieveListOfOrderProducts);
                            callbackRan = true;
                        }

                        return {
                            results: { data: mockRetrieveListOfOrderProducts, isFetching: false },
                        };
                    }
                }
        );

        const {
            result: {
                current: { studentBillingProductListData },
            },
        }: RenderHookResult<{}, UseStudentBillingProductListReturn> = renderHook(() =>
            useStudentBillingProductList({ studentId: "student_id_1" })
        );

        expect(studentBillingProductListData?.itemsList).toEqual(mockOrderProducts);
    });

    it("should log warning and show snackbar when the product list query fails", () => {
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfOrderProductsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfOrderProductsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfOrderProducts") {
                        options.onError?.(
                            Error("Error order - paymentGetRetrieveListOfOrderProducts")
                        );

                        return {
                            results: { data: undefined, isFetching: false },
                        };
                    }
                }
        );

        renderHook(() => useStudentBillingProductList({ studentId: "student_id_1" }));

        expect(std.warn).toBeCalledWith(
            "useStudentBillingProductList",
            Error("Error order - paymentGetRetrieveListOfOrderProducts")
        );
        expect(mockShowSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData order - paymentGetRetrieveListOfOrderProducts`,
            "error"
        );
    });
});
