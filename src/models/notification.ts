import { convertToRaw, EditorState } from "draft-js";

import { RichText } from "manabuf/common/v1/contents_pb";

import { toDraftSelector } from "./quiz";

export function toRichTextManabuf(editorState: EditorState, innerHTML: string): RichText {
    const richText = new RichText();

    richText.setRaw(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    richText.setRendered(innerHTML);

    return richText;
}

export enum NotificationSelectors {
    content = "Notification__content",
}
export function selectInnerHTMLContentField(): { contentHTML: string } {
    const contentHTML =
        document.querySelector(toDraftSelector(NotificationSelectors.content))?.innerHTML || "";

    return { contentHTML };
}
