import { ERPModules, Features } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { IAppResource } from "src/squads/calendar/models/resource";

import { EventOutlined } from "@mui/icons-material";

export const CalendarResource: IAppResource = {
    feature: Features.SCHEDULE_MANAGEMENT,
    key: ERPModules.SCHEDULE,
    name: ERPModules.SCHEDULE,
    translateKey: "name",
    icon: EventOutlined,

    basename: `/${MicroFrontendTypes.CALENDAR}`,
};
