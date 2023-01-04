import { Entities } from "src/common/constants/enum";

import FormatUnderlined from "@mui/icons-material/FormatUnderlined";

import { createInlineToolbarButton } from "./control-utils";

const InlineUnderline = createInlineToolbarButton({
    controlValue: `UNDERLINE`,
    label: `resources.${Entities.QUIZZES}.underline`,
    icon: FormatUnderlined,
});

export default InlineUnderline;
