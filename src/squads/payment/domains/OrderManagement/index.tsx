import { Entities, Features } from "src/common/constants/enum";
import { IAppResource } from "src/models/resource";
import { MicroFrontendTypes } from "src/routing/type";

import { Reorder } from "@mui/icons-material";

export const OrderManagementResource: IAppResource = {
    feature: Features.PAYMENT_ORDER_MANAGEMENT,
    key: Entities.ORDERS,
    name: Entities.ORDERS,
    translateKey: "name",
    icon: Reorder,

    basename: `/${MicroFrontendTypes.PAYMENT}`,
};
