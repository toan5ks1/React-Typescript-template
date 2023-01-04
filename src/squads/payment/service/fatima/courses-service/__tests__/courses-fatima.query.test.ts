import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyCourseByCourseIdsQuery,
    Payment_GetManyCourseByCourseIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockCourseList } from "src/squads/payment/test-utils/mocks/package-course";

import courseQueriesFatima from "src/squads/payment/service/fatima/courses-service/courses-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockCourseList = createMockCourseList();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetManyCourseByCourseIdsQuery> = {
    data: {
        courses: mockCourseList,
    },
};

describe("Course query", () => {
    it("should return courses when calling getManyCourseByCourseIds", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetManyCourseByCourseIdsQueryVariables = {
            course_ids: ["course_id_1", "course_id_2"],
        };

        const result = await courseQueriesFatima.getManyCourseByCourseIds(variables);

        expect(result).toEqual(mockCourseList);
    });
});
