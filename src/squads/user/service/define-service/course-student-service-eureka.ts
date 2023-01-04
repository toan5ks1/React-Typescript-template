import { courseStudentQueriesEureka } from "src/squads/user/service/eureka/course-student-service-eureka";
import { CourseStudentsListByCourseIdsQueryVariables } from "src/squads/user/service/eureka/eureka-types";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";

const courseStudentServiceEureka = defineService({
    query: {
        userGetManyCourseStudentsByCourseIds: (
            variables: ListQuery<CourseStudentsListByCourseIdsQueryVariables>
        ) => {
            const { filter = {} } = variables;
            return courseStudentQueriesEureka.getListWithFilter({
                course_ids: filter?.course_ids,
            });
        },
    },
});

export default courseStudentServiceEureka;
