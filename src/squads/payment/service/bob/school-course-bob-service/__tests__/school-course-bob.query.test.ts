import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountSchoolCourseByIdsQuery,
    User_CountSchoolCourseByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import schoolCourseQueryBob from "src/squads/payment/service/bob/school-course-bob-service/school-course-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

describe("schoolCourseQueryBob", () => {
    it("countSchoolCourseByIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountSchoolCourseByIdsQuery> = {
            data: {
                school_course_aggregate: {
                    aggregate: mockResult,
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountSchoolCourseByIdsQueryVariables = {
            schoolCourseIds: ["school-course-1"],
        };

        const result = await schoolCourseQueryBob.countSchoolCourseByIds(variables);

        expect(result).toEqual(mockResult);
    });
});
