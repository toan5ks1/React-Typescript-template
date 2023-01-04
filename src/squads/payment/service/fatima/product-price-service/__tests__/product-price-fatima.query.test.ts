import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyProductPricesByProductIdsQuery,
    Payment_GetManyProductPricesByProductIdsQueryVariables,
    Payment_GetProductPriceByProductIdQuery,
    Payment_GetProductPriceByProductIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockProductPriceList,
    createMockProductPriceManyList,
} from "src/squads/payment/test-utils/mocks/products";

import productPriceQueriesFatima from "src/squads/payment/service/fatima/product-price-service/product-price-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockProductPrice = createMockProductPriceList();
const mockProductPriceManyList = createMockProductPriceManyList();

const mockDoQueryGetOneReturnValue: HasuraAndDefaultResponse<Payment_GetProductPriceByProductIdQuery> =
    {
        data: {
            product_price: mockProductPrice,
        },
    };

const mockDoQueryGetManyReturnValue: HasuraAndDefaultResponse<Payment_GetProductPriceByProductIdQuery> =
    {
        data: {
            product_price: mockProductPrice,
        },
    };

const mockDoQueryGetManyByIdsReturnValue: HasuraAndDefaultResponse<Payment_GetManyProductPricesByProductIdsQuery> =
    {
        data: {
            product_price: mockProductPriceManyList,
        },
    };

describe("Product price query", () => {
    it("should return product price when calling getOne", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetOneReturnValue);

        const variables: Payment_GetProductPriceByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const result = await productPriceQueriesFatima.getOne(variables);

        expect(result).toEqual(mockProductPrice[0]);
    });

    it("should return product prices when calling getMany", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetManyReturnValue);

        const variables: Payment_GetProductPriceByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const result = await productPriceQueriesFatima.getMany(variables);

        expect(result).toEqual(mockProductPrice);
    });

    it("should return product price list when calling getManyPricesByIds", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetManyByIdsReturnValue);

        const variables: Payment_GetManyProductPricesByProductIdsQueryVariables = {
            productIds: ["product_id_1", "product_id_2", "product_id_3"],
        };

        const result = await productPriceQueriesFatima.getManyPricesByIds(variables);

        expect(result).toEqual(mockProductPriceManyList);
    });
});
