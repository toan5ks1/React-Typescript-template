import { Entities } from "src/common/constants/enum";

import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import { createBlockToolbarButton } from "./control-utils";

const BlockOrderList = createBlockToolbarButton({
    controlValue: "ordered-list-item",
    label: `resources.${Entities.QUIZZES}.orderList`,
    icon: FormatListNumberedIcon,
});

export default BlockOrderList;
