import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import {
    createMockOrders,
    createRetrieveListOfOrders,
} from "src/squads/payment/test-utils/mocks/order-items";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useStudentBillingOrders, {
    UseStudentBillingOrdersReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingOrders/useStudentBillingOrders";

jest.mock("src/squads/payment/service/infer-query", () => ({
    __esModule: true,
    inferQueryWithGRPCPagination: jest.fn(),
}));

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

const mockOrders = createMockOrders();
const mockRetrieveListOfOrders = createRetrieveListOfOrders();

describe("useStudentBillingOrders", () => {
    const std = mockWarner();

    it("should return student billing order items successfully", () => {
        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfOrderItemsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfOrderItemsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfOrderItems") {
                        if (!callbackRan) {
                            options.onSuccess?.(mockRetrieveListOfOrders);
                            callbackRan = true;
                        }

                        return {
                            results: { data: mockRetrieveListOfOrders, isFetching: false },
                        };
                    }
                }
        );

        const {
            result: {
                current: { studentBillingOrdersData },
            },
        }: RenderHookResult<{}, UseStudentBillingOrdersReturn> = renderHook(() =>
            useStudentBillingOrders({ studentId: "student_id_1" })
        );

        expect(studentBillingOrdersData?.itemsList).toEqual(mockOrders);
    });

    it("should log warning and show snackbar when the query fails", () => {
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfOrderItemsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfOrderItemsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfOrderItems") {
                        options.onError?.(
                            Error("Error order - paymentGetRetrieveListOfOrderItems")
                        );

                        return {
                            results: { data: undefined, isFetching: false },
                        };
                    }
                }
        );

        renderHook(() => useStudentBillingOrders({ studentId: "student_id_1" }));

        expect(std.warn).toBeCalledWith(
            "useStudentBillingOrders",
            Error("Error order - paymentGetRetrieveListOfOrderItems")
        );
        expect(mockShowSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData order - paymentGetRetrieveListOfOrderItems`,
            "error"
        );
    });
});
