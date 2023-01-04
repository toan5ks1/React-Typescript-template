import { schoolCourseQueryService } from "src/squads/payment/service/bob/school-course-bob-service/school-course-query-service";
import { schoolInfoQueryService } from "src/squads/payment/service/bob/school-info-bob-service/school-info-query-service";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { SchoolCourseCSV } from "../../types";
import { validateSchoolCourseImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateSchoolCourseImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateSchoolCourseImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateSchoolCourseImportData([
                {
                    school_course_id: "school-course-1",
                    school_course_partner_id: "partner-school-course-1",
                    school_course_name: "School Course 1",
                    school_course_name_phonetic: "School Course 1",
                    school_partner_id: "partner-school-1",
                    is_archived: "1",
                    invalid_header: "123",
                } as SchoolCourseCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateSchoolCourseImportData([
                {
                    school_course_id: "",
                    school_course_partner_id: "",
                    school_course_name: "",
                    school_course_name_phonetic: "",
                    school_partner_id: "",
                    is_archived: "",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid is_archived value", async () => {
        await expect(async () => {
            await validateSchoolCourseImportData([
                {
                    school_course_id: "school-course-1",
                    school_course_partner_id: "partner-school-course-1",
                    school_course_name: "School Course 1",
                    school_course_name_phonetic: "School Course 1",
                    school_partner_id: "partner-school-1",
                    is_archived: "invalid",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid school_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "schoolCourse" | "schoolInfo";
                    action:
                        | keyof typeof schoolCourseQueryService.query
                        | keyof typeof schoolInfoQueryService.query;
                }) =>
                () => {
                    switch (resource.entity) {
                        case "schoolCourse":
                            if (resource.action === "userCountSchoolCourseByIds") {
                                return {
                                    count: 0,
                                };
                            }
                            break;
                        case "schoolInfo":
                            if (resource.action === "userCountSchoolInfoByPartnerIds") {
                                return {
                                    count: 1,
                                };
                            }
                            break;
                        default:
                            break;
                    }
                }
        );

        await expect(async () => {
            await validateSchoolCourseImportData([
                {
                    school_course_id: "invalid-id",
                    school_course_partner_id: "partner-school-course-1",
                    school_course_name: "School Course 1",
                    school_course_name_phonetic: "School Course 1",
                    school_partner_id: "partner-school-1",
                    is_archived: "1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid school_partner_ids", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "schoolCourse" | "schoolInfo";
                    action:
                        | keyof typeof schoolCourseQueryService.query
                        | keyof typeof schoolInfoQueryService.query;
                }) =>
                () => {
                    switch (resource.entity) {
                        case "schoolCourse":
                            if (resource.action === "userCountSchoolCourseByIds") {
                                return {
                                    count: 1,
                                };
                            }
                            break;
                        case "schoolInfo":
                            if (resource.action === "userCountSchoolInfoByPartnerIds") {
                                return {
                                    count: 0,
                                };
                            }
                            break;
                        default:
                            break;
                    }
                }
        );

        await expect(async () => {
            await validateSchoolCourseImportData([
                {
                    school_course_id: "school-course-1",
                    school_course_partner_id: "partner-school-course-1",
                    school_course_name: "School Course 1",
                    school_course_name_phonetic: "School Course 1",
                    school_partner_id: "invalid-partner-id",
                    is_archived: "1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
