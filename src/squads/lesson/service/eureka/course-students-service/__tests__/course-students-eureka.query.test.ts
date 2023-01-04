import { getQueryFields } from "src/squads/lesson/test-utils/graphql";

import courseStudentsQueriesEureka from "src/squads/lesson/service/eureka/course-students-service/course-students-eureka.query";

describe("course-student-service-eureka.query", () => {
    it("getListWithFilter query should return the correct properties", async () => {
        const _callSpy = jest.spyOn(courseStudentsQueriesEureka, "_call");
        await courseStudentsQueriesEureka.getListWithFilter({ course_ids: ["Course_Id"] });

        const [payload] = _callSpy.mock.calls[0];

        const { operation } = getQueryFields(payload.query);
        expect(operation?.definitionNode.name?.value).toEqual("CourseStudentsListByCourseIds");

        const queryString = operation?.values;
        expect(queryString).toMatchObject([
            { course_students: ["CourseStudentAttrs"] },
            { course_students_aggregate: [{ aggregate: ["count"] }] },
        ]);
    });
});
