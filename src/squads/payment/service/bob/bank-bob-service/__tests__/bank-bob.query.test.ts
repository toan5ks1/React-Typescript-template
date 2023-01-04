import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountBankByIdsQuery,
    User_CountBankByIdsQueryVariables,
    User_GetBanksByBankCodesQuery,
    User_GetBanksByBankCodesQueryVariables,
    User_CountBankByBankCodesQuery,
    User_CountBankByBankCodesQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import bankQueryBob from "src/squads/payment/service/bob/bank-bob-service/bank-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

describe("bankQueryBob", () => {
    it("countBankByIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountBankByIdsQuery> = {
            data: {
                bank_aggregate: {
                    aggregate: mockResult,
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountBankByIdsQueryVariables = {
            bankIds: ["bank-1"],
        };

        const result = await bankQueryBob.countBankByIds(variables);

        expect(result).toEqual(mockResult);
    });

    it("countBankByBankCodes", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountBankByBankCodesQuery> = {
            data: {
                bank_aggregate: {
                    aggregate: mockResult,
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountBankByBankCodesQueryVariables = {
            bankCodes: ["111"],
        };

        const result = await bankQueryBob.countBankByBankCodes(variables);

        expect(result).toEqual(mockResult);
    });

    it("getBanksByBankCodes", async () => {
        const mockResult = [
            {
                bank_id: "bank-1",
                bank_code: "111",
            },
        ];

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_GetBanksByBankCodesQuery> = {
            data: {
                bank: mockResult,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_GetBanksByBankCodesQueryVariables = {
            bankCodes: ["111"],
        };

        const result = await bankQueryBob.getBanksByBankCodes(variables);

        expect(result).toEqual(mockResult);
    });
});
