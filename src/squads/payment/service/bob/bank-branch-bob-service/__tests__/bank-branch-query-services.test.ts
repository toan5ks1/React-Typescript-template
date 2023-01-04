import { bankBranchQueryService } from "src/squads/payment/service/bob/bank-branch-bob-service/bank-branch-query-service";
import {
    User_CountBankBranchByIdsQuery,
    User_CountBankBranchByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import bankBranchQueryBob from "src/squads/payment/service/bob/bank-branch-bob-service/bank-branch-bob.query";

jest.mock("src/squads/payment/service/bob/bank-branch-bob-service/bank-branch-bob.query", () => {
    return {
        __esModule: true,
        default: {
            countBankBranchByIds: jest.fn(),
        },
    };
});

describe("bankBranchQueryService", () => {
    it("userCountBankByIds", async () => {
        const queryVariable: User_CountBankBranchByIdsQueryVariables = {
            bankBranchIds: ["bank-branch-1"],
        };

        const mockReturnValue: User_CountBankBranchByIdsQuery["bank_branch_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (bankBranchQueryBob.countBankBranchByIds as jest.Mock).mockResolvedValue(mockReturnValue);

        const response = await bankBranchQueryService.query.userCountBankBranchByIds(queryVariable);

        expect(bankBranchQueryBob.countBankBranchByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });
});
