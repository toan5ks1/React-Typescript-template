import { Payment_GetProductPriceByProductIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { productPriceService } from "src/squads/payment/service/fatima/product-price-service/product-price-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockProductPriceList } from "src/squads/payment/test-utils/mocks/products";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import {
    ProductPriceListType,
    ProductPriceType,
} from "src/squads/payment/types/service/price-types";

import useProductPriceDetail, {
    UseProductPriceDetailProps,
    UseProductPriceDetailReturn,
} from "../useProductPriceDetail";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const onSuccess = jest.fn();
const showSnackbar = jest.fn();

const defaultProps: UseProductPriceDetailProps = {
    productId: "product_id_1",
    onSuccess,
};

const mockProductPrices = createMockProductPriceList();

describe("useProductPriceDetail get product price based on product_id", () => {
    const std = mockWarner();

    it("should return product price based on product_id", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productPrice";
                    action: keyof typeof productPriceService.query;
                }) =>
                (
                    _params: Payment_GetProductPriceByProductIdQueryVariables,
                    options: UseQueryBaseOptions<ProductPriceListType | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "productPrice") {
                            callbackRan = true;
                            options.onSuccess?.(mockProductPrices);
                        }

                        return {
                            data: mockProductPrices,
                            refetch: jest.fn(),
                            isLoading: false,
                        };
                    }

                    return {
                        data: null,
                        refetch: jest.fn(),
                        isLoading: false,
                    };
                }
        );

        const {
            result: {
                current: { productPriceDetailData },
            },
        }: RenderHookResult<UseProductPriceDetailProps, UseProductPriceDetailReturn> = renderHook(
            () => useProductPriceDetail(defaultProps)
        );

        expect(productPriceDetailData).toEqual(mockProductPrices);
        expect(onSuccess).toBeCalledWith(mockProductPrices);
    });

    it("should log warning and show snackbar when the query fails", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "productPrice";
                    action: keyof typeof productPriceService.query;
                }) =>
                (
                    _params: Payment_GetProductPriceByProductIdQueryVariables,
                    options: UseQueryBaseOptions<ProductPriceType | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "productPrice") {
                            callbackRan = true;

                            options.onError?.(
                                Error("ERROR paymentGetManyProductPricesByProductId")
                            );
                        }
                    }

                    return {
                        data: null,
                        refetch: jest.fn(),
                        isLoading: false,
                    };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderHook(() => useProductPriceDetail(defaultProps));

        expect(std.warn).toBeCalledWith(
            "useProductPriceDetail",
            Error("ERROR paymentGetManyProductPricesByProductId")
        );
        expect(showSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData paymentGetManyProductPricesByProductId`,
            "error"
        );
    });
});
