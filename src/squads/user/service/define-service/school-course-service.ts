import { User_GetManyReferenceSchoolCourseQueryVariables } from "src/squads/user/service/bob/bob-types";
import schoolCourseQueriesBob from "src/squads/user/service/bob/school-course-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

const schoolCourseQueries = defineService({
    query: {
        getManyReferenceSchoolCourse: (
            variables: User_GetManyReferenceSchoolCourseQueryVariables
        ) => {
            return schoolCourseQueriesBob.getManyReferenceSchoolCourse(variables);
        },
    },
});

export default schoolCourseQueries;
