import { pick1stElement } from "src/common/utils/other";
import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    StudentsManyQuery,
    StudentsManyQueryVariables,
    UserNameByIdsQuery,
    UserNameByIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import {
    createMockStudentMany,
    createMockUserNames,
} from "src/squads/communication/test-utils/query-data";

import usersQueriesBob from "src/squads/communication/service/bob/users-service/users-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockStudentMany = createMockStudentMany();
const mockStudentNames = createMockUserNames();

describe("users-service-bob.query", () => {
    it("should get list of user names correctly", async () => {
        const student = pick1stElement(mockStudentMany);

        const variables: UserNameByIdsQueryVariables = {
            user_id: student?.user_id,
        };
        const mockUserNamesByIdsResponse: HasuraAndDefaultResponse<UserNameByIdsQuery> = {
            data: {
                users: mockStudentNames,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockUserNamesByIdsResponse);

        const result = await usersQueriesBob.getUserNameList(variables);

        expect(result).toEqual(mockStudentNames);
    });

    it("should return undefined value for user names", async () => {
        const variables: UserNameByIdsQueryVariables = {
            user_id: undefined,
        };
        const mockUserNamesByIdsResponse: HasuraAndDefaultResponse<UserNameByIdsQuery> = {
            data: null,
        };

        (doQuery as jest.Mock).mockReturnValue(mockUserNamesByIdsResponse);

        const result = await usersQueriesBob.getUserNameList(variables);

        expect(result).toEqual(undefined);
    });

    it("should get list of users correctly", async () => {
        const student = pick1stElement(mockStudentMany);

        const variables: StudentsManyQueryVariables = {
            user_ids: student?.user_id,
        };
        const mockStudentsManyResponse: HasuraAndDefaultResponse<StudentsManyQuery> = {
            data: {
                users: mockStudentMany,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockStudentsManyResponse);

        const result = await usersQueriesBob.getStudentsMany(variables);

        expect(result).toEqual(mockStudentMany);
    });

    it("should return undefined value for user list", async () => {
        const variables: StudentsManyQueryVariables = {
            user_ids: undefined,
        };
        const mockStudentsManyResponse: HasuraAndDefaultResponse<StudentsManyQuery> = {
            data: null,
        };

        (doQuery as jest.Mock).mockReturnValue(mockStudentsManyResponse);

        const result = await usersQueriesBob.getStudentsMany(variables);

        expect(result).toEqual(undefined);
    });
});
