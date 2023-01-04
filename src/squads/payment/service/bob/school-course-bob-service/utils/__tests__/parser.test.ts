import { User_ImportSchoolCoursesMutationVariables } from "src/squads/payment/service/bob/bob-types";
import { schoolInfoQueryService } from "src/squads/payment/service/bob/school-info-bob-service/school-info-query-service";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { SchoolCourseCSV } from "../../types";
import { convertToImportSchoolCourseData } from "../parser";

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockCSVData: SchoolCourseCSV[] = [
    {
        school_course_id: "",
        school_course_partner_id: "partner-school-course-1",
        school_course_name: "School Course 1",
        school_course_name_phonetic: "School Course 1",
        school_partner_id: "partner-school-1",
        is_archived: "0",
    },
    {
        school_course_id: "school-course-2",
        school_course_partner_id: "partner-school-course-2",
        school_course_name: "School Course 2",
        school_course_name_phonetic: "School Course 2",
        school_partner_id: "partner-school-2",
        is_archived: "1",
    },
];

const mockReturnValue: User_ImportSchoolCoursesMutationVariables["data"] = [
    {
        school_course_id: "id",
        school_course_partner_id: "partner-school-course-1",
        school_course_name: "School Course 1",
        school_course_name_phonetic: "School Course 1",
        school_id: "school-1",
        is_archived: false,
    },
    {
        school_course_id: "school-course-2",
        school_course_partner_id: "partner-school-course-2",
        school_course_name: "School Course 2",
        school_course_name_phonetic: "School Course 2",
        school_id: "school-2",
        is_archived: true,
    },
];

describe("convertToImportSchoolCourseData", () => {
    it("should return data correctly", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "schoolInfo";
                    action: keyof typeof schoolInfoQueryService.query;
                }) =>
                () => {
                    if (resource.action === "getSchoolInfoIdByPartnerIds") {
                        return [
                            {
                                school_id: "school-1",
                                school_partner_id: "partner-school-1",
                            },
                            {
                                school_id: "school-2",
                                school_partner_id: "partner-school-2",
                            },
                        ];
                    }
                }
        );
        const result = await convertToImportSchoolCourseData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
