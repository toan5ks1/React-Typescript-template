import {
    Payment_GetManyProductsByProductIdsQuery,
    Payment_GetManyProductsByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { productService } from "src/squads/payment/service/fatima/product-service/product-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockProductsDetailList } from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import useProducts from "../useProducts";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockProductsDetailList = createMockProductsDetailList();

describe("useProducts", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "product"; action: keyof typeof productService.query }) =>
                (
                    _params: Payment_GetManyProductsByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyProductsByProductIdsQuery["product"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyProductsByProductIds") {
                            callbackRan = true;

                            options.onSuccess?.(mockProductsDetailList);

                            return {
                                data: mockProductsDetailList,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const productIds = mockProductsDetailList.map((product) => product.product_id);
        const { result } = renderHook(() =>
            useProducts({ productIds, options: { enabled: true } })
        );
        expect(result.current.data).toEqual(mockProductsDetailList);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useProductPriceDetail");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "product"; action: keyof typeof productService.query }) =>
                (
                    _params: Payment_GetManyProductsByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyProductsByProductIdsQuery["product"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyProductsByProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const productIds = mockProductsDetailList.map((product) => product.product_id);

        const { result } = renderHook(() =>
            useProducts({ productIds, options: { enabled: true } })
        );

        expect(std.warn).toBeCalledWith("useProducts in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData product - paymentGetManyProductsByProductIds",
            "error"
        );
        expect(result.current.data).toBeUndefined();
    });
});
