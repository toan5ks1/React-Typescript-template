import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { createBlockToolbarButton } from "./control-utils";

const BlockUnOrderList = createBlockToolbarButton({
    controlValue: "unordered-list-item",
    label: "ul",
    icon: FormatListBulletedIcon,
});

export default BlockUnOrderList;
