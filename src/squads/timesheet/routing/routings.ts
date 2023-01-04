import { ERPModules, Features } from "src/common/constants/enum";
import { TimesheetRules } from "src/squads/timesheet/internals/permission/rules";
import type { Route } from "vite-plugin-pages";

import { ResourceActions } from "../models/resource";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
// eslint-disable-next-line import/no-unresolved
import viteRoutes from "virtual:generated-pages-react";

export type UseCheckFeatureAndPermissionFlagType = {
    permissionConfigs?: {
        subject: SubjectKeys<TimesheetRules>;
        action: ActionKeys<TimesheetRules, SubjectKeys<TimesheetRules>>;
    };
    featureConfigs?: {
        feature: Features;
    };
    isDisableJPREP?: boolean;
};

type ViteConfigsRouterProps = {
    [key: string]: UseCheckFeatureAndPermissionFlagType;
};

export interface UseCheckFeatureAndPermissionFlagTypeVitePages
    extends UseCheckFeatureAndPermissionFlagType,
        Pick<Route, "meta"> {
    path: string;
    component: () => JSX.Element;
}

//add new props to router-vite
const viteConfigRouters: ViteConfigsRouterProps = {
    [ERPModules.TIMESHEET_MANAGEMENT]: {
        permissionConfigs: {
            subject: ERPModules.TIMESHEET_MANAGEMENT,
            action: ResourceActions.SHOW,
        },
        featureConfigs: {
            feature: Features.TIMESHEET_MANAGEMENT,
        },
    },
};

export const rawRoutes = viteRoutes.map((router: UseCheckFeatureAndPermissionFlagTypeVitePages) => {
    if (typeof router.meta?.pathname === "string")
        return { ...router, ...viteConfigRouters[router.meta.pathname] };
    return router;
});
