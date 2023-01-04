import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetEnrollmentProductIdsByProductIdsQuery,
    Payment_GetEnrollmentProductIdsByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockEnrollmentProductIds } from "src/squads/payment/test-utils/mocks/enrollment";

import productSettingQueriesFatima from "src/squads/payment/service/fatima/product-setting-service/product-setting-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockEnrollmentProductId = "product_id_1";
const mockEnrollmentProductIds = [createMockEnrollmentProductIds()[0]];

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetEnrollmentProductIdsByProductIdsQuery> =
    {
        data: {
            product_setting: mockEnrollmentProductIds,
        },
    };

describe("Product setting query", () => {
    it("should return enrollment product ids when calling getEnrollmentProductIds", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const queryVariable: Payment_GetEnrollmentProductIdsByProductIdsQueryVariables = {
            productIds: [mockEnrollmentProductId],
        };
        const result = await productSettingQueriesFatima.getEnrollmentProductIdsByProductIds(
            queryVariable
        );

        expect(result).toEqual(mockEnrollmentProductIds);
    });
});
