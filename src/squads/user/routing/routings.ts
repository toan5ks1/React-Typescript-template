import { Entities, ERPModules, Features } from "src/common/constants/enum";
import { Rules } from "src/internals/permission/rules";
import type { Route } from "vite-plugin-pages";

import { ResourceActions } from "../models/resource";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
// eslint-disable-next-line import/no-unresolved
import viteRoutes from "virtual:generated-pages-react";

export type UseCheckFeatureAndPermissionFlagType = {
    permissionConfigs?: {
        subject: SubjectKeys<Rules>;
        action: ActionKeys<Rules, SubjectKeys<Rules>>;
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

// add new props to router-vite
const viteConfigRouters: ViteConfigsRouterProps = {
    [ERPModules.STUDENTS]: {
        permissionConfigs: {
            subject: ERPModules.STUDENTS,
            action: ResourceActions.SHOW,
        },
        isDisableJPREP: true,
    },
    [Entities.STAFF]: {
        featureConfigs: {
            feature: Features.STAFF_MANAGEMENT,
        },
    },
    [Entities.USER_GROUP]: {
        featureConfigs: {
            feature: Features.USER_GROUP,
        },
    },
};

export const rawRoutes = viteRoutes.map((router: UseCheckFeatureAndPermissionFlagTypeVitePages) => {
    if (typeof router.meta?.pathname === "string")
        return { ...router, ...viteConfigRouters[router.meta.pathname] };
    return router;
});
