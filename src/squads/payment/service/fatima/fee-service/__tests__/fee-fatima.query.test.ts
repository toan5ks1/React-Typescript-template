import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetFeeByProductIdQuery,
    Payment_GetFeeByProductIdQueryVariables,
    Payment_GetManyFeesByProductIdsQuery,
    Payment_GetManyFeesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockProductFeeList,
    createMockProductFeeListWithProductId,
} from "src/squads/payment/test-utils/mocks/products";

import productFeeQueriesFatima from "src/squads/payment/service/fatima/fee-service/fee-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockProductFee = createMockProductFeeList();
const mockProductFeeListWithProductId = createMockProductFeeListWithProductId();

const mockDoQueryGetOneReturnValue: HasuraAndDefaultResponse<Payment_GetFeeByProductIdQuery> = {
    data: {
        fee: mockProductFee,
    },
};

const mockDoQueryGetManyReturnValue: HasuraAndDefaultResponse<Payment_GetManyFeesByProductIdsQuery> =
    {
        data: {
            fee: mockProductFeeListWithProductId,
        },
    };

describe("Product fee query", () => {
    it("should return product fee when calling getOne", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetOneReturnValue);

        const variables: Payment_GetFeeByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const result = await productFeeQueriesFatima.getOne(variables);

        expect(result).toEqual(mockProductFee[0]);
    });

    it("should return product fee list when calling getManyFeesByIds", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetManyReturnValue);

        const variables: Payment_GetManyFeesByProductIdsQueryVariables = {
            productIds: ["product_id_1", "product_id_2", "product_id_3"],
        };

        const result = await productFeeQueriesFatima.getManyFeesByIds(variables);

        expect(result).toEqual(mockProductFeeListWithProductId);
    });
});
