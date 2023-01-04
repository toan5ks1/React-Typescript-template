import { TestThemeProvider } from "src/test-utils";

import ButtonDelete, { ButtonDeleteProps } from "../ButtonDelete";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<ButtonDelete />", () => {
    let wrapper: RenderResult;

    const props: ButtonDeleteProps = {
        children: "Test",
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ButtonDelete {...props} />
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
