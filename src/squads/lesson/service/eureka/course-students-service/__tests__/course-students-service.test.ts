import { courseStudentsService } from "src/squads/lesson/service/eureka/course-students-service/course-students-service";
import {
    CourseStudentsListByCourseIdsQuery,
    CourseStudentsListByCourseIdsQueryVariables,
} from "src/squads/lesson/service/eureka/eureka-types";

import courseStudentsQueriesEureka from "src/squads/lesson/service/eureka/course-students-service/course-students-eureka.query";

jest.mock(
    "src/squads/lesson/service/eureka/course-students-service/course-students-eureka.query",
    () => {
        return {
            __esModule: true,
            default: {
                getListWithFilter: jest.fn(),
            },
        };
    }
);

describe("course-student-service", () => {
    it("should call getListWithFilter with correct parameters", async () => {
        const queryVariable: CourseStudentsListByCourseIdsQueryVariables = {
            course_ids: ["Course_Id"],
        };

        const courseStudentQueryReturn: CourseStudentsListByCourseIdsQuery = {
            course_students: [
                {
                    course_id: "Course_Id",
                    student_id: "Student_Id",
                },
            ],
            course_students_aggregate: {
                aggregate: { count: 1 },
            },
        };

        (courseStudentsQueriesEureka.getListWithFilter as jest.Mock).mockResolvedValue(
            courseStudentQueryReturn
        );

        const response = await courseStudentsService.query.courseStudentsGetListWithFilter(
            queryVariable
        );

        expect(courseStudentsQueriesEureka.getListWithFilter).toBeCalledWith(queryVariable);
        expect(response).toEqual(courseStudentQueryReturn);
    });

    it("should not call getListWithFilter with invalid parameters", async () => {
        const invalidQueryVariable: CourseStudentsListByCourseIdsQueryVariables = {
            course_ids: [],
        };

        await expect(async () => {
            await courseStudentsService.query.courseStudentsGetListWithFilter(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "courseStudentsGetListWithFilter",
            serviceName: "eurekaGraphQL",
            errors: [{ field: "course_ids", fieldValueIfNotSensitive: [] }],
            name: "InvalidParamError",
        });

        expect(courseStudentsQueriesEureka.getListWithFilter).not.toBeCalled();
    });
});
