import { Entities } from "src/common/constants/enum";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { createBlockToolbarButton } from "./control-utils";

const BlockUnOrderList = createBlockToolbarButton({
    controlValue: "unordered-list-item",
    label: `resources.${Entities.QUIZZES}.ul`,
    icon: FormatListBulletedIcon,
});

export default BlockUnOrderList;
