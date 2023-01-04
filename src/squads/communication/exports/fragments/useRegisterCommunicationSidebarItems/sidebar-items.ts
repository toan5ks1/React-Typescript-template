import { ERPModules } from "src/common/constants/enum";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { PermissionTypes } from "src/squads/communication/typings/permission-types";

import { MessageOutlined } from "@mui/icons-material";

interface CommunicationSidebarItems
    extends PermissionTypes,
        Pick<ISidebarItem, "key" | "order" | "isActive" | "icon"> {
    translateKey: string;
    path: string;
}

export const communicationSidebarItems: CommunicationSidebarItems[] = [
    {
        path: `/${ERPModules.NOTIFICATIONS}`,
        key: "communication.notifications",
        translateKey: "resources.notifications.name",
        icon: MessageOutlined,
        order: 7,
        isActive: (pathname) => {
            return (
                pathname.startsWith(`/communication/${ERPModules.NOTIFICATIONS}`) &&
                !pathname.includes(ERPModules.NOTIFICATIONSV2)
            );
        },
    },
    {
        path: `/${ERPModules.NOTIFICATIONSV2}`,
        key: "communication.notificationsv2",
        featureConfigs: {
            feature: Features.NOTIFICATION_TAGS,
        },
        translateKey: "resources.notificationsv2.name",
        icon: MessageOutlined,
        order: 8,
        isActive: (pathname) => {
            return pathname.startsWith(`/communication/${ERPModules.NOTIFICATIONSV2}`);
        },
    },
];

export interface ICommunicationSidebarItems extends ISidebarItem {}
