import { defineService } from "src/squads/syllabus/services/service-creator";

import { NsSyllabus_Master_CoursesService } from "./types";

import coursesServiceMaster from "src/squads/syllabus/services/master/courses-master-service/courses-master.mutation";

export const coursesMasterService = defineService({
    mutation: {
        courseCreate: (params: NsSyllabus_Master_CoursesService.UpsertCourses) => {
            return coursesServiceMaster.upsertCourses(params);
        },
    },
});
