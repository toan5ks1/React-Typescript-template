import { pick1stElement } from "src/common/utils/other";
import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    CoursesManyQuery,
    CoursesManyQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { createMockCoursesMany } from "src/squads/communication/test-utils/query-data";

import coursesQueriesBob from "src/squads/communication/service/bob/courses-service/courses-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockCourseMany = createMockCoursesMany();

describe("courses-bob.query", () => {
    it("should get list of courses correctly", async () => {
        const course = pick1stElement(mockCourseMany);

        const variables: CoursesManyQueryVariables = {
            course_id: course?.course_id,
        };
        const getManyCourseReturnData: HasuraAndDefaultResponse<CoursesManyQuery> = {
            data: {
                courses: mockCourseMany,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(getManyCourseReturnData);

        const result = await coursesQueriesBob.getMany(variables);

        expect(result).toEqual(mockCourseMany);
    });

    it("should return undefined value", async () => {
        const variables: CoursesManyQueryVariables = {
            course_id: undefined,
        };
        const getManyCourseReturnData: HasuraAndDefaultResponse<CoursesManyQuery> = {
            data: null,
        };

        (doQuery as jest.Mock).mockReturnValue(getManyCourseReturnData);

        const result = await coursesQueriesBob.getMany(variables);

        expect(result).toEqual(undefined);
    });
});
