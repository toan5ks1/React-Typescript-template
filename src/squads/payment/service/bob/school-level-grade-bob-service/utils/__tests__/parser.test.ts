import { User_ImportSchoolLevelGradesMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { SchoolLevelGradeCSV } from "../../types";
import { convertToImportSchoolLevelGradeData } from "../parser";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockCSVData: SchoolLevelGradeCSV[] = [
    {
        grade_id: "grade-1",
        school_level_id: "school-level-1",
    },
    {
        grade_id: "grade-2",
        school_level_id: "school-level-2",
    },
];

const mockReturnValue: User_ImportSchoolLevelGradesMutationVariables["data"] = [
    {
        grade_id: "grade-1",
        school_level_id: "school-level-1",
    },
    {
        grade_id: "grade-2",
        school_level_id: "school-level-2",
    },
];

describe("convertToImportSchoolLevelGradeData", () => {
    it("should return data correctly", async () => {
        const result = await convertToImportSchoolLevelGradeData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
