import { bankQueryService } from "src/squads/payment/service/bob/bank-bob-service/bank-query-service";
import {
    User_CountBankByIdsQuery,
    User_CountBankByIdsQueryVariables,
    User_GetBanksByBankCodesQuery,
    User_GetBanksByBankCodesQueryVariables,
    User_CountBankByBankCodesQuery,
    User_CountBankByBankCodesQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import bankQueryBob from "src/squads/payment/service/bob/bank-bob-service/bank-bob.query";

jest.mock("src/squads/payment/service/bob/bank-bob-service/bank-bob.query", () => {
    return {
        __esModule: true,
        default: {
            countBankByIds: jest.fn(),
            getBanksByBankCodes: jest.fn(),
            countBankByBankCodes: jest.fn(),
        },
    };
});

describe("bankQueryService", () => {
    it("userCountBankByIds", async () => {
        const queryVariable: User_CountBankByIdsQueryVariables = {
            bankIds: ["bank-1"],
        };

        const mockReturnValue: User_CountBankByIdsQuery["bank_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (bankQueryBob.countBankByIds as jest.Mock).mockResolvedValue(mockReturnValue);

        const response = await bankQueryService.query.userCountBankByIds(queryVariable);

        expect(bankQueryBob.countBankByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });

    it("countBankByBankCodes", async () => {
        const queryVariable: User_CountBankByBankCodesQueryVariables = {
            bankCodes: ["111"],
        };

        const mockReturnValue: User_CountBankByBankCodesQuery["bank_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (bankQueryBob.countBankByBankCodes as jest.Mock).mockResolvedValue(mockReturnValue);

        const response = await bankQueryService.query.userCountBankByBankCodes(queryVariable);

        expect(bankQueryBob.countBankByBankCodes).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });

    it("getBanksByBankCodes", async () => {
        const queryVariable: User_GetBanksByBankCodesQueryVariables = {
            bankCodes: ["111"],
        };

        const mockReturnValue: User_GetBanksByBankCodesQuery["bank"] = [
            {
                bank_id: "bank-1",
                bank_code: "111",
            },
        ];

        (bankQueryBob.getBanksByBankCodes as jest.Mock).mockResolvedValue(mockReturnValue);

        const response = await bankQueryService.query.userGetBanksByBankCodes(queryVariable);

        expect(bankQueryBob.getBanksByBankCodes).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });
});
