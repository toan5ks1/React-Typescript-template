import { Entities, ERPModules, Features } from "src/common/constants/enum";
import { IAppResource } from "src/models/resource";
import { MicroFrontendTypes } from "src/routing/type";

import { ScannerOutlined } from "@mui/icons-material";

export const EntryExitResource: IAppResource = {
    feature: Features.ENTRY_EXIT_MANAGEMENT,
    key: ERPModules.STUDENT_QR_SCANNER,
    name: Entities.ENTRY_EXIT,
    translateKey: "name",
    target: "_blank",
    icon: ScannerOutlined,

    basename: `/${MicroFrontendTypes.ENTRY_EXIT}`,
    fullscreen: true,
};
