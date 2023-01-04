import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetManyTaxesByTaxIdsQueryVariables,
    Payment_GetManyTaxesReferenceQuery,
    Payment_GetManyTaxesReferenceQueryVariables,
    Payment_GetTaxByTaxIdV2Query,
    Payment_GetTaxByTaxIdV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockGetManyTaxDataList,
    createMockGetManyTaxesReferenceDataList,
    createMockTaxDataList,
} from "src/squads/payment/test-utils/mocks/tax";

import taxFatimaQueries from "src/squads/payment/service/fatima/tax-fatima-service/tax-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockTaxList = createMockTaxDataList();
const mockGetManyTaxDataList = createMockGetManyTaxDataList();
const mockGetManyTaxesReference = createMockGetManyTaxesReferenceDataList();

const mockGetOneDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetTaxByTaxIdV2Query> = {
    data: {
        tax: mockTaxList,
    },
};

const mockGetManyTaxesByTaxIdsDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetManyTaxesByTaxIdsQuery> =
    {
        data: {
            tax: mockGetManyTaxDataList,
        },
    };

const mockGetAllTaxesDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetManyTaxesReferenceQuery> =
    {
        data: {
            tax: mockGetManyTaxesReference,
        },
    };

describe("Query tax", () => {
    it("Get one tax", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockGetOneDoQueryReturnValue);

        const variables: Payment_GetTaxByTaxIdV2QueryVariables = {
            tax_id: "tax_id_1",
        };

        const result = await taxFatimaQueries.getOne(variables);

        expect(result).toEqual(mockTaxList[0]);
    });

    it("Get many taxes by tax id", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockGetManyTaxesByTaxIdsDoQueryReturnValue);

        const variables: Payment_GetManyTaxesByTaxIdsQueryVariables = {
            tax_ids: ["tax_id_1", "tax_id_2"],
        };

        const result = await taxFatimaQueries.getManyTaxesByTaxIds(variables);

        expect(result).toEqual(mockGetManyTaxDataList);
    });

    it("Get all taxes", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockGetAllTaxesDoQueryReturnValue);

        const variables: Payment_GetManyTaxesReferenceQueryVariables = {
            limit: 5,
        };

        const result = await taxFatimaQueries.getManyReference(variables);

        expect(result).toEqual(mockGetManyTaxesReference);
    });
});
