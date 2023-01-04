import { TestApp } from "src/squads/communication/test-utils";
import { getExampleDraftContent } from "src/squads/communication/test-utils/draft-js";

import { InlineBold } from "../Controls";
import BlockOrderList from "../Controls/BlockOrderList";
import EditorToolbar, { EditorToolbarProps } from "../EditorToolbar";
import { Controls } from "../toolbar-types";

import { render, screen } from "@testing-library/react";

const defaultEditorToolbarProps: EditorToolbarProps = {
    editorState: getExampleDraftContent(),
    onChange: () => {},
    controls: {
        [Controls.INLINE]: [InlineBold],
        [Controls.BLOCK]: [BlockOrderList],
    },
};

const renderEditorToolbar = (
    editorToolbarProps: EditorToolbarProps = defaultEditorToolbarProps
) => {
    return render(
        <TestApp>
            <EditorToolbar {...editorToolbarProps} />
        </TestApp>
    );
};

describe("<EditorToolbar />", () => {
    it("should render bold and order list toolbar", () => {
        renderEditorToolbar();

        expect(screen.getByTestId("EditorToolbar__root")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Order List" })).toBeInTheDocument();
    });

    it("should render inline control and block control", () => {
        renderEditorToolbar({
            ...defaultEditorToolbarProps,
            controls: [Controls.INLINE, Controls.BLOCK],
        });

        expect(screen.getByTestId("EditorToolbar__root")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Italic" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Underline" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Order List" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "UnOrder list" })).toBeInTheDocument();
    });

    it("shouldn't render toolbar when control is empty array", () => {
        renderEditorToolbar({
            ...defaultEditorToolbarProps,
            controls: [],
        });

        expect(screen.queryByTestId("EditorToolbar__root")).not.toBeInTheDocument();
    });

    it("shouldn't render toolbar when control is undefined", () => {
        renderEditorToolbar({
            ...defaultEditorToolbarProps,
            controls: undefined,
        });

        expect(screen.queryByTestId("EditorToolbar__root")).not.toBeInTheDocument();
    });
});
