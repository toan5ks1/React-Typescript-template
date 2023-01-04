import { User_ImportBanksMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { BankCSV } from "../../types";
import { convertToImportBankData } from "../parser";

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

const mockCSVData: BankCSV[] = [
    {
        bank_id: "",
        bank_code: "111",
        bank_name: "Bank 1",
        bank_phonetic_name: "Bank 1",
        is_archived: "0",
    },
    {
        bank_id: "bank-2",
        bank_code: "222",
        bank_name: "Bank 2",
        bank_phonetic_name: "Bank 2",
        is_archived: "1",
    },
];

const mockReturnValue: User_ImportBanksMutationVariables["data"] = [
    {
        bank_id: "id",
        bank_code: "111",
        bank_name: "Bank 1",
        bank_name_phonetic: "Bank 1",
        is_archived: false,
    },
    {
        bank_id: "bank-2",
        bank_code: "222",
        bank_name: "Bank 2",
        bank_name_phonetic: "Bank 2",
        is_archived: true,
    },
];

describe("convertToImportBankData", () => {
    it("should return data correctly", () => {
        const result = convertToImportBankData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
