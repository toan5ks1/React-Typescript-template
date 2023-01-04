import { AssignmentStudyPlanItemHasura } from "./assignment-study-plan-item";
import { LOStudyPlanItemHasura } from "./lo-study-plan-item";

export interface ContentStructureHasura {
    book_id: string;
    topic_id: string;
    course_id: string;
    chapter_id: string;
}

export interface StudyPlanItemHasura {
    content_structure: ContentStructureHasura;
    available_to: string;
    available_from: string;
    end_date: string;
    start_date: string;
    display_order: number;
    study_plan_item_id: string;
    lo_study_plan_item?: LOStudyPlanItemHasura;
    assignment_study_plan_item?: AssignmentStudyPlanItemHasura;
}
