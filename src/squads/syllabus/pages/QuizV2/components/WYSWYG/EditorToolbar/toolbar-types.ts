import { Controls } from "../wyswyg-types";
import { BlockComponentType, InlineComponentType, MediaTypes } from "./Controls";

export type ToolbarType = {
    [Controls.INLINE]?: InlineComponentType[];
    [Controls.BLOCK]?: BlockComponentType[];
    [Controls.ATOMIC]?: MediaTypes[];
};
