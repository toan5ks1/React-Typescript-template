import { KeyStudyPlanTypes } from "../common/constants/const";
import { StudyPlanItemHasura } from "./study-plan-item";

export interface StudyPlanHasura {
    name: string;
    course_id?: string;
    study_plan_id: string;
    master_study_plan_id?: string;
    created_at?: Date;
    school_id?: number;
    study_plan_items?: StudyPlanItemHasura[];
    study_plan_type: typeof KeyStudyPlanTypes | string;
}
