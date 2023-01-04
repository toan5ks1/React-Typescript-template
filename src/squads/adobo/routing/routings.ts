import { ERPModules, Features } from "src/common/constants/enum";
import { Rules } from "src/internals/permission/rules";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
import EntryExitRouter from "src/squads/adobo/domains/entry-exit/pages/scanner/EntryExitRouter";
import InvoiceManagementRouter from "src/squads/adobo/domains/invoice/pages/invoice-list/InvoiceManagementRouter";

export type UseCheckFeatureAndPermissionFlagType = {
    permissionConfigs?: {
        subject: SubjectKeys<Rules>;
        action: ActionKeys<Rules, SubjectKeys<Rules>>;
    };
    featureConfigs?: {
        feature: Features;
    };
    path: string;
    fullscreen?: boolean;
    component: () => JSX.Element;
};

export const rawRoutes: UseCheckFeatureAndPermissionFlagType[] = [
    {
        path: `/${ERPModules.STUDENT_QR_SCANNER}`,
        component: EntryExitRouter,
        featureConfigs: {
            feature: Features.ENTRY_EXIT_MANAGEMENT,
        },
        fullscreen: true,
    },
    {
        path: `/${ERPModules.INVOICE_MANAGEMENT}`,
        component: InvoiceManagementRouter,
        featureConfigs: {
            feature: Features.MANUAL_INVOICE,
        },
    },
];
