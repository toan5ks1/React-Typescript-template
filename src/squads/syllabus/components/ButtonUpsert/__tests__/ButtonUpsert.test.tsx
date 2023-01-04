import ButtonUpsert from "../ButtonUpsert";

import { render, screen } from "@testing-library/react";

describe(ButtonUpsert.name, () => {
    it("should render successfully", () => {
        render(<ButtonUpsert />);

        expect(screen.getByTestId("ButtonUpsert__root")).toBeInTheDocument();
    });
});
