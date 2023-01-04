import RadioBase, { RadioBaseProps } from "src/squads/lesson/components/Radios/RadioBase/RadioBase";

import { render, screen } from "@testing-library/react";

describe("<RadioBase />", () => {
    it("should match snapshot", () => {
        const props: RadioBaseProps = {
            name: "test",
        };

        render(<RadioBase data-testid="RadioBase__Radio" {...props} />);
        expect(screen.getByTestId("RadioBase__Radio")).toMatchSnapshot();
    });
});
