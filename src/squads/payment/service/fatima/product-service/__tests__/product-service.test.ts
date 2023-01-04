import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables,
    Payment_GetManyProductsByProductIdsQueryVariables,
    Payment_GetManyProductsReferenceQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { productService } from "src/squads/payment/service/fatima/product-service/product-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockProductList } from "src/squads/payment/test-utils/mocks/products";

import productQueriesFatima from "src/squads/payment/service/fatima/product-service/product-fatima.query";

jest.mock("src/squads/payment/service/fatima/product-service/product-fatima.query", () => ({
    __esModule: true,
    default: {
        getManyByIncludedAndExcludedProductIds: jest.fn(),
        getManyReference: jest.fn(),
        getProductByIds: jest.fn(),
    },
}));

const mockProductList = createMockProductList();

describe("Product service", () => {
    it("should return product list when calling paymentGetManyReferenceProduct", async () => {
        const queryVariable: Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables = {
            product_ids: ["product_id_1", "product_id_2"],
        };

        (
            productQueriesFatima.getManyByIncludedAndExcludedProductIds as jest.Mock
        ).mockResolvedValue(mockProductList);

        const result = await productService.query.paymentGetManyReferenceProduct(queryVariable);

        expect(productQueriesFatima.getManyByIncludedAndExcludedProductIds).toBeCalledWith(
            queryVariable
        );
        expect(productQueriesFatima.getManyByIncludedAndExcludedProductIds).toBeCalledTimes(1);
        expect(result).toEqual(mockProductList);
    });

    it("should throw error if product_ids is undefined when calling paymentGetManyReferenceProduct", async () => {
        const queryVariable: Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables = {
            product_ids: undefined,
        };

        (
            productQueriesFatima.getManyByIncludedAndExcludedProductIds as jest.Mock
        ).mockResolvedValue(mockProductList);

        await expect(async () => {
            await productService.query.paymentGetManyReferenceProduct(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyReferenceProduct",
                errors: [{ field: "product_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productQueriesFatima.getManyByIncludedAndExcludedProductIds).not.toBeCalledWith(
            queryVariable
        );
    });

    it("should return product list when calling paymentGetManyReferenceAutocompleteProduct", async () => {
        const queryVariable: Payment_GetManyProductsReferenceQueryVariables = {
            name: "product name",
            limit: 10,
        };

        (productQueriesFatima.getManyReference as jest.Mock).mockResolvedValue(mockProductList);

        const result = await productService.query.paymentGetManyReferenceAutocompleteProduct(
            queryVariable
        );

        expect(productQueriesFatima.getManyReference).toBeCalledWith(queryVariable);
        expect(productQueriesFatima.getManyReference).toBeCalledTimes(1);
        expect(result).toEqual(mockProductList);
    });

    it("should return product list when calling paymentGetManyProductsByProductIds", async () => {
        const queryVariable: Payment_GetManyProductsByProductIdsQueryVariables = {
            productIds: ["product_id_1", "product_id_2"],
        };

        (productQueriesFatima.getProductByIds as jest.Mock).mockResolvedValue(mockProductList);

        const result = await productService.query.paymentGetManyProductsByProductIds(queryVariable);

        expect(productQueriesFatima.getProductByIds).toBeCalledWith(queryVariable);
        expect(productQueriesFatima.getProductByIds).toBeCalledTimes(1);
        expect(result).toEqual(mockProductList);
    });

    it("should throw an error if productIds is undefined when calling paymentGetManyProductsByProductIds", async () => {
        const queryVariable: Payment_GetManyProductsByProductIdsQueryVariables = {
            productIds: undefined,
        };

        (productQueriesFatima.getProductByIds as jest.Mock).mockResolvedValue(undefined);

        await expect(async () => {
            await productService.query.paymentGetManyProductsByProductIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyProductsByProductIds",
                errors: [{ field: "productIds", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productQueriesFatima.getProductByIds).not.toBeCalledWith(queryVariable);
    });
});
