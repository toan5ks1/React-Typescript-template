import { EditorState } from "draft-js";

import InlineItalic from "../InlineItalic";
import { InlineControlProps, OmitCreateProps } from "../control-types";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const label: string = "Italic";
const editorState = EditorState.createEmpty();
const onClick = jest.fn();

const renderUtil = (props: OmitCreateProps<InlineControlProps>) =>
    render(<InlineItalic {...props} />, { wrapper: TestCommonAppProvider });

describe(InlineItalic.name, () => {
    it("should render inline italic button", () => {
        renderUtil({ editorState, onClick });

        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });

    it("should trigger onClick handler once clicked on inline italic button", () => {
        renderUtil({ editorState, onClick });
        fireEvent.click(screen.getByRole("button", { name: label }));

        expect(onClick).toBeCalled();
    });
});
