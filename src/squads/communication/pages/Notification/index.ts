import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { IAppResource } from "src/squads/communication/models/resource";

import { MessageOutlined } from "@mui/icons-material";

//TODO: will rm this file after success with register menu
export const NotificationResource: IAppResource = {
    key: ERPModules.NOTIFICATIONS,
    name: ERPModules.NOTIFICATIONS,
    translateKey: "name",
    icon: MessageOutlined,
    basename: `/${MicroFrontendTypes.COMMUNICATION}`,
};
