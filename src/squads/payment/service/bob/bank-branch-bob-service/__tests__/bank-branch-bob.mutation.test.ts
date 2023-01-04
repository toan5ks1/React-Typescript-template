import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportBankBranchesMutation } from "src/squads/payment/service/bob/bob-types";

import bankBranchMutationsBob from "../bank-branch-bob.mutation";
import { convertToImportBankBranchData } from "../utils/parser";
import { validateBankBranchImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/bank-branch-bob-service/utils/validation", () => ({
    __esModule: true,
    validateBankBranchImportData: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/bank-branch-bob-service/utils/parser", () => ({
    __esModule: true,
    convertToImportBankBranchData: jest.fn(),
}));

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_ImportBankBranchesMutation> = {
    data: {
        insert_bank_branch: mockResult,
    },
};

describe("bankBranchMutationsBob", () => {
    it("importBankBranches", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateBankBranchImportData as jest.Mock).mockReturnValue(true);
        (convertToImportBankBranchData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await bankBranchMutationsBob.importBankBranches(filePayload);
        expect(result).toEqual(mockResult);
    });
});
