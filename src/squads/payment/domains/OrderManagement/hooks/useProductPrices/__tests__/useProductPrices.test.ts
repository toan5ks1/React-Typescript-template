import {
    Payment_GetManyProductPricesByProductIdsQuery,
    Payment_GetManyProductPricesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { productPriceService } from "src/squads/payment/service/fatima/product-price-service/product-price-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockProductPriceManyList } from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import useProducts from "../useProductPrices";

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

const mockProductPriceManyList = createMockProductPriceManyList();

describe("useProductPrices", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productPrice";
                    action: keyof typeof productPriceService.query;
                }) =>
                (
                    _params: Payment_GetManyProductPricesByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyProductPricesByProductIdsQuery["product_price"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyProductsPriceByProductIds") {
                            callbackRan = true;

                            options.onSuccess?.(mockProductPriceManyList);

                            return {
                                data: mockProductPriceManyList,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const productIds = mockProductPriceManyList.map((product) => product.product_id);
        const { result } = renderHook(() => useProducts({ productIds }));
        expect(result.current.data).toEqual(mockProductPriceManyList);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useProductPriceDetail");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productPrice";
                    action: keyof typeof productPriceService.query;
                }) =>
                (
                    _params: Payment_GetManyProductPricesByProductIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyProductPricesByProductIdsQuery["product_price"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyProductsPriceByProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const productIds = mockProductPriceManyList.map((product) => product.product_id);

        const { result } = renderHook(() => useProducts({ productIds }));

        expect(std.warn).toBeCalledWith("useProductPrices in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData productPrice - paymentGetManyProductsPriceByProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
