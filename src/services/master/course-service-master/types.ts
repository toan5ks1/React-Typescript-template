import { NsYasuoCourseService } from "src/services/yasuo/course-service-yasuo";

import { UpsertCoursesRequest as UpsertMasterCoursesRequest } from "manabuf/mastermgmt/v1/course_pb";

export declare namespace NsMasterCourseService {
    export interface UpsertCourses extends NsYasuoCourseService.UpsertCourses {
        locationIdsList?: UpsertMasterCoursesRequest.Course.AsObject["locationIdsList"];
    }
}
