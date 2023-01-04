import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountSchoolLevelByIdsQuery,
    User_CountSchoolLevelByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import schoolLevelQueryBob from "src/squads/payment/service/bob/school-level-bob-service/school-level-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

describe("schoolLevelQueryBob", () => {
    it("countSchoolLevelByIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountSchoolLevelByIdsQuery> = {
            data: {
                school_level_aggregate: {
                    aggregate: mockResult,
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountSchoolLevelByIdsQueryVariables = {
            schoolLevelIds: ["school-level-1"],
        };

        const result = await schoolLevelQueryBob.countSchoolLevelByIds(variables);

        expect(result).toEqual(mockResult);
    });
});
