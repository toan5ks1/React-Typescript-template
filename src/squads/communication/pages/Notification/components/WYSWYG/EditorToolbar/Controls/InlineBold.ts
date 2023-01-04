import FormatBoldIcon from "@mui/icons-material/FormatBold";

import { createInlineToolbarButton } from "./control-utils";

const InlineBold = createInlineToolbarButton({
    controlValue: "BOLD",
    label: "bold",
    icon: FormatBoldIcon,
});

export default InlineBold;
