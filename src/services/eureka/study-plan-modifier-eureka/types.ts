import {
    DeleteStudyPlanBelongsToACourseRequest,
    UpsertStudyPlanRequest,
} from "manabuf/eureka/v1/study_plan_modifier_pb";

export declare namespace NsEurekaStudyPlanModifierService {
    export interface DeleteStudyPlanBelongsToACourse
        extends DeleteStudyPlanBelongsToACourseRequest.AsObject {}

    export interface UpsertStudyPlan extends UpsertStudyPlanRequest.AsObject {}
}
