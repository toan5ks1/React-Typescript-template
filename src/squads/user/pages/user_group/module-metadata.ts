import { Entities, Features } from "src/common/constants/enum";
import { IAppResource } from "src/models/resource";
import { MicroFrontendTypes } from "src/routing/type";

import { SupervisedUserCircleOutlined } from "@mui/icons-material";

const userGroup: IAppResource = {
    key: Entities.USER_GROUP,
    name: Entities.USER_GROUP,
    translateKey: "name",
    icon: SupervisedUserCircleOutlined,
    feature: Features.USER_GROUP,
    basename: `/${MicroFrontendTypes.USER}`,
};
export default userGroup;
