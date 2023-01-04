import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportUserTagsMutation } from "src/squads/payment/service/bob/bob-types";

import userTagMutationsBob from "../user-tag-bob.mutation";
import { convertToImportUserTagData } from "../utils/parser";
import { validateUserTagImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/user-tag-bob-service/utils/validation", () => ({
    __esModule: true,
    validateUserTagImportData: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/user-tag-bob-service/utils/parser", () => ({
    __esModule: true,
    convertToImportUserTagData: jest.fn(),
}));

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_ImportUserTagsMutation> = {
    data: {
        insert_user_tag: mockResult,
    },
};

describe("userTagMutationsBob", () => {
    it("importUserTags", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateUserTagImportData as jest.Mock).mockReturnValue(true);
        (convertToImportUserTagData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await userTagMutationsBob.importUserTags(filePayload);
        expect(result).toEqual(mockResult);
    });
});
