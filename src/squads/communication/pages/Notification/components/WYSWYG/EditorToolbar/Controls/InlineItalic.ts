import FormatItalic from "@mui/icons-material/FormatItalic";

import { createInlineToolbarButton } from "./control-utils";

const InlineItalic = createInlineToolbarButton({
    controlValue: "ITALIC",
    label: "italic",
    icon: FormatItalic,
});

export default InlineItalic;
