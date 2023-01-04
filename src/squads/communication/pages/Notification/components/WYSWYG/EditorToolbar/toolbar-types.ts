import { BlockComponentType, InlineComponentType } from "./Controls";

export enum Controls {
    INLINE = "INLINE",
    BLOCK = "BLOCK",
}

export type ToolbarType = {
    [Controls.INLINE]?: InlineComponentType[];
    [Controls.BLOCK]?: BlockComponentType[];
};
