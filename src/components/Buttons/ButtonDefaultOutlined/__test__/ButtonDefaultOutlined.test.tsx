import { TestThemeProvider } from "src/test-utils";

import ButtonDefaultOutlined, { ButtonDefaultOutlinedProps } from "../ButtonDefaultOutlined";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonDefaultOutlined />", () => {
    let wrapper: RenderResult;

    const props: ButtonDefaultOutlinedProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ButtonDefaultOutlined {...props} />
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
