import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetProductIdsByGradeIdsQuery,
    Payment_GetProductIdsByGradeIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockGradeBasedProductIds } from "src/squads/payment/test-utils/mocks/products";

import productGradeFatimaQueries from "src/squads/payment/service/fatima/product-grade-service/product-grade-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockGradeBasedProductIds = createMockGradeBasedProductIds();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetProductIdsByGradeIdsQuery> = {
    data: {
        product_grade: mockGradeBasedProductIds,
    },
};

describe("Product grade query", () => {
    it("should return product grade list when calling getProductIds", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetProductIdsByGradeIdsQueryVariables = {
            grade_ids: [1, 2, 3],
        };

        const result = await productGradeFatimaQueries.getProductIds(variables);

        expect(result).toEqual(mockGradeBasedProductIds);
    });
});
