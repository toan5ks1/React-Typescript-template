import { schoolInfoQueryService } from "src/squads/payment/service/bob/school-info-bob-service/school-info-query-service";
import { schoolLevelQueryService } from "src/squads/payment/service/bob/school-level-bob-service/school-level-query-service";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { SchoolInfoCSV } from "../../types";
import { validateSchoolInfoImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateSchoolInfoImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateSchoolInfoImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateSchoolInfoImportData([
                {
                    school_id: "school-1",
                    school_partner_id: "partner-school-1",
                    school_name: "School 1",
                    school_name_phonetic: "School 1",
                    school_level_id: "school-level-1",
                    address: "Address 1",
                    is_archived: "1",
                    invalid_header: "123",
                } as SchoolInfoCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateSchoolInfoImportData([
                {
                    school_id: "",
                    school_partner_id: "",
                    school_name: "",
                    school_name_phonetic: "",
                    school_level_id: "",
                    address: "",
                    is_archived: "",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid is_archived value", async () => {
        await expect(async () => {
            await validateSchoolInfoImportData([
                {
                    school_id: "school-1",
                    school_partner_id: "partner-school-1",
                    school_name: "School 1",
                    school_name_phonetic: "School 1",
                    school_level_id: "school-level-1",
                    address: "Address 1",
                    is_archived: "invalid",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid school_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "schoolLevel" | "schoolInfo";
                    action:
                        | keyof typeof schoolLevelQueryService.query
                        | keyof typeof schoolInfoQueryService.query;
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
                        case "schoolInfo":
                            if (resource.action === "userCountSchoolInfoByIds") {
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
            await validateSchoolInfoImportData([
                {
                    school_id: "invalid-id",
                    school_partner_id: "partner-school-1",
                    school_name: "School 1",
                    school_name_phonetic: "School 1",
                    school_level_id: "school-level-1",
                    address: "Address 1",
                    is_archived: "1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid school_level_ids", async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "schoolLevel" | "schoolInfo";
                    action:
                        | keyof typeof schoolLevelQueryService.query
                        | keyof typeof schoolInfoQueryService.query;
                }) =>
                () => {
                    switch (resource.entity) {
                        case "schoolLevel":
                            if (resource.action === "userCountSchoolLevelByIds") {
                                return {
                                    count: 0,
                                };
                            }
                            break;
                        case "schoolInfo":
                            if (resource.action === "userCountSchoolInfoByIds") {
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
            await validateSchoolInfoImportData([
                {
                    school_id: "school-1",
                    school_partner_id: "partner-school-1",
                    school_name: "School 1",
                    school_name_phonetic: "School 1",
                    school_level_id: "invalid-id",
                    address: "Address 1",
                    is_archived: "1",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
