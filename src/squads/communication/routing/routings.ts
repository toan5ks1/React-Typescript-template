import { ERPModules } from "src/common/constants/enum";

import { Features } from "../common/constants/feature-keys";
import NotificationRouter from "../pages/Notification/NotificationRouter";
import NotificationRouterV2 from "../pages/NotificationV2/NotificationRouterV2";
import { CommunicationRoutes } from "../typings/route-types";

export const rawRoutes: CommunicationRoutes[] = [
    {
        path: `/${ERPModules.NOTIFICATIONS}`,
        component: NotificationRouter,
    },
    {
        path: `/${ERPModules.NOTIFICATIONSV2}`,
        component: NotificationRouterV2,
        featureConfigs: {
            feature: Features.NOTIFICATION_TAGS,
        },
    },
];
