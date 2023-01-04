import { StudyPlanTaskStatus as StudyPlanTaskStatusEnum } from "manabuf/eureka/v1/enums_pb";

export { StudyPlanTaskStatusEnum };

export type StudyPlanTaskStatus = keyof typeof StudyPlanTaskStatusEnum;

export interface AssignStudyPlanTaskHasura {
    status: StudyPlanTaskStatus;
    id: string;
    study_plan_ids: string[];
    course_id: string;
}

export const getStatusAssignStudyPlanTask = (input: AssignStudyPlanTaskHasura) => {
    return input.status;
};
