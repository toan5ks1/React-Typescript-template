import { ERPModules, Features } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { IAppResource } from "src/squads/lesson/models/resource";

import { LibraryBooksOutlined } from "@mui/icons-material";

export const LessonManagementResource: IAppResource = {
    feature: Features.LESSON_MANAGEMENT,
    key: ERPModules.LESSON_MANAGEMENT,
    name: ERPModules.LESSON_MANAGEMENT,
    translateKey: "name",
    icon: LibraryBooksOutlined,

    basename: `/${MicroFrontendTypes.LESSON}`,
};
