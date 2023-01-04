import { ERPModules, Features } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { IAppResource } from "src/squads/timesheet/models/resource";

import { AssignmentOutlined } from "@mui/icons-material";

const timesheetManagement: IAppResource = {
    key: ERPModules.TIMESHEET_MANAGEMENT,
    name: ERPModules.TIMESHEET_MANAGEMENT,
    translateKey: "name",
    icon: AssignmentOutlined,
    feature: Features.TIMESHEET_MANAGEMENT,
    basename: `/${MicroFrontendTypes.TIMESHEET}`,
};
export default timesheetManagement;
