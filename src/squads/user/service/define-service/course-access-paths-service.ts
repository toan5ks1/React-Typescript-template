import {
    User_OneCourseByCourseIdAndLocationIdQueryVariables,
    User_CourseLocationsByCourseIdQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import courseAccessPathsQueriesBob from "src/squads/user/service/bob/course-access-paths-service-bob";
import { defineService } from "src/squads/user/service/service-creator";

const courseAccessPathService = defineService({
    query: {
        userGetOneCourseAccessPaths: (
            variables: User_OneCourseByCourseIdAndLocationIdQueryVariables
        ) => {
            return courseAccessPathsQueriesBob.getOneCourseByCourseIdAndLocationId(variables);
        },
        userGetManyCourseAccessPathsByCourseId: (
            variables: User_CourseLocationsByCourseIdQueryVariables
        ) => {
            return courseAccessPathsQueriesBob.getCourseLocationsByCourseId(variables);
        },
    },
});

export default courseAccessPathService;
