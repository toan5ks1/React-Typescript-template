import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import SchoolNameColumn, { SchoolNameColumnProps } from "../SchoolNameColumn";

import { render, screen } from "@testing-library/react";

describe("<CommonColumn/>", () => {
    const renderComponent = (props?: Partial<SchoolNameColumnProps>) => {
        return render(
            <TestCommonAppProvider>
                <SchoolNameColumn content="Test" isCurrentSchool {...props} />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render content and current school props", () => {
        renderComponent();
        expect(screen.getByText("Test")).toBeInTheDocument();
        expect(screen.getByText("Test")).toHaveStyle("font-size:0.875rem"); //  14px ===  0.875rem
        expect(screen.getByText("[Current]")).toBeInTheDocument();
        expect(screen.getByText("[Current]")).toHaveStyle("color:rgb(76, 175, 80)"); // rgb(76, 175, 80) === "#4CAF50"
    });

    it("should not render current school", () => {
        renderComponent({ isCurrentSchool: false });

        expect(screen.queryByText("[Current]")).not.toBeInTheDocument();
    });
});
