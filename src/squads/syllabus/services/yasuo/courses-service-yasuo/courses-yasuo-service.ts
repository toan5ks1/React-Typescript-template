import { defineService } from "src/squads/syllabus/services/service-creator";

import coursesYasuoMutation from "./courses-yasuo.mutation";
import { NsSyllabus_Yasuo_CoursesService } from "./types";

export const coursesYasuoService = defineService({
    mutation: {
        courseDelete: (params: NsSyllabus_Yasuo_CoursesService.DeleteCourses) => {
            return coursesYasuoMutation.deleteCourses(params);
        },
        courseCreate: (params: NsSyllabus_Yasuo_CoursesService.UpsertCourses) => {
            return coursesYasuoMutation.upsertCourses(params);
        },
    },
});
