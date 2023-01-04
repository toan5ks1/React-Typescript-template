import { User_ImportSchoolLevelsMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { SchoolLevelCSV } from "../../types";
import { convertToImportSchoolLevelData } from "../parser";

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

const mockCSVData: SchoolLevelCSV[] = [
    {
        school_level_id: "",
        school_level_name: "School Level 1",
        sequence: "1",
        is_archived: "0",
    },
    {
        school_level_id: "school-level-2",
        school_level_name: "School Level 2",
        sequence: "2",
        is_archived: "1",
    },
];

const mockReturnValue: User_ImportSchoolLevelsMutationVariables["data"] = [
    {
        school_level_id: "id",
        school_level_name: "School Level 1",
        sequence: 1,
        is_archived: false,
    },
    {
        school_level_id: "school-level-2",
        school_level_name: "School Level 2",
        sequence: 2,
        is_archived: true,
    },
];

describe("convertToImportSchoolLevelData", () => {
    it("should return data correctly", () => {
        const result = convertToImportSchoolLevelData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
