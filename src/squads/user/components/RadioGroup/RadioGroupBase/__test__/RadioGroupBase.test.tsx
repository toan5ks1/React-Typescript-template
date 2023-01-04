import RadioGroupBase, { RadioGroupBaseProps } from "../RadioGroupBase";

import { render, screen } from "@testing-library/react";

describe("<RadioGroupBase />", () => {
    it("should match snapshot", () => {
        const props: RadioGroupBaseProps = {
            name: "test",
        };

        render(<RadioGroupBase data-testid="RadioGroupBase__Radio" {...props} />);
        expect(screen.getByTestId("RadioGroupBase__Radio")).toMatchSnapshot();
    });
});
