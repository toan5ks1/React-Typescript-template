import { schoolLevelQueryService } from "src/squads/payment/service/bob/school-level-bob-service/school-level-query-service";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { SchoolLevelCSV } from "../../types";
import { validateSchoolLevelImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateSchoolLevelImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateSchoolLevelImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateSchoolLevelImportData([
                {
                    school_level_id: "school-level-1",
                    school_level_name: "School Level 1",
                    sequence: "1",
                    is_archived: "1",
                    invalid_header: "123",
                } as SchoolLevelCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateSchoolLevelImportData([
                {
                    school_level_id: "",
                    school_level_name: "",
                    sequence: "",
                    is_archived: "",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid is_archived value", async () => {
        await expect(async () => {
            await validateSchoolLevelImportData([
                {
                    school_level_id: "school-level-1",
                    school_level_name: "School Level 1",
                    sequence: "1",
                    is_archived: "invalid",
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
            await validateSchoolLevelImportData([
                {
                    school_level_id: "invalid-id",
                    school_level_name: "School Level 1",
                    sequence: "1",
                    is_archived: "0",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
