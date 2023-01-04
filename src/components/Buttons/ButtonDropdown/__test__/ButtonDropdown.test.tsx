import { choicesScheduleFilterTypeHQ } from "src/common/constants/choices";
import { TestThemeProvider } from "src/test-utils";

import ButtonDropdown from "../ButtonDropdown";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<DropdownButton />", () => {
    let wrapper: RenderResult;
    const props = {
        options: choicesScheduleFilterTypeHQ,
        onClick: jest.fn(),
        classes: {},
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ButtonDropdown {...props} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should call onClick", () => {
        const button = screen.getByTestId("DropdownButton__contentButton") as HTMLButtonElement;
        expect(button.textContent).toContain(choicesScheduleFilterTypeHQ[0].value);
        fireEvent.click(button);
        const typeSelected = screen.getAllByRole("menuitem")[1];

        fireEvent.click(typeSelected);
        expect(props.onClick).toBeCalled();

        fireEvent.click(typeSelected);
        expect(button.textContent).toContain(choicesScheduleFilterTypeHQ[1].value);
    });

    it("should call handleClose", () => {
        const button = screen.getByTestId("DropdownButton__contentButton") as HTMLButtonElement;

        fireEvent.click(button);

        fireEvent.click(document.body);
        expect(button.textContent).toContain(choicesScheduleFilterTypeHQ[0].value);
    });
});
