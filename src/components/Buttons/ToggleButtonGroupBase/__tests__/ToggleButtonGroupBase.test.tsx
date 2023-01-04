import { TestThemeProvider } from "src/test-utils";

import ToggleButtonGroupBase, { ToggleButtonGroupBaseProps } from "../ToggleButtonGroupBase";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<ToggleButtonGroupBase />", () => {
    let wrapper: RenderResult;

    const props: ToggleButtonGroupBaseProps = {
        options: [
            { value: "test1", children: "Test 1" },
            { value: "test2", children: "Test 2" },
        ],
        value: "test1",
        onChange: jest.fn(),
    };

    beforeEach(() => {
        wrapper = render(
            // Add Provider to make the test matches with our theme color
            <TestThemeProvider>
                <ToggleButtonGroupBase {...props} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test 1")).toBeInTheDocument();
        expect(screen.getByText("Test 2")).toBeInTheDocument();
    });

    it("should match color style", () => {
        expect(wrapper.getAllByTestId("ToggleButtonBase")[0]).toHaveStyle(
            "color: rgb(33, 150, 243)"
        ); // active toggleButton
        expect(wrapper.getAllByTestId("ToggleButtonBase")[1]).toHaveStyle("color: #757575");
    });

    it("should call onChange", () => {
        fireEvent.click(wrapper.getAllByTestId("ToggleButtonBase")[1]);
        expect(props.onChange).toBeCalled();
    });
});
