import { convertToRaw, EditorState } from "draft-js";

import { getExampleDraftContent } from "../../test-utils/draft-js";
import { toRichText } from "../quiz";

// this file is for testing editor state, which will require mock on draft-js
jest.mock("draft-js", () => {
    const draft = jest.requireActual("draft-js");

    return {
        ...draft,
        EditorState: {
            ...draft.EditorState,
            createEmpty: jest.fn(),
        },
    };
});

describe(toRichText.name, () => {
    beforeEach(() => {
        (EditorState.createEmpty as jest.Mock).mockImplementation(getExampleDraftContent);
    });

    it("should return correct rich text instance", () => {
        const innerHTML = "<div></div>";
        const editorState = EditorState.createEmpty();
        const result = toRichText(editorState, innerHTML);

        expect(result.getRaw()).toEqual(
            JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        );
        expect(result.getRendered()).toEqual(innerHTML);
    });
});
