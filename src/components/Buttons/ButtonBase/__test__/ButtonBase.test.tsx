import { TestThemeProvider } from "src/test-utils";

import ButtonBase, { ButtonBaseProps } from "../ButtonBase";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonBase />", () => {
    let wrapper: RenderResult;

    const props: ButtonBaseProps = {
        children: <div>Test</div>,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ButtonBase {...props} />
            </TestThemeProvider>
        );
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<ButtonBase />", () => {
    const props: ButtonBaseProps = {
        children: <div>Test</div>,
        isLoading: true,
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <ButtonBase {...props} />
            </TestThemeProvider>
        );
    });

    it("should display circular loading", () => {
        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
});
