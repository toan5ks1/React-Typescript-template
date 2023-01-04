import {
    Payment_GetManyFeesByProductIdsQuery,
    Payment_GetManyFeesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { feeService } from "src/squads/payment/service/fatima/fee-service/fee-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockProductFeeListWithProductId } from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useProductFees from "src/squads/payment/domains/OrderManagement/hooks/useProductFees";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockProductFeeListWithProductId = createMockProductFeeListWithProductId();

describe("useProductFees", () => {
    const std = mockWarner();

    it("should return correct data when calling useProductFees hook", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "fee"; action: keyof typeof feeService.query }) =>
                (
                    _params: Payment_GetManyFeesByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyFeesByProductIdsQuery["fee"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyProductFeesTypeByProductIds") {
                            callbackRan = true;
                            options.onSuccess?.(mockProductFeeListWithProductId);

                            return {
                                data: mockProductFeeListWithProductId,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const productIds = mockProductFeeListWithProductId.map((product) => product.fee_id);

        const { result } = renderHook(() => useProductFees({ productIds }));
        expect(result.current.data).toEqual(mockProductFeeListWithProductId);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useProductFees");

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "fee"; action: keyof typeof feeService.query }) =>
                (
                    _params: Payment_GetManyFeesByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyFeesByProductIdsQuery["fee"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyProductFeesTypeByProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const productIds = mockProductFeeListWithProductId.map((product) => product.fee_id);

        const { result } = renderHook(() => useProductFees({ productIds }));

        expect(std.warn).toBeCalledWith("useProductFees in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData fee - paymentGetManyProductFeesTypeByProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
