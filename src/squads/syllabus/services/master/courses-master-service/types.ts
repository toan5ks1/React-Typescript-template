import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import { UpsertCoursesRequest as UpsertMasterCoursesRequest } from "manabuf/mastermgmt/v1/course_pb";

export declare namespace NsSyllabus_Master_CoursesService {
    export interface UpsertCourses extends NsSyllabus_Yasuo_CoursesService.UpsertCourses {
        locationIdsList?: UpsertMasterCoursesRequest.Course.AsObject["locationIdsList"];
        teachingMethod?: UpsertMasterCoursesRequest.Course.AsObject["teachingMethod"];
    }
}
