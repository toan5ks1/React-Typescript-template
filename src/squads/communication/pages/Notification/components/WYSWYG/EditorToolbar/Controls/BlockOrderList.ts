import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import { createBlockToolbarButton } from "./control-utils";

const BlockOrderList = createBlockToolbarButton({
    controlValue: "ordered-list-item",
    label: "orderList",
    icon: FormatListNumberedIcon,
});

export default BlockOrderList;
