import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyStudentProductsByStudentProductIdsV2Query,
    Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockStudentProducts } from "src/squads/payment/test-utils/mocks/student-product";

import studentProductFatimaQueries from "src/squads/payment/service/fatima/student-product-service/student-product-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockStudentProducts = createMockStudentProducts();

describe("Query student products", () => {
    it("Get many student products by student product ids", async () => {
        const mockStudentProductsDoQuery: HasuraAndDefaultResponse<Payment_GetManyStudentProductsByStudentProductIdsV2Query> =
            { data: { student_product: mockStudentProducts } };

        (doQuery as jest.Mock).mockReturnValue(mockStudentProductsDoQuery);

        const variables: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables = {
            student_product_ids: ["student_product_id_1", "student_product_id_2"],
        };

        const result = await studentProductFatimaQueries.getManyStudentProductByStudentProductIds(
            variables
        );

        expect(result).toEqual(mockStudentProducts);
    });
});
