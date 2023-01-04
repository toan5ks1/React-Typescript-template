import { Entities, Features } from "src/common/constants/enum";
import { PaymentRules } from "src/squads/payment/internals/permission/rules";

import MasterDataRouter from "../domains/MasterData/MasterDataRouter";
import OrderManagementRouter from "../domains/OrderManagement/OrderManagementRouter";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";

export type UseCheckFeatureAndPermissionFlagType = {
    permissionConfigs?: {
        subject: SubjectKeys<PaymentRules>;
        action: ActionKeys<PaymentRules, SubjectKeys<PaymentRules>>;
    };
    featureConfigs?: {
        feature: Features;
    };
    path: string;
    component: () => JSX.Element;
};

export const rawRoutes: UseCheckFeatureAndPermissionFlagType[] = [
    {
        path: `/${Entities.MASTERS}`,
        component: MasterDataRouter,
        featureConfigs: {
            feature: Features.PAYMENT_MASTER_MANAGEMENT_MENU_ITEM,
        },
        permissionConfigs: {
            action: "show",
            subject: "masters",
        },
    },
    {
        path: `/${Entities.ORDERS}`,
        component: OrderManagementRouter,
        featureConfigs: {
            feature: Features.PAYMENT_ORDER_MANAGEMENT,
        },
        permissionConfigs: {
            action: "show",
            subject: "orders",
        },
    },
];
