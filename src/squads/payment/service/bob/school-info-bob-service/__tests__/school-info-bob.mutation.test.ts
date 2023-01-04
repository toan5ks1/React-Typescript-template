import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolInfosMutation } from "src/squads/payment/service/bob/bob-types";

import schoolInfoMutationsBob from "../school-info-bob.mutation";
import { convertToImportSchoolInfoData } from "../utils/parser";
import { validateSchoolInfoImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-info-bob-service/utils/validation", () => ({
    __esModule: true,
    validateSchoolInfoImportData: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-info-bob-service/utils/parser", () => ({
    __esModule: true,
    convertToImportSchoolInfoData: jest.fn(),
}));

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_ImportSchoolInfosMutation> = {
    data: {
        insert_school_info: mockResult,
    },
};

describe("schoolInfoMutationsBob", () => {
    it("importSchoolInfos", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateSchoolInfoImportData as jest.Mock).mockReturnValue(true);
        (convertToImportSchoolInfoData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await schoolInfoMutationsBob.importSchoolInfos(filePayload);
        expect(result).toEqual(mockResult);
    });
});
