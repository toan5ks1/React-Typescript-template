import { useWatch } from "react-hook-form";
import { TestApp } from "src/test-utils";
import { mockAuthorizedLocationNode, mockUnauthorizedLocationNode } from "src/test-utils/locations";
import { GlobalLocationTreeNode } from "src/typings/locations-provider";

import CheckBoxLocation from "../CheckBoxLocation";

import { screen, render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/test-utils/TestThemeProvider";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useWatch: jest.fn(),
    };
});
const onLocationToggled = jest.fn();

const renderComponent = (mockLocation: GlobalLocationTreeNode) => {
    render(
        <TestApp>
            <TestThemeProvider>
                <CheckBoxLocation location={mockLocation} onLocationToggled={onLocationToggled} />
            </TestThemeProvider>
        </TestApp>
    );
};
const mockUseWatch = (isChecked: boolean, indeterminate: boolean) => {
    (useWatch as jest.Mock).mockImplementation(() => ({
        isChecked,
        indeterminate,
    }));
};

describe("<CheckBoxLocation />", () => {
    it("should show name unauthorized location correctly", () => {
        mockUseWatch(false, false);
        renderComponent(mockUnauthorizedLocationNode);
        const labelCheckbox = screen.getByText(`Unauthorized location`);
        expect(labelCheckbox).toBeInTheDocument();
    });

    it("should disabled checkbox with unauthorized location", () => {
        mockUseWatch(false, false);
        renderComponent(mockUnauthorizedLocationNode);
        const checkboxLocation = screen.getByTestId(
            `CheckBoxLocation__${mockUnauthorizedLocationNode.locationId}`
        );
        expect(checkboxLocation).toBeInTheDocument();
        const inputCheckboxLocation = within(checkboxLocation).getByRole("checkbox");
        expect(inputCheckboxLocation).toBeDisabled();
    });

    it("should not disabled checkbox with authorized location", () => {
        mockUseWatch(false, false);
        renderComponent(mockAuthorizedLocationNode);

        const checkboxLocation = screen.getByTestId(
            `CheckBoxLocation__${mockAuthorizedLocationNode.locationId}`
        );
        expect(checkboxLocation).toBeInTheDocument();
        const inputCheckboxLocation = within(checkboxLocation).getByRole("checkbox");
        expect(inputCheckboxLocation).not.toBeDisabled();
    });

    it("should handle toogle checkbox correctly", async () => {
        mockUseWatch(false, false);
        renderComponent(mockAuthorizedLocationNode);

        const checkboxLocation = screen.getByTestId(
            `CheckBoxLocation__${mockAuthorizedLocationNode.locationId}`
        );
        const inputCheckboxLocation = within(checkboxLocation).getByRole("checkbox");

        userEvent.click(inputCheckboxLocation);
        expect(onLocationToggled).toBeCalled();
    });

    it("should render checkbox with indeterminate correctly", async () => {
        mockUseWatch(false, true);
        renderComponent(mockAuthorizedLocationNode);

        const checkboxLocation = screen.getByTestId(
            `CheckBoxLocation__${mockAuthorizedLocationNode.locationId}`
        );

        expect(checkboxLocation).toHaveClass("MuiCheckbox-colorDefault");
    });

    it("should render checkbox with not indeterminate correctly", async () => {
        mockUseWatch(true, false);
        renderComponent(mockAuthorizedLocationNode);

        const checkboxLocation = screen.getByTestId(
            `CheckBoxLocation__${mockAuthorizedLocationNode.locationId}`
        );

        expect(checkboxLocation).toHaveClass("MuiCheckbox-colorPrimary");
    });
});
