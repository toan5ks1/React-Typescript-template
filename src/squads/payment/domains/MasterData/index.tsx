import { Entities, Features } from "src/common/constants/enum";
import { IAppResource } from "src/models/resource";
import { MicroFrontendTypes } from "src/routing/type";

import { DvrOutlined } from "@mui/icons-material";

export const MasterDataResource: IAppResource = {
    feature: Features.PAYMENT_MASTER_MANAGEMENT_MENU_ITEM,
    key: Entities.MASTERS,
    name: Entities.MASTERS,
    translateKey: "name",
    icon: DvrOutlined,

    basename: `/${MicroFrontendTypes.PAYMENT}`,
};
