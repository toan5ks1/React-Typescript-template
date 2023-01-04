import { Controls } from "../../wyswyg-types";

export { default as InlineBold } from "./InlineBold";
export * from "./InlineBold";

export { default as InlineItalic } from "./InlineItalic";
export * from "./InlineItalic";

export { default as InlineUnderline } from "./InlineUnderline";
export * from "./InlineUnderline";

export { default as InlineFontsize } from "./BlockFontSize";
export * from "./BlockFontSize";

export { default as InlineStyleControls } from "./InlineStyleControls";
export { default as BlockStyleControls } from "./BlockStyleControls";
export { default as MediaTypeControls } from "./AtomicControls";

export * from "./control-types";

export const allToolbar: Controls[] = [Controls.INLINE, Controls.BLOCK, Controls.ATOMIC];
export const onlyInlineToolbar: Controls[] = [Controls.INLINE];
