import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolLevelsMutation } from "src/squads/payment/service/bob/bob-types";

import schoolLevelMutationsBob from "../school-level-bob.mutation";
import { convertToImportSchoolLevelData } from "../utils/parser";
import { validateSchoolLevelImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-level-bob-service/utils/validation", () => ({
    __esModule: true,
    validateSchoolLevelImportData: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-level-bob-service/utils/parser", () => ({
    __esModule: true,
    convertToImportSchoolLevelData: jest.fn(),
}));

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_ImportSchoolLevelsMutation> = {
    data: {
        insert_school_level: mockResult,
    },
};

describe("schoolLevelMutationsBob", () => {
    it("importBanks", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateSchoolLevelImportData as jest.Mock).mockReturnValue(true);
        (convertToImportSchoolLevelData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await schoolLevelMutationsBob.importSchoolLevels(filePayload);
        expect(result).toEqual(mockResult);
    });
});
