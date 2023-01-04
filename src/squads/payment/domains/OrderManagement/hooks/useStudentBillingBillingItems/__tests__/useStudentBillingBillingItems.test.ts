import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import {
    createMockBillingItems,
    createRetrieveListOfBillItems,
} from "src/squads/payment/test-utils/mocks/bill-item";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useStudentBillingBillingItems, {
    UseStudentBillingBillingItemsReturn,
} from "src/squads/payment/domains/OrderManagement/hooks/useStudentBillingBillingItems/useStudentBillingBillingItems";
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

const mockRetrieveListOfBillItems = createRetrieveListOfBillItems();
const mockBillingItems = createMockBillingItems();

describe("useStudentBillingBillingItems", () => {
    const std = mockWarner();

    it("should return student billing bill items successfully", () => {
        let callbackRan = false;

        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfBillItemsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfBillItemsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfBillItems") {
                        if (!callbackRan) {
                            options.onSuccess?.(mockRetrieveListOfBillItems);
                            callbackRan = true;
                        }

                        return {
                            results: { data: mockRetrieveListOfBillItems, isFetching: false },
                        };
                    }
                }
        );

        const {
            result: {
                current: { studentBillingBillingItemsData },
            },
        }: RenderHookResult<{}, UseStudentBillingBillingItemsReturn> = renderHook(() =>
            useStudentBillingBillingItems({ studentId: "student_id_1" })
        );

        expect(studentBillingBillingItemsData?.itemsList).toEqual(mockBillingItems);
    });

    it("should log warning and show snackbar when the query fails", () => {
        (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
            (request: {
                    entity: "orderPayment";
                    action: keyof typeof orderPaymentService["query"];
                }) =>
                (
                    _params: NsFatimaOrderService.RetrieveListOfBillItemsRequest,
                    options: UseQueryWithGRPCPaginationOptions<NsFatimaOrderService.RetrieveListOfBillItemsResponse>
                ) => {
                    if (request.action === "paymentGetRetrieveListOfBillItems") {
                        options.onError?.(Error("Error order - paymentGetRetrieveListOfBillItems"));

                        return {
                            results: { data: undefined, isFetching: false },
                        };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() => useStudentBillingBillingItems({ studentId: "student_id_1" }));

        expect(std.warn).toBeCalledWith(
            "useStudentBillingBillingItems",
            Error("Error order - paymentGetRetrieveListOfBillItems")
        );
        expect(showSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData order - paymentGetRetrieveListOfBillItems`,
            "error"
        );
    });
});
