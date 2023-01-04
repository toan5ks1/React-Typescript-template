import { EditorState } from "draft-js";

import InlineUnderline from "../InlineUnderline";
import { InlineControlProps, OmitCreateProps } from "../control-types";

import { fireEvent, render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const label: string = "Underline";
const editorState = EditorState.createEmpty();
const onClick = jest.fn();

const renderUtil = (props: OmitCreateProps<InlineControlProps>) =>
    render(<InlineUnderline {...props} />, { wrapper: TestCommonAppProvider });

describe(InlineUnderline.name, () => {
    it("should render inline underline button", () => {
        renderUtil({ editorState, onClick });

        expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
    });

    it("should trigger onClick handler once clicked on the inline underline button", () => {
        renderUtil({ editorState, onClick });
        fireEvent.click(screen.getByRole("button", { name: label }));

        expect(onClick).toBeCalled();
    });
});
