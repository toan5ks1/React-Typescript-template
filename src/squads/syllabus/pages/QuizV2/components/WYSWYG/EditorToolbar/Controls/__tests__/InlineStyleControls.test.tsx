import { EditorState } from "draft-js";

import InlineStyleControls from "../InlineStyleControls";
import { InlineControlGroupProps } from "../control-types";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const boldLabel: string = "Bold";
const italicLabel: string = "Italic";
const underlineLabel: string = "Underline";
const editorState = EditorState.createEmpty();
const onChange = jest.fn();

const renderUtil = (props: InlineControlGroupProps) =>
    render(<InlineStyleControls {...props} />, { wrapper: TestCommonAppProvider });

describe(InlineStyleControls.name, () => {
    it("should render inline bold, inline italic and inline underline buttons", () => {
        renderUtil({ editorState, onChange });

        expect(screen.getByRole("button", { name: boldLabel })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: italicLabel })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: underlineLabel })).toBeInTheDocument();
    });

    it("should trigger onChange handler 3 times once clicked on all the buttons", () => {
        renderUtil({ editorState, onChange });
        fireEvent.click(screen.getByRole("button", { name: boldLabel }));
        fireEvent.click(screen.getByRole("button", { name: italicLabel }));
        fireEvent.click(screen.getByRole("button", { name: underlineLabel }));

        expect(onChange).toBeCalledTimes(3);
    });
});
