import TextPreview from "../TextPreview";

import { render, screen } from "@testing-library/react";

describe("<TextPreview />", () => {
    it("should render without crash", () => {
        render(<TextPreview title="X" value="Y" />);
    });

    it("should have correct attribute", () => {
        render(<TextPreview title="X" value="Y" />);

        expect(screen.getByText("X")).toBeInTheDocument();
        expect(screen.getByText("Y")).toBeInTheDocument();
    });
});
