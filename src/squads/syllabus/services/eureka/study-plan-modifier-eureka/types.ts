import { ContentStructure, StudyPlanItem } from "manabuf/eureka/v1/assignments_pb";
import { UpsertStudyPlanRequest } from "manabuf/eureka/v1/study_plan_modifier_pb";
import { StringValue } from "manabuf/google/protobuf/wrappers_pb";

export declare namespace NsEurekaStudyPlanModifierService {
    export interface UpsertStudyPlanItem
        extends Pick<StudyPlanItem.AsObject, "studyPlanId" | "studyPlanItemId" | "status"> {
        availableFrom?: string;
        availableTo?: string;
        startDate?: string;
        endDate?: string;
        contentStructure: Omit<ContentStructure.AsObject, "assignmentId" | "loId"> & {
            assignmentId?: StringValue.AsObject;
            loId?: StringValue.AsObject;
        };
    }

    export interface UpsertStudyPlanItems extends Array<UpsertStudyPlanItem> {}

    export interface UpsertStudyPlan extends Omit<UpsertStudyPlanRequest.AsObject, "studyPlanId"> {
        studyPlanId?: StringValue.AsObject;
    }
}
