import { EditorState } from "draft-js";

import BlockStyleControls from "../BlockStyleControls";
import { BlockControlGroupProps } from "../control-types";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const heading: string = "abc";
const headingLabel: string = "Heading";
const unorderListLabel: string = "UnOrder list";
const onChange = jest.fn();
const editorState = EditorState.createEmpty();

const renderUtil = (props: BlockControlGroupProps) =>
    render(<BlockStyleControls {...props} />, { wrapper: TestCommonAppProvider });

describe(BlockStyleControls.name, () => {
    it("should render both heading button and unorder list button", () => {
        renderUtil({ editorState, onChange });

        expect(screen.getByRole("button", { name: headingLabel })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: unorderListLabel })).toBeInTheDocument();
    });

    it("should trigger onChange handler once clicked on the heading item", () => {
        renderUtil({ editorState, onChange });
        fireEvent.click(screen.getByRole("button", { name: headingLabel }));
        fireEvent.click(screen.getAllByRole("heading", { name: heading })[0]);

        expect(onChange).toBeCalled();
    });

    it("should trigger onChange handler once click on the unorder list button", () => {
        renderUtil({ editorState, onChange });
        fireEvent.click(screen.getByRole("button", { name: unorderListLabel }));

        expect(onChange).toBeCalled();
    });
});
