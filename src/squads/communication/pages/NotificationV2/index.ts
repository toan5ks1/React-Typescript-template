import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { IAppResource } from "src/squads/communication/models/resource";

import { MessageOutlined } from "@mui/icons-material";

//TODO: will rm this file after success with register menu
export const NotificationResourceV2: IAppResource = {
    key: ERPModules.NOTIFICATIONSV2,
    name: ERPModules.NOTIFICATIONSV2,
    translateKey: "name",
    icon: MessageOutlined,
    basename: `/${MicroFrontendTypes.COMMUNICATION}`,
    feature: Features.NOTIFICATION_TAGS,
};
