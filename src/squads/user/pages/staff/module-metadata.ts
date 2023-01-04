import { Entities, Features } from "src/common/constants/enum";
import { IAppResource } from "src/models/resource";
import { MicroFrontendTypes } from "src/routing/type";

import { SchoolOutlined } from "@mui/icons-material";

const staff: IAppResource = {
    key: Entities.STAFF,
    name: Entities.STAFF,
    translateKey: "name",
    basename: `/${MicroFrontendTypes.USER}`,
    icon: SchoolOutlined,

    feature: Features.STAFF_MANAGEMENT,
};
export default staff;
