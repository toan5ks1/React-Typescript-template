import StaffListNavbar, { StaffListNavbarProps } from "../Navbar";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("StaffListNavbar component", () => {
    const mockOnOpen = jest.fn();
    const mockEnter = jest.fn();
    const renderComponent = (props: StaffListNavbarProps) => {
        return render(<StaffListNavbar {...props} />);
    };
    const navBarProp: StaffListNavbarProps = {
        onOpenUpsert: mockOnOpen,
        onSearch: mockEnter,
    };
    it("should match snapshot", () => {
        const wrapper = renderComponent(navBarProp);
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should call onOpen when click add button", () => {
        renderComponent(navBarProp);
        userEvent.click(screen.getByTestId("StaffListNavbar__btnAdd"));
        expect(mockOnOpen).toHaveBeenCalledTimes(1);
    });
    it("should call onEnter when click add button", () => {
        renderComponent(navBarProp);
        const textField = screen.getByTestId("FormFilterAdvanced__textField");
        const inputElement = textField.querySelector("input") as HTMLInputElement;
        userEvent.type(inputElement, "123");
        userEvent.keyboard("{Enter}");
        expect(mockEnter).toHaveBeenCalledTimes(1);
        expect(mockEnter).toHaveBeenCalledWith("123");
    });
});
