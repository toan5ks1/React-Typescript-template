import { Entities, ERPModules, Features } from "src/common/constants/enum";
import { IAppResource } from "src/models/resource";
import { MicroFrontendTypes } from "src/routing/type";

import ReceiptIcon from "@mui/icons-material/Receipt";

export const InvoiceManagementResource: IAppResource = {
    feature: Features.MANUAL_INVOICE,
    key: ERPModules.INVOICE_MANAGEMENT,
    name: Entities.INVOICE,
    translateKey: "name",
    icon: ReceiptIcon,
    basename: `/${MicroFrontendTypes.INVOICE}`,
    fullscreen: true,
};
