import WrapperLookingFor, { WrapperLookingForProps } from "../WrapperLookingFor";

import { screen, render } from "@testing-library/react";

const props: WrapperLookingForProps = {
    variant: "empty-icon",
    content: "Calendar",
    helperText: "test",
    children: <div>children</div>,
};

describe("<WrapperLookingFor /> component", () => {
    it("should render empty icon calendar & helperText correctly", () => {
        render(<WrapperLookingFor {...props} />);
        expect(screen.getByTestId("WrapperLookingFor__icon")).toBeInTheDocument();
        expect(screen.getByText("test")).toHaveTextContent("test");
    });

    it("should render children", () => {
        render(<WrapperLookingFor {...props} variant="result" />);
        expect(screen.getByText("children")).toHaveTextContent("children");
    });

    it("should render loading", () => {
        render(<WrapperLookingFor {...props} variant="loading" />);
        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
});
