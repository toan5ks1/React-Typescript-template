import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolCoursesMutation } from "src/squads/payment/service/bob/bob-types";

import schoolCourseMutationsBob from "../school-course-bob.mutation";
import { convertToImportSchoolCourseData } from "../utils/parser";
import { validateSchoolCourseImportData } from "../utils/validation";

jest.mock("src/squads/payment/utils/file", () => ({
    __esModule: true,
    parseCSVFile: jest.fn(),
}));

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-course-bob-service/utils/validation", () => ({
    __esModule: true,
    validateSchoolCourseImportData: jest.fn(),
}));

jest.mock("src/squads/payment/service/bob/school-course-bob-service/utils/parser", () => ({
    __esModule: true,
    convertToImportSchoolCourseData: jest.fn(),
}));

const mockResult = { affected_rows: 1 };

const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_ImportSchoolCoursesMutation> = {
    data: {
        insert_school_course: mockResult,
    },
};

describe("schoolCourseMutationsBob", () => {
    it("importSchoolCourses", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);
        (validateSchoolCourseImportData as jest.Mock).mockReturnValue(true);
        (convertToImportSchoolCourseData as jest.Mock).mockReturnValue({});
        const filePayload: File = new File([], "newFile.csv");
        const result = await schoolCourseMutationsBob.importSchoolCourses(filePayload);
        expect(result).toEqual(mockResult);
    });
});
