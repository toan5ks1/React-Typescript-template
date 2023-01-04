import { TestThemeProvider } from "src/test-utils";

import ButtonCloseSidebar from "../ButtonCloseSidebar";

import { render, RenderResult } from "@testing-library/react";

describe("<ButtonCloseSidebar />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <ButtonCloseSidebar data-testid="test_button" />
            </TestThemeProvider>
        );
    });

    it("should have correct border style", () => {
        const button = wrapper.getByTestId("test_button");

        // https://github.com/testing-library/jest-dom/issues/350
        // Add this line so that the test render the style correctly
        document.head.innerHTML = document.head.innerHTML;

        expect(button).toHaveStyle("border: 1px solid #E0E0E0");
    });
});
