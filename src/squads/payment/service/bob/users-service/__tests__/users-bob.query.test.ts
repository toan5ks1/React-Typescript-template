import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    UserNameByIdsQuery,
    UserNameByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { createMockUsersList } from "src/squads/payment/test-utils/mocks/student";

import usersQueriesBob from "src/squads/payment/service/bob/users-service/users-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockUserListInfo = createMockUsersList();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<UserNameByIdsQuery> = {
    data: {
        users: mockUserListInfo,
    },
};

describe("Query users", () => {
    it("Get user name list", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: UserNameByIdsQueryVariables = {
            user_id: "user_id_1",
        };

        const result = await usersQueriesBob.getUserNameList(variables);

        expect(result).toEqual(mockUserListInfo);
    });
});
