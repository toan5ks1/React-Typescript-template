import { choicesAddStudentType } from "src/squads/user/common/constants/choices";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import ButtonAddStudentDropdown from "../ButtonAddStudentDropdown";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<ButtonAddStudentDropdown/>", () => {
    const onClick = jest.fn();
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <ButtonAddStudentDropdown
                    options={choicesAddStudentType}
                    label="Name"
                    onClick={onClick}
                />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should open menu items", () => {
        renderComponent();
        //open
        userEvent.click(screen.getByTestId("ButtonAddStudentDropdown"));
        expect(screen.getByTestId("ButtonAddStudentDropdown__popover")).toBeInTheDocument();
        expect(screen.getByText("New Student")).toBeInTheDocument();
        expect(screen.getByText("Import Student")).toBeInTheDocument();
    });
    it("should be call onClick item menu", () => {
        renderComponent();

        userEvent.click(screen.getByTestId("ButtonAddStudentDropdown"));
        userEvent.click(screen.getByText("New Student"));
        expect(onClick).toBeCalledWith(choicesAddStudentType[0]);

        userEvent.click(screen.getByTestId("ButtonAddStudentDropdown"));
        userEvent.click(screen.getByText("Import Student"));
        expect(onClick).toBeCalledWith(choicesAddStudentType[1]);
    });
});
