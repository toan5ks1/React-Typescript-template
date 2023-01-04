import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetProductIdsByLocationIdsQuery,
    Payment_GetProductIdsByLocationIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockLocationBasedProductIds } from "src/squads/payment/test-utils/mocks/products";

import productLocationQueriesFatima from "src/squads/payment/service/fatima/product-location-service/product-location-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockLocationBasedProductIds = createMockLocationBasedProductIds();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetProductIdsByLocationIdsQuery> = {
    data: {
        product_location: mockLocationBasedProductIds,
    },
};
describe("Product location query", () => {
    it("should return product location list when calling getProductIds", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetProductIdsByLocationIdsQueryVariables = {
            location_ids: ["location_id_1"],
        };

        const result = await productLocationQueriesFatima.getProductIds(variables);

        expect(result).toEqual(mockLocationBasedProductIds);
    });
});
