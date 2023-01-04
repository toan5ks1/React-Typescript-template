import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyMaterialsByProductIdsV2Query,
    Payment_GetManyMaterialsByProductIdsV2QueryVariables,
    Payment_GetMaterialByProductIdQuery,
    Payment_GetMaterialByProductIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockProductMaterialList,
    createMockProductMaterialListWithProductId,
} from "src/squads/payment/test-utils/mocks/products";

import productMaterialQueriesFatima from "src/squads/payment/service/fatima/material-service/material-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockProductMaterial = createMockProductMaterialList();
const mockProductMaterialListWithProductId = createMockProductMaterialListWithProductId();

const mockDoQueryGetOneReturnValue: HasuraAndDefaultResponse<Payment_GetMaterialByProductIdQuery> =
    {
        data: {
            material: mockProductMaterial,
        },
    };
const mockDoQueryGetManyReturnValue: HasuraAndDefaultResponse<Payment_GetManyMaterialsByProductIdsV2Query> =
    {
        data: {
            material: mockProductMaterialListWithProductId,
        },
    };

describe("Product material query", () => {
    it("should return product material when calling getOne", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetOneReturnValue);

        const variables: Payment_GetMaterialByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const result = await productMaterialQueriesFatima.getOne(variables);

        expect(result).toEqual(mockProductMaterial[0]);
    });

    it("should return product material list when calling getManyMaterialsByIds", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetManyReturnValue);

        const variables: Payment_GetManyMaterialsByProductIdsV2QueryVariables = {
            productIds: ["product_id_1", "product_id_2", "product_id_3"],
        };

        const result = await productMaterialQueriesFatima.getManyMaterialsByIds(variables);

        expect(result).toEqual(mockProductMaterialListWithProductId);
    });
});
