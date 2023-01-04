import BaseColumn, { BaseColumnProps } from "../BaseColumn";

import { render, screen } from "@testing-library/react";

describe("BaseColumn/>", () => {
    const renderComponent = (props?: Partial<BaseColumnProps>) => {
        return render(<BaseColumn content={"Test"} {...props} />);
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render content when having value", () => {
        renderComponent();

        expect(screen.getByText("Test")).toBeInTheDocument();
        expect(screen.getByText("Test")).toHaveClass("MuiTypography-body2");
    });
});
