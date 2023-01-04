import { createEditorStateFromText } from "src/common/utils/draft-js";
import { TestApp } from "src/squads/communication/test-utils";

import InlineColor, {
    colorMap,
    InlineColorProps,
} from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/Controls/InlineColor";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const onChangeColor = jest.fn();
const onClickColor = jest.fn();

const defaultInlineColorProps = {
    editorState: createEditorStateFromText("Editor text"),
    onChange: onChangeColor,
    onClick: onClickColor,
};

const renderInlineColor = (inlineColorProps: InlineColorProps = defaultInlineColorProps) => {
    return render(
        <TestApp>
            <InlineColor {...inlineColorProps} />
        </TestApp>
    );
};

describe("<InlineColor />", () => {
    it("should render correct order of colors", () => {
        renderInlineColor();

        const menuButton = screen.getByRole("button");
        expect(menuButton).toBeInTheDocument();

        userEvent.click(menuButton);

        const colorRadioButtons = screen.getAllByTestId("InlineColor__menuItem");
        expect(colorRadioButtons).toHaveLength(4);

        // Check the order of the colors
        colorRadioButtons.forEach((radioButton, index) => {
            expect(within(radioButton).getByRole("radio").getAttribute("value")).toEqual(
                Object.keys(colorMap)[index] // warning, success, error, text
            );
        });
    });

    it("should hide the menu after clicked a color", () => {
        renderInlineColor();

        const menuButton = screen.getByRole("button");
        userEvent.click(menuButton);

        expect(screen.getByRole("menu")).toBeInTheDocument();

        const colorRadioButtons = screen.getAllByTestId("InlineColor__menuItem");
        const warningButtonColor = colorRadioButtons[0];
        userEvent.click(warningButtonColor);

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
});
