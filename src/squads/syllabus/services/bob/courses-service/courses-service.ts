import {
    Lesson_CoursesListQueryVariables,
    Lesson_CoursesOneQueryVariables,
    CoursesListQueryVariables,
    CoursesOneQueryVariables,
    CourseTitleQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { defineService } from "src/squads/syllabus/services/service-creator";
import { InvalidParamError } from "src/squads/syllabus/services/service-types";

import { createEmptyResponse } from "../../utils/utils";

import coursesQueriesBob from "src/squads/syllabus/services/bob/courses-service/courses-bob.query";

export const coursesService = defineService({
    query: {
        courseGetOne: (params: CoursesOneQueryVariables) => {
            if (!params.course_id) {
                throw new InvalidParamError({
                    action: "courseGetOne",
                    errors: [{ field: "course_id" }],
                    serviceName: "bobGraphQL",
                });
            }
            return coursesQueriesBob.getOne(params);
        },
        courseGetList: (params: CoursesListQueryVariables) => {
            return coursesQueriesBob.getList(params);
        },
        syllabusCourseGetTitle: (params: CourseTitleQueryVariables) => {
            if (params.course_id) return coursesQueriesBob.getTitle(params);

            return createEmptyResponse(undefined);
        },
        lessonCourseGetListV2: (params: Lesson_CoursesListQueryVariables) => {
            return coursesQueriesBob.getListV2(params);
        },
        lessonCourseGetOne: (params: Lesson_CoursesOneQueryVariables) => {
            if (!params.course_id) {
                throw new InvalidParamError({
                    action: "lessonCourseGetOne",
                    errors: [{ field: "course_id" }],
                    serviceName: "bobGraphQL",
                });
            }
            return coursesQueriesBob.getOneV2(params);
        },
    },
});
