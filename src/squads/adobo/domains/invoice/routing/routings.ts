import { ERPModules, Features } from "src/common/constants/enum";
import { Rules } from "src/internals/permission/rules";

import InvoiceManagementRouter from "../pages/invoice-list/InvoiceManagementRouter";

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
        path: `/${ERPModules.INVOICE_MANAGEMENT}`,
        component: InvoiceManagementRouter,
        featureConfigs: {
            feature: Features.MANUAL_INVOICE,
        },
    },
];
