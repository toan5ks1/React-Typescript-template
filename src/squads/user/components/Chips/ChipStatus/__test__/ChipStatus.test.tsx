import { TestThemeProvider } from "src/squads/user/test-utils/providers";

import ChipStatus, { ChipStatusProps } from "../ChipStatus";

import { render, RenderResult } from "@testing-library/react";

describe("<ChipStatus /> all statuses", () => {
    let wrapper: RenderResult;

    const renderChipStatus = (props: ChipStatusProps, propsDark: ChipStatusProps) =>
        render(
            <TestThemeProvider>
                <ChipStatus {...props} />
                <ChipStatus {...propsDark} />
            </TestThemeProvider>
        );

    // default and defaultDark
    it("should display the correct colors for default statuses", () => {
        const defaultProps: ChipStatusProps = {
            label: "default",
            status: "default",
            theme: "light",
        };
        const defaultPropsDark: ChipStatusProps = {
            label: "default dark",
            status: "default",
            theme: "dark",
        };

        wrapper = renderChipStatus(defaultProps, defaultPropsDark);

        document.head.innerHTML = document.head.innerHTML;

        expect(wrapper.getAllByTestId("ChipStatus")[0]).toHaveStyle(
            "background-color: rgba(245, 245, 245, 1); color: rgba(117, 117, 117, 1);"
        );
        expect(wrapper.getAllByTestId("ChipStatus")[1]).toHaveStyle(
            "background-color: rgba(189, 189, 189, 1); color: rgba(255, 255, 255, 1);"
        );
    });

    // error and errorDark
    it("should display the correct colors for error statuses", () => {
        const errorProps: ChipStatusProps = {
            label: "error",
            status: "error",
            theme: "light",
        };
        const errorPropsDark: ChipStatusProps = {
            label: "error dark",
            status: "error",
            theme: "dark",
        };

        wrapper = renderChipStatus(errorProps, errorPropsDark);

        document.head.innerHTML = document.head.innerHTML;

        expect(wrapper.getAllByTestId("ChipStatus")[0]).toHaveStyle(
            "background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #F44336; color: rgb(244, 67, 54);"
        );
        expect(wrapper.getAllByTestId("ChipStatus")[1]).toHaveStyle(
            "background-color: #F44336; color: rgba(255, 255, 255, 1);"
        );
    });

    // success and successDark
    it("should display the correct colors for success statuses", () => {
        const successProps: ChipStatusProps = {
            label: "success",
            status: "success",
            theme: "light",
        };
        const successPropsDark: ChipStatusProps = {
            label: "success dark",
            status: "success",
            theme: "dark",
        };

        wrapper = renderChipStatus(successProps, successPropsDark);

        document.head.innerHTML = document.head.innerHTML;

        expect(wrapper.getAllByTestId("ChipStatus")[0]).toHaveStyle(
            "background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #4CAF50; color: rgb(59, 135, 62);"
        );
        expect(wrapper.getAllByTestId("ChipStatus")[1]).toHaveStyle(
            "background-color: #4CAF50; color: rgba(255, 255, 255, 1);"
        );
    });

    // warning and warningDark
    it("should display the correct colors for warning statuses", () => {
        const warningProps: ChipStatusProps = {
            label: "warning",
            status: "warning",
            theme: "light",
        };
        const warningPropsDark: ChipStatusProps = {
            label: "warning dark",
            status: "warning",
            theme: "dark",
        };

        wrapper = renderChipStatus(warningProps, warningPropsDark);

        document.head.innerHTML = document.head.innerHTML;

        expect(wrapper.getAllByTestId("ChipStatus")[0]).toHaveStyle(
            "background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FF9800; color: rgb(199, 119, 0);"
        );
        expect(wrapper.getAllByTestId("ChipStatus")[1]).toHaveStyle(
            "background-color: #FF9800; color: rgba(255, 255, 255, 1);"
        );
    });

    // others and othersDark
    it("should display the correct colors for others statuses", () => {
        const othersProps: ChipStatusProps = {
            label: "others",
            status: "others",
            theme: "light",
        };
        const othersPropsDark: ChipStatusProps = {
            label: "others dark",
            status: "others",
            theme: "dark",
        };

        wrapper = renderChipStatus(othersProps, othersPropsDark);

        document.head.innerHTML = document.head.innerHTML;

        expect(wrapper.getAllByTestId("ChipStatus")[0]).toHaveStyle("color: rgb(156, 39, 176);");
        expect(wrapper.getAllByTestId("ChipStatus")[1]).toHaveStyle(
            "background-color: rgb(156, 39, 176); color: rgba(255, 255, 255, 1);"
        );
    });

    // custom and customDark
    it("should display the correct colors for custom statuses", () => {
        const customProps: ChipStatusProps = {
            label: "custom",
            status: "custom",
            theme: "light",
        };
        const customPropsDark: ChipStatusProps = {
            label: "custom dark",
            status: "custom",
            theme: "dark",
        };

        wrapper = renderChipStatus(customProps, customPropsDark);

        document.head.innerHTML = document.head.innerHTML;

        expect(wrapper.getAllByTestId("ChipStatus")[0]).toHaveStyle("color: rgb(233, 30, 99);");
        expect(wrapper.getAllByTestId("ChipStatus")[1]).toHaveStyle(
            "background-color: rgb(233, 30, 99); color: rgba(255, 255, 255, 1);"
        );
    });
});

describe("<ChipStatus /> colors do not change", () => {
    it("should not change colors when a color is directly inputted", () => {
        const wrapper = render(
            <TestThemeProvider>
                <ChipStatus label="default" status="default" theme="light" />
            </TestThemeProvider>
        );

        document.head.innerHTML = document.head.innerHTML;

        // rgb equivalent of theme.palette.text.secondary or #757575
        expect(wrapper.getByTestId("ChipStatus")).toHaveStyle(
            "background-color: rgba(245, 245, 245, 1); color: rgba(117, 117, 117, 1);"
        );
    });
});
