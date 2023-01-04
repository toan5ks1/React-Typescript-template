import { ERPModules, Features } from "src/common/constants/enum";
import { Rules } from "src/internals/permission/rules";

import CalendarRouter from "../domains/Calendar/CalendarRouter";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";

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
        path: `/${ERPModules.SCHEDULE}`,
        component: CalendarRouter,
        featureConfigs: {
            feature: Features.SCHEDULE_MANAGEMENT,
        },
    },
];
