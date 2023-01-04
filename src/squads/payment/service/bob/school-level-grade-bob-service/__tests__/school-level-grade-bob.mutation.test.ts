import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolLevelGradesMutation } from "src/squads/payment/service/bob/bob-types";

import schoolLevelGradeMutationsBob from "../school-level-grade-bob.mutation";
import { convertToImportSchoolLevelGradeData } from "../utils/parser";
import { validateSchoolLevelGradeImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-level-grade-bob-service/utils/validation", () => ({
    __esModule: true,
    validateSchoolLevelGradeImportData: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-level-grade-bob-service/utils/parser", () => ({
    __esModule: true,
    convertToImportSchoolLevelGradeData: jest.fn(),
}));

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_ImportSchoolLevelGradesMutation> = {
    data: {
        insert_school_level_grade: mockResult,
    },
};

describe("schoolLevelGradeMutationsBob", () => {
    it("importBanks", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateSchoolLevelGradeImportData as jest.Mock).mockReturnValue(true);
        (convertToImportSchoolLevelGradeData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await schoolLevelGradeMutationsBob.importSchoolLevelGrades(filePayload);
        expect(result).toEqual(mockResult);
    });
});
