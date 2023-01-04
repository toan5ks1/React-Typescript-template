import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountBankBranchByIdsQuery,
    User_CountBankBranchByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import bankBranchQueryBob from "src/squads/payment/service/bob/bank-branch-bob-service/bank-branch-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

describe("bankBranchQueryBob", () => {
    it("countBankBranchByIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountBankBranchByIdsQuery> = {
            data: {
                bank_branch_aggregate: {
                    aggregate: mockResult,
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountBankBranchByIdsQueryVariables = {
            bankBranchIds: ["bank-branch-1"],
        };

        const result = await bankBranchQueryBob.countBankBranchByIds(variables);

        expect(result).toEqual(mockResult);
    });
});
