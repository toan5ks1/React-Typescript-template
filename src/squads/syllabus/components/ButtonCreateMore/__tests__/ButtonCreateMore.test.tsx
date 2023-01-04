import ButtonCreateMore, { ButtonCreateMoreProps } from "../ButtonCreateMore";

import { render, screen } from "@testing-library/react";

describe(ButtonCreateMore.name, () => {
    const props: ButtonCreateMoreProps = {
        children: "Test",
    };

    it("should render with children", () => {
        render(<ButtonCreateMore {...props} />);

        expect(screen.getByText("Test")).toBeInTheDocument();
    });
});
