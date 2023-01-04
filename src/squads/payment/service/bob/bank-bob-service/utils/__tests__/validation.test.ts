import { bankQueryService } from "src/squads/payment/service/bob/bank-bob-service/bank-query-service";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { BankCSV } from "../../types";
import { validateBankImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateBankImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateBankImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateBankImportData([
                {
                    bank_id: "bank-2",
                    bank_code: "222",
                    bank_name: "Bank 2",
                    bank_phonetic_name: "Bank 2",
                    is_archived: "1",
                    invalid_header: "123",
                } as BankCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateBankImportData([
                {
                    bank_id: "",
                    bank_code: "",
                    bank_name: "",
                    bank_phonetic_name: "",
                    is_archived: "",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid is_archived value", async () => {
        await expect(async () => {
            await validateBankImportData([
                {
                    bank_id: "bank-1",
                    bank_code: "111",
                    bank_name: "Bank 1",
                    bank_phonetic_name: "Bank 1",
                    is_archived: "invalid",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid bank_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: { entity: "bank"; action: keyof typeof bankQueryService.query }) => () => {
                if (resource.action === "userCountBankByIds") {
                    return {
                        count: 0,
                    };
                }
            }
        );

        await expect(async () => {
            await validateBankImportData([
                {
                    bank_id: "invalid-id",
                    bank_code: "111",
                    bank_name: "Bank 1",
                    bank_phonetic_name: "Bank 1",
                    is_archived: "0",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
