import FormatUnderlined from "@mui/icons-material/FormatUnderlined";

import { createInlineToolbarButton } from "./control-utils";

const InlineUnderline = createInlineToolbarButton({
    controlValue: "UNDERLINE",
    label: "underline",
    icon: FormatUnderlined,
});

export default InlineUnderline;
