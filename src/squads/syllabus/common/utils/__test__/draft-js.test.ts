import { ContentState, EditorState } from "draft-js";

import { getPlainTextFromEditorState, createSimpleHtmlStringFromEditorState } from "../draft-js";

describe(getPlainTextFromEditorState.name, () => {
    it("should return correct text content", () => {
        const textInput = "This is text content";
        const editorState = EditorState.createWithContent(ContentState.createFromText(textInput));

        expect(getPlainTextFromEditorState(editorState)).toEqual(textInput);
    });
});

describe(createSimpleHtmlStringFromEditorState.name, () => {
    const content = "This is text content";

    it("should return html string", () => {
        const editorState = EditorState.createWithContent(ContentState.createFromText(content));
        expect(createSimpleHtmlStringFromEditorState(editorState, "custom_key")).toEqual(
            `<span data-key="custom_key">${content}</span>`
        );
    });
    it("should return with tag is valid", () => {
        const editorState = EditorState.createWithContent(ContentState.createFromText(content));
        const regexp = new RegExp(`<span\s*.*>\s*.*<\/span>`); // <span></span>

        expect(createSimpleHtmlStringFromEditorState(editorState)).toMatch(regexp);
    });
});
