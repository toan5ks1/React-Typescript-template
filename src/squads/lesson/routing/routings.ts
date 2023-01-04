import { ERPModules, Features } from "src/common/constants/enum";
import { Rules } from "src/internals/permission/rules";

import LessonManagementRouter from "../pages/LessonManagement/LessonManagementRouter";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
import AssignedStudentListRouter from "src/squads/lesson/domains/AssignedStudentList/AssignedStudentListRouter";

export type UseCheckFeatureAndPermissionFlagType = {
    permissionConfigs?: {
        subject: SubjectKeys<Rules>;
        action: ActionKeys<Rules, SubjectKeys<Rules>>;
    };
    featureConfigs?: {
        feature: Features;
    };
    path: string;
    component: () => JSX.Element;
};

export const rawRoutes: UseCheckFeatureAndPermissionFlagType[] = [
    {
        path: `/${ERPModules.LESSON_MANAGEMENT}`,
        component: LessonManagementRouter,
        featureConfigs: {
            feature: Features.LESSON_MANAGEMENT,
        },
    },
    {
        path: `/${ERPModules.ASSIGNED_STUDENT_LIST}`,
        component: AssignedStudentListRouter,
        featureConfigs: {
            feature: Features.ASSIGNED_STUDENT_LIST,
        },
    },
];
