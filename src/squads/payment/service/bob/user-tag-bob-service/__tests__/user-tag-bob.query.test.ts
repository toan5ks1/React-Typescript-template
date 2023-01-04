import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountUserTagByIdsQuery,
    User_CountUserTagByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import userTagQueryBob from "src/squads/payment/service/bob/user-tag-bob-service/user-tag-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

describe("userTagQueryBob", () => {
    it("countBankByIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountUserTagByIdsQuery> = {
            data: {
                user_tag_aggregate: {
                    aggregate: mockResult,
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountUserTagByIdsQueryVariables = {
            userTagIds: ["user-tag-1"],
        };

        const result = await userTagQueryBob.countUserTagByIds(variables);

        expect(result).toEqual(mockResult);
    });
});
