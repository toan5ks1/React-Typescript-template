import { TestThemeProvider } from "src/test-utils";

import DrawerWithHeaderAndFooter, {
    DrawerWithHeaderAndFooterProps,
} from "../DrawerWithHeaderAndFooter";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<DrawerWithHeaderAndFooter /> none header and footer", () => {
    let wrapper: RenderResult;

    const props: DrawerWithHeaderAndFooterProps = {
        isShowHeaderAction: false,
        isShowFooterAction: false,
        onClose: jest.fn(),
        open: true,
        title: "None Action Header and Footer",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DrawerWithHeaderAndFooter
                    data-testid="DrawerWithHeaderAndFooter__container"
                    {...props}
                />
            </TestThemeProvider>
        );
    });

    it("should not exist title", () => {
        expect(screen.queryByText("None Action Header and Footer")).toBeNull();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DrawerWithHeaderAndFooter__container")).toMatchSnapshot();
    });
});

describe("<DrawerWithHeaderAndFooter /> none header", () => {
    let wrapper: RenderResult;

    const props: DrawerWithHeaderAndFooterProps = {
        isShowHeaderAction: false,
        isShowFooterAction: true,
        onClose: jest.fn(),
        open: true,
        title: "None Action Header",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                {" "}
                <DrawerWithHeaderAndFooter
                    data-testid="DrawerWithHeaderAndFooter__container"
                    {...props}
                />
            </TestThemeProvider>
        );
    });

    it("should not exist title", () => {
        expect(screen.queryByText("None Action Header")).toBeNull();
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.getByTestId("DrawerWithHeaderAndFooter__container")).toMatchSnapshot();
    });
});
