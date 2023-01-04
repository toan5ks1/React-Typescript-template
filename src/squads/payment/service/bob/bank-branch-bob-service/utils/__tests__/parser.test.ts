import { bankQueryService } from "src/squads/payment/service/bob/bank-bob-service/bank-query-service";
import { User_ImportBankBranchesMutationVariables } from "src/squads/payment/service/bob/bob-types";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { BankBranchCSV } from "../../types";
import { convertToImportBankBranchData } from "../parser";

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockCSVData: BankBranchCSV[] = [
    {
        bank_branch_id: "",
        bank_branch_code: "111",
        bank_branch_name: "Bank Branch 1",
        bank_branch_phonetic_name: "Bank Branch 1",
        bank_code: "111",
        is_archived: "0",
    },
    {
        bank_branch_id: "bank-branch-2",
        bank_branch_code: "222",
        bank_branch_name: "Bank Branch 2",
        bank_branch_phonetic_name: "Bank Branch 2",
        bank_code: "222",
        is_archived: "1",
    },
];

const mockReturnValue: User_ImportBankBranchesMutationVariables["data"] = [
    {
        bank_branch_id: "id",
        bank_branch_code: "111",
        bank_branch_name: "Bank Branch 1",
        bank_branch_phonetic_name: "Bank Branch 1",
        bank_id: "bank-1",
        is_archived: false,
    },
    {
        bank_branch_id: "bank-branch-2",
        bank_branch_code: "222",
        bank_branch_name: "Bank Branch 2",
        bank_branch_phonetic_name: "Bank Branch 2",
        bank_id: "bank-2",
        is_archived: true,
    },
];

describe("convertToImportBankBranchData", () => {
    it("should return data correctly", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: { entity: "bank"; action: keyof typeof bankQueryService.query }) => () => {
                if (resource.action === "userGetBanksByBankCodes") {
                    return [
                        {
                            bank_code: "111",
                            bank_id: "bank-1",
                        },
                        {
                            bank_code: "222",
                            bank_id: "bank-2",
                        },
                    ];
                }
            }
        );
        const result = await convertToImportBankBranchData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
