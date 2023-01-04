import {
    DuplicateBookRequest,
    UpdateDisplayOrdersOfLOsAndAssignmentsRequest,
} from "manabuf/eureka/v1/course_modifier_pb";

import NsSyllabus_Yasuo_CoursesService from "../../yasuo/courses-service-yasuo/types";

export declare namespace NsEurekaCourseModifierService {
    interface AddBooksToCourse extends NsSyllabus_Yasuo_CoursesService.AddBooksToCourse {}
    export interface DuplicateBook extends DuplicateBookRequest.AsObject {}
    export interface UpdateDisplayOrdersOfLOsAndAssignments
        extends UpdateDisplayOrdersOfLOsAndAssignmentsRequest.AsObject {}
}
