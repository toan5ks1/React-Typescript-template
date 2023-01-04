import { convertToRaw, EditorState } from "draft-js";

import { getExampleDraftContent } from "../../test-utils/draft-js";
import { getEmptyOption, toRichText } from "../quiz";

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

describe(getEmptyOption.name, () => {
    beforeEach(() => {
        (EditorState.createEmpty as jest.Mock).mockImplementation(getExampleDraftContent);
    });

    it("should return correct empty", () => {
        //draft-js state contains auto generated keys. So we need to convert to raw
        const option = getEmptyOption();

        expect(option.rects).toEqual([]);
        expect(option.content).toEqual(getExampleDraftContent());
    });
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
