import { Entities, EurekaEntities, Features } from "src/common/constants/enum";
import { SyllabusRules } from "src/squads/syllabus/internals/permission/rules";
import { ResourceActions } from "src/squads/syllabus/models/resource";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
import AssignmentRouter from "src/squads/syllabus/pages/Assignment/AssignmentRouter";
import BookRouter from "src/squads/syllabus/pages/Book/BookRouter";
import CourseRouter from "src/squads/syllabus/pages/Course/CourseRouter";
import ExamRouter from "src/squads/syllabus/pages/Exam/ExamRouter";
import LORouter from "src/squads/syllabus/pages/LO/LORouter";
import QuizRouter from "src/squads/syllabus/pages/Quiz/QuizRouter";
import StudyPlanRouter from "src/squads/syllabus/pages/StudyPlan/StudyPlanRouter";
import TaskAssignmentRouter from "src/squads/syllabus/pages/TaskAssignment/TaskAssignmentRouter";

export type PermissionAndFeatureConfig = {
    permissionConfigs?: {
        subject: SubjectKeys<SyllabusRules>;
        action: ActionKeys<SyllabusRules, SubjectKeys<SyllabusRules>>;
    };
    featureConfigs?: {
        feature: Features;
    };
};

export type UseCheckFeatureAndPermissionFlagType = PermissionAndFeatureConfig & {
    path: string;
    component: () => JSX.Element;
};

export const rawRoutes: UseCheckFeatureAndPermissionFlagType[] = [
    {
        path: `/${Entities.COURSES}`,
        component: CourseRouter,
        permissionConfigs: {
            subject: Entities.COURSES,
            action: ResourceActions.SHOW,
        },
    },
    {
        path: `/${EurekaEntities.ASSIGNMENTS}`,
        component: AssignmentRouter,
        featureConfigs: {
            feature: Features.ASSIGNMENT_MANAGEMENT,
        },
        permissionConfigs: {
            subject: EurekaEntities.ASSIGNMENTS,
            action: ResourceActions.SHOW,
        },
    },
    {
        path: `/${Entities.BOOKS}`,
        component: BookRouter,
        permissionConfigs: {
            subject: Entities.BOOKS,
            action: ResourceActions.SHOW,
        },
    },
    {
        path: `/${Entities.LOS}`,
        component: LORouter,
        permissionConfigs: {
            subject: Entities.LOS,
            action: ResourceActions.SHOW,
        },
    },
    {
        path: `/${Entities.QUIZZES}`,
        component: QuizRouter,
        permissionConfigs: {
            subject: Entities.QUIZZES,
            action: ResourceActions.SHOW,
        },
    },
    {
        path: `/${EurekaEntities.STUDY_PLANS}`,
        component: StudyPlanRouter,
        featureConfigs: {
            feature: Features.STUDY_PLAN_MANAGEMENT,
        },
        permissionConfigs: {
            subject: EurekaEntities.STUDY_PLANS,
            action: ResourceActions.SHOW,
        },
    },
    {
        path: `/${EurekaEntities.TASK_ASSIGNMENTS}`,
        component: TaskAssignmentRouter,
        featureConfigs: {
            feature: Features.TASK_ASSIGNMENT_MANAGEMENT,
        },
        permissionConfigs: {
            subject: EurekaEntities.TASK_ASSIGNMENTS,
            action: ResourceActions.SHOW,
        },
    },
    {
        path: `/${EurekaEntities.EXAM_LO}`,
        component: ExamRouter,
        featureConfigs: {
            feature: Features.SYLLABUS_EXAM_LO_INSTRUCTION,
        },
    },
];
