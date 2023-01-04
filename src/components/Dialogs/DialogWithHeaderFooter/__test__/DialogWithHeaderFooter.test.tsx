import { FieldValues } from "react-hook-form";
import { TestThemeProvider } from "src/test-utils";
import { mockReturnPixelOfBreakpoint } from "src/test-utils/dialog";

import { Breakpoint } from "@mui/material/styles";

import { DialogHFProps } from "../../types";
import DialogWithHeaderFooterHF from "../DialogWithHeaderFooter";

import { render, RenderResult, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

describe("<DialogWithHeaderFooter /> none action header and footer", () => {
    let wrapper: RenderResult;

    const props: DialogHFProps<FieldValues> = {
        onClose: jest.fn(),
        open: true,
        title: "None Action Header and Footer",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogWithHeaderFooterHF
                    data-testid="DialogWithHeaderFooter__container"
                    {...props}
                />
            </TestThemeProvider>
        );
    });

    it("should exist title", () => {
        expect(screen.getByText("None Action Header and Footer")).toBeInTheDocument();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DialogWithHeaderFooter__container")).toMatchSnapshot();
    });

    it("should render correct style", () => {
        const children = screen.getByTestId("DialogWithHeaderFooter__dialogContent").children;

        expect(children[0]).toHaveStyle("padding-top: 8px;");
    });
});

describe("<DialogWithHeaderFooter /> none action header", () => {
    let wrapper: RenderResult;

    const props: DialogHFProps<FieldValues> = {
        onClose: jest.fn(),
        open: true,
        title: "None Action Header",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogWithHeaderFooterHF
                    data-testid="DialogWithHeaderFooter__container"
                    {...props}
                />
            </TestThemeProvider>
        );
    });

    it("should exist title", () => {
        expect(screen.getByText("None Action Header")).toBeInTheDocument();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DialogWithHeaderFooter__container")).toMatchSnapshot();
    });

    it("should render correct style", () => {
        const children = screen.getByTestId("DialogWithHeaderFooter__dialogContent").children;

        expect(children[0]).toHaveStyle("padding-top: 8px;");
    });
});

describe("<DialogWithHeaderFooter /> none action footer", () => {
    let wrapper: RenderResult;

    const props: DialogHFProps<FieldValues> = {
        onEdit: jest.fn(),
        onDelete: jest.fn(),
        onClose: jest.fn(),
        onSave: jest.fn(),
        open: true,
        title: "None Action Footer",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogWithHeaderFooterHF
                    data-testid="DialogWithHeaderFooter__container"
                    {...props}
                />
            </TestThemeProvider>
        );
    });

    it("should exist title", () => {
        expect(screen.getByText("None Action Footer")).toBeInTheDocument();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DialogWithHeaderFooter__container")).toMatchSnapshot();
    });

    it("should render correct style", () => {
        const children = screen.getByTestId("DialogWithHeaderFooter__dialogContent").children;

        expect(children[0]).toHaveStyle("padding-top: 8px;");
    });
});

describe("<DialogWithHeaderFooter /> width check", () => {
    let wrapper: RenderResult;

    const breakpointKeys = Object.keys(theme.breakpoints!.values!).map((key) => key as Breakpoint);

    for (let index = 0; index < breakpointKeys.length; index++) {
        const size = mockReturnPixelOfBreakpoint(breakpointKeys[index]);

        const props: DialogHFProps<FieldValues> = {
            title: "Width check",
            children: <div>Test</div>,
            onClose: jest.fn(),
            onSave: jest.fn(),
            open: true,
            maxWidthBox: breakpointKeys[index],
            minWidthBox: breakpointKeys[index],
        };

        it("should have correct width size", () => {
            wrapper = render(
                <TestThemeProvider>
                    <DialogWithHeaderFooterHF
                        data-testid="DialogWithHeaderFooter__container"
                        {...props}
                    />
                </TestThemeProvider>
            );

            const dialogWrapper = wrapper.getByTestId("DialogWithHeaderFooter_wrapper");

            if (breakpointKeys[index] === "xs") {
                expect(dialogWrapper).toHaveStyle(`min-width: ${size}`);
                expect(dialogWrapper).toHaveStyle(`max-width: ${size}`);
            } else {
                expect(dialogWrapper).toHaveStyle(`min-width: ${size}px`);
                expect(dialogWrapper).toHaveStyle(`max-width: ${size}px`);
            }
        });
    }
});
