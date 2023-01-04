import { getExampleDraftContent } from "src/squads/communication/test-utils/draft-js";

import Editor from "../Editor";

import { render, screen } from "@testing-library/react";

describe("<Editor />", () => {
    it("should has correct content based on editorState", () => {
        render(<Editor editorState={getExampleDraftContent()} />);

        expect(screen.getByTestId("Editor__draftEditor")).toHaveTextContent("IamBatman");
    });

    it("should not have class name notranslate when editor is read only", () => {
        render(<Editor readOnly editorState={getExampleDraftContent()} />);

        expect(screen.getByTestId("Editor__draftEditor")).toHaveAttribute(
            "contenteditable",
            "false"
        );
    });
    it("should have class name notranslate when editor is not read only", () => {
        render(<Editor editorState={getExampleDraftContent()} />);

        expect(screen.getByTestId("Editor__draftEditor")).toHaveAttribute(
            "contenteditable",
            "true"
        );
    });
});
