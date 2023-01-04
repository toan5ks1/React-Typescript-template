import {
    Lesson_CourseManyReferenceByNameAndLocationIdQuery,
    Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { generateMockCourseMany } from "src/squads/lesson/test-utils/class-course";

import courseAccessPathsQueriesBob from "src/squads/lesson/service/bob/course-access-paths-service/course-access-paths-bob.query";

describe("course-access-paths-bob.query", () => {
    it("getManyReference", async () => {
        const mockCourseMany: Lesson_CourseManyReferenceByNameAndLocationIdQuery = {
            course_access_paths: generateMockCourseMany(),
        };

        const variables: Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables = {
            location_id: "Location_Id",
            name: "Course Name",
            limit: 10,
        };

        const _callSpy = jest.spyOn(courseAccessPathsQueriesBob, "_call");

        _callSpy.mockResolvedValue({ data: mockCourseMany });

        const result = await courseAccessPathsQueriesBob.getManyReference(variables);

        expect(result).toEqual(mockCourseMany.course_access_paths);
    });
});
