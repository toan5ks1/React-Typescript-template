import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportBanksMutation } from "src/squads/payment/service/bob/bob-types";

import bankMutationsBob from "../bank-bob.mutation";
import { convertToImportBankData } from "../utils/parser";
import { validateBankImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/bank-bob-service/utils/validation", () => ({
    __esModule: true,
    validateBankImportData: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/bank-bob-service/utils/parser", () => ({
    __esModule: true,
    convertToImportBankData: jest.fn(),
}));

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_ImportBanksMutation> = {
    data: {
        insert_bank: mockResult,
    },
};

describe("bankMutationsBob", () => {
    it("importBanks", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateBankImportData as jest.Mock).mockReturnValue(true);
        (convertToImportBankData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await bankMutationsBob.importBanks(filePayload);
        expect(result).toEqual(mockResult);
    });
});
