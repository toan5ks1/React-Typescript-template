import {
    Payment_GetManyStudentProductsByStudentProductIdsV2Query,
    Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { studentProductService } from "src/squads/payment/service/fatima/student-product-service/student-product-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockStudentProducts } from "src/squads/payment/test-utils/mocks/student-product";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useStudentProducts from "src/squads/payment/domains/OrderManagement/hooks/useStudentProducts";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

const mockStudentProducts = createMockStudentProducts();

describe("useStudentProducts", () => {
    const std = mockWarner();

    it("should return student products", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentProduct";
                    action: keyof typeof studentProductService.query;
                }) =>
                (
                    _params: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyStudentProductByStudentProductIds") {
                            callbackRan = true;

                            options.onSuccess?.(mockStudentProducts);

                            return {
                                data: mockStudentProducts,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const studentProductIds: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables["student_product_ids"] =
            [mockStudentProducts[0].student_product_id];

        const { result } = renderHook(() => useStudentProducts({ studentProductIds }));

        expect(result.current.data).toEqual(mockStudentProducts);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useStudentProducts");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "studentProduct";
                    action: keyof typeof studentProductService.query;
                }) =>
                (
                    _params: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyStudentProductsByStudentProductIdsV2Query["student_product"]
                        | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyStudentProductByStudentProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        const studentProductIds: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables["student_product_ids"] =
            [mockStudentProducts[0].student_product_id];

        const { result } = renderHook(() => useStudentProducts({ studentProductIds }));

        expect(std.warn).toBeCalledWith("useStudentProducts in Payment Order", queryError);

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData studentProduct - paymentGetManyStudentProductByStudentProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
