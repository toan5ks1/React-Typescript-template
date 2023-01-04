import { Entities } from "src/common/constants/enum";

import FormatBoldIcon from "@mui/icons-material/FormatBold";

import { createInlineToolbarButton } from "./control-utils";

const InlineBold = createInlineToolbarButton({
    controlValue: "BOLD",
    label: `resources.${Entities.QUIZZES}.bold`,
    icon: FormatBoldIcon,
});

export default InlineBold;
