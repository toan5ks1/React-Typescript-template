import { ERPModules, Features } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { IAppResource } from "src/squads/lesson/models/resource";

import { AssignmentIndOutlined } from "@mui/icons-material";

export const AssignedStudentListResource: IAppResource = {
    feature: Features.ASSIGNED_STUDENT_LIST,
    key: ERPModules.ASSIGNED_STUDENT_LIST,
    name: ERPModules.ASSIGNED_STUDENT_LIST,
    translateKey: "name",
    icon: AssignmentIndOutlined,

    basename: `/${MicroFrontendTypes.LESSON}`,
};
