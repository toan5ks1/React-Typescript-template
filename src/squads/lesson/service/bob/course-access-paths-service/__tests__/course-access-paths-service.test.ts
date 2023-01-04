import { courseAccessPathsService } from "src/squads/lesson/service/bob/course-access-paths-service/course-access-paths-service";
import { generateMockCourseMany } from "src/squads/lesson/test-utils/class-course";

import courseAccessPathsQueriesBob from "src/squads/lesson/service/bob/course-access-paths-service/course-access-paths-bob.query";

jest.mock(
    "src/squads/lesson/service/bob/course-access-paths-service/course-access-paths-bob.query",
    () => {
        return {
            __esModule: true,
            default: {
                getManyReference: jest.fn(),
            },
        };
    }
);

describe("course-access-paths-service", () => {
    it("courseAccessPathsGetManyReference", async () => {
        const mockCourseMany = { data: generateMockCourseMany() };

        (courseAccessPathsQueriesBob.getManyReference as jest.Mock).mockResolvedValue(
            mockCourseMany
        );

        const response = await courseAccessPathsService.query.courseAccessPathsGetManyReference({
            location_id: "Location_Id",
            name: "Course Name",
            limit: 10,
        });

        expect(courseAccessPathsQueriesBob.getManyReference).toBeCalled();
        expect(response).toEqual(mockCourseMany);
    });
});
