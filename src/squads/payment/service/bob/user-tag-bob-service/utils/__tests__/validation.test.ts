import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { UserTagCSV } from "../../types";
import { validateUserTagImportData, validationError } from "../validation";

jest.mock("src/squads/payment/service/infer-standalone-query", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("validateUserTagImportData", () => {
    it("should throw error with empty data", async () => {
        await expect(async () => {
            await validateUserTagImportData([]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid header", async () => {
        await expect(async () => {
            await validateUserTagImportData([
                {
                    user_tag_id: "user-tag-1",
                    user_tag_name: "User Tag 1",
                    user_tag_partner_id: "user-tag-partner-1",
                    type: "0",
                    is_archived: "0",
                    invalid_header: "123",
                } as UserTagCSV,
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with data missing required fiels", async () => {
        await expect(async () => {
            await validateUserTagImportData([
                {
                    user_tag_id: "",
                    user_tag_name: "",
                    user_tag_partner_id: "",
                    type: "",
                    is_archived: "",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid is_archived value", async () => {
        await expect(async () => {
            await validateUserTagImportData([
                {
                    user_tag_id: "user-tag-1",
                    user_tag_name: "User Tag 1",
                    user_tag_partner_id: "user-tag-partner-1",
                    type: "0",
                    is_archived: "invalid",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });

    it("should throw error with invalid user_tag_id", async () => {
        (inferStandaloneQuery as jest.Mock).mockReturnValue(() => ({
            count: 0,
        }));

        await expect(async () => {
            await validateUserTagImportData([
                {
                    user_tag_id: "invalid-id",
                    user_tag_name: "User Tag 1",
                    user_tag_partner_id: "user-tag-partner-1",
                    type: "0",
                    is_archived: "0",
                },
            ]);
        }).rejects.toThrowError(validationError);
    });
});
