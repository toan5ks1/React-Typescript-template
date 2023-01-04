import { Entities } from "src/common/constants/enum";

import FormatItalic from "@mui/icons-material/FormatItalic";

import { createInlineToolbarButton } from "./control-utils";

const InlineItalic = createInlineToolbarButton({
    controlValue: "ITALIC",
    label: `resources.${Entities.QUIZZES}.italic`,
    icon: FormatItalic,
});

export default InlineItalic;
