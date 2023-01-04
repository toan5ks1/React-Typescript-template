import { User_ImportSchoolInfosMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { SchoolInfoCSV } from "../../types";
import { convertToImportSchoolInfoData } from "../parser";

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockCSVData: SchoolInfoCSV[] = [
    {
        school_id: "",
        school_partner_id: "partner-school-1",
        school_name: "School 1",
        school_name_phonetic: "School 1",
        school_level_id: "school-level-1",
        address: "Address 1",
        is_archived: "0",
    },
    {
        school_id: "school-2",
        school_partner_id: "partner-school-2",
        school_name: "School 2",
        school_name_phonetic: "School 2",
        school_level_id: "school-level-2",
        address: "Address 2",
        is_archived: "1",
    },
];

const mockReturnValue: User_ImportSchoolInfosMutationVariables["data"] = [
    {
        school_id: "id",
        school_partner_id: "partner-school-1",
        school_name: "School 1",
        school_name_phonetic: "School 1",
        school_level_id: "school-level-1",
        address: "Address 1",
        is_archived: false,
    },
    {
        school_id: "school-2",
        school_partner_id: "partner-school-2",
        school_name: "School 2",
        school_name_phonetic: "School 2",
        school_level_id: "school-level-2",
        address: "Address 2",
        is_archived: true,
    },
];

describe("convertToImportSchoolInfoData", () => {
    it("should return data correctly", async () => {
        const result = await convertToImportSchoolInfoData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
