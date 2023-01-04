import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetPackageByProductIdQuery,
    Payment_GetPackageByProductIdQueryVariables,
    Payment_GetPackagesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockProductPackageList } from "src/squads/payment/test-utils/mocks/products";

import packageQueriesFatima from "src/squads/payment/service/fatima/package-service/package-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockProductPackage = createMockProductPackageList();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetPackageByProductIdQuery> = {
    data: {
        package: mockProductPackage,
    },
};

describe("Product package query", () => {
    it("should return product package when calling getOne", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetPackageByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const result = await packageQueriesFatima.getOne(variables);

        expect(result).toEqual(mockProductPackage[0]);
    });

    it("should return product package when calling getMany", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetPackagesByProductIdsQueryVariables = {
            productIds: ["product_id_1"],
        };

        const result = await packageQueriesFatima.getMany(variables);

        expect(result).toEqual(mockProductPackage);
    });
});
