import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery,
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables,
    Payment_GetManyProductsByProductIdsQuery,
    Payment_GetManyProductsByProductIdsQueryVariables,
    Payment_GetManyProductsReferenceQuery,
    Payment_GetManyProductsReferenceQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockProductList } from "src/squads/payment/test-utils/mocks/products";

import productQueriesFatima from "src/squads/payment/service/fatima/product-service/product-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockProductList = createMockProductList();

describe("Product query", () => {
    it("should return product list when calling getManyByIncludedAndExcludedProductIds", async () => {
        const variables: Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables = {
            product_ids: ["product_id_1", "product_id_2"],
        };

        const mockProductListDoQuery: HasuraAndDefaultResponse<Payment_GetManyProductsByProductIdsAndAvailableDateQuery> =
            {
                data: {
                    product: mockProductList,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockProductListDoQuery);

        const result = await productQueriesFatima.getManyByIncludedAndExcludedProductIds(variables);

        expect(result).toEqual(mockProductList);
    });

    it("should return product list when calling getManyReference", async () => {
        const variables: Payment_GetManyProductsReferenceQueryVariables = {
            name: "product name",
            limit: 10,
        };

        const mockProductListReferenceDoQuery: HasuraAndDefaultResponse<Payment_GetManyProductsReferenceQuery> =
            {
                data: {
                    product: mockProductList,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockProductListReferenceDoQuery);

        const result = await productQueriesFatima.getManyReference(variables);

        expect(result).toEqual(mockProductList);
    });

    it("should return product list when calling getProductByIds", async () => {
        const variables: Payment_GetManyProductsByProductIdsQueryVariables = {
            productIds: ["product_id_1", "product_id_2"],
        };

        const mockProductListReferenceDoQuery: HasuraAndDefaultResponse<Payment_GetManyProductsByProductIdsQuery> =
            {
                data: {
                    product: mockProductList,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockProductListReferenceDoQuery);

        const result = await productQueriesFatima.getProductByIds(variables);

        expect(result).toEqual(mockProductList);
    });
});
