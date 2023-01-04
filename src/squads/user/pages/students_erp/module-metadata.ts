import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { IAppResource } from "src/squads/user/models/resource";

import { PersonOutline } from "@mui/icons-material";

const students: IAppResource = {
    key: ERPModules.STUDENTS,
    name: ERPModules.STUDENTS,
    translateKey: "name",
    icon: PersonOutline,
    basename: `/${MicroFrontendTypes.USER}`,
    isDisableJPREP: true,
};
export default students;
