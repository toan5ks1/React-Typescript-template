import { schoolLevelQueryService } from "src/squads/payment/service/bob/school-level-bob-service/school-level-query-service";
import { gradeService } from "src/squads/payment/service/fatima/grade-service/grade-service";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { SchoolLevelGradeCSV } from "../../types";
import { validateSchoolLevelGradeImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateSchoolLevelGradeImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateSchoolLevelGradeImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateSchoolLevelGradeImportData([
                {
                    grade_id: "grade-1",
                    school_level_id: "school-level-1",
                    invalid_header: "123",
                } as SchoolLevelGradeCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateSchoolLevelGradeImportData([
                {
                    grade_id: "",
                    school_level_id: "",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid school_level_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "schoolLevel";
                    action: keyof typeof schoolLevelQueryService.query;
                }) =>
                () => {
                    if (resource.action === "userCountSchoolLevelByIds") {
                        return {
                            count: 0,
                        };
                    }
                }
        );

        await expect(async () => {
            await validateSchoolLevelGradeImportData([
                {
                    grade_id: "grade-1",
                    school_level_id: "invalid-id",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid grade_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "schoolLevel" | "grade";
                    action:
                        | keyof typeof schoolLevelQueryService.query
                        | keyof typeof gradeService.query;
                }) =>
                () => {
                    switch (resource.entity) {
                        case "schoolLevel":
                            if (resource.action === "userCountSchoolLevelByIds") {
                                return {
                                    count: 1,
                                };
                            }
                            break;
                        case "grade":
                            if (resource.action === "userCountGradeByIds") {
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
            await validateSchoolLevelGradeImportData([
                {
                    grade_id: "invalid-id",
                    school_level_id: "school-level-1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
