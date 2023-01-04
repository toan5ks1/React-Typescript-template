import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import CommonColumn from "../CommonColumn";

import { render, screen } from "@testing-library/react";

describe("<CommonColumn/>", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <CommonColumn content="Test" />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render content props", () => {
        renderComponent();
        expect(screen.getByText("Test")).toBeInTheDocument();
        expect(screen.getByText("Test")).toHaveStyle("font-size:0.875rem"); //  14px ===  0.875rem
    });
});
