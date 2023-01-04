import { bankQueryService } from "src/squads/payment/service/bob/bank-bob-service/bank-query-service";
import { bankBranchQueryService } from "src/squads/payment/service/bob/bank-branch-bob-service/bank-branch-query-service";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { BankBranchCSV } from "../../types";
import { validateBankBranchImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateBankBranchImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateBankBranchImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateBankBranchImportData([
                {
                    bank_branch_id: "bank-branch-1",
                    bank_branch_code: "111",
                    bank_branch_name: "Bank Branch 1",
                    bank_branch_phonetic_name: "Bank Branch 1",
                    bank_code: "111",
                    is_archived: "1",
                    invalid_header: "123",
                } as BankBranchCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateBankBranchImportData([
                {
                    bank_branch_id: "bank-branch-1",
                    bank_branch_code: "",
                    bank_branch_name: "",
                    bank_branch_phonetic_name: "",
                    bank_code: "",
                    is_archived: "1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid is_archived value", async () => {
        await expect(async () => {
            await validateBankBranchImportData([
                {
                    bank_branch_id: "bank-branch-1",
                    bank_branch_code: "111",
                    bank_branch_name: "Bank Branch 1",
                    bank_branch_phonetic_name: "Bank Branch 1",
                    bank_code: "111",
                    is_archived: "invalid",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid bank_branch_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "bankBranch";
                    action: keyof typeof bankBranchQueryService.query;
                }) =>
                () => {
                    if (resource.action === "userCountBankBranchByIds") {
                        return {
                            count: 0,
                        };
                    }
                }
        );

        await expect(async () => {
            await validateBankBranchImportData([
                {
                    bank_branch_id: "invalid-id",
                    bank_branch_code: "111",
                    bank_branch_name: "Bank Branch 1",
                    bank_branch_phonetic_name: "Bank Branch 1",
                    bank_code: "111",
                    is_archived: "1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid bank_codes", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "bankBranch" | "bank";
                    action:
                        | keyof typeof bankBranchQueryService.query
                        | keyof typeof bankQueryService.query;
                }) =>
                () => {
                    switch (resource.entity) {
                        case "bank":
                            if (resource.action === "userCountBankByBankCodes") {
                                return {
                                    count: 0,
                                };
                            }
                            break;
                        case "bankBranch":
                            if (resource.action === "userCountBankBranchByIds") {
                                return {
                                    count: 1,
                                };
                            }
                            break;
                        default:
                            break;
                    }
                }
        );

        await expect(async () => {
            await validateBankBranchImportData([
                {
                    bank_branch_id: "bank-branch-1",
                    bank_branch_code: "111",
                    bank_branch_name: "Bank Branch 1",
                    bank_branch_phonetic_name: "Bank Branch 1",
                    bank_code: "999",
                    is_archived: "1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
