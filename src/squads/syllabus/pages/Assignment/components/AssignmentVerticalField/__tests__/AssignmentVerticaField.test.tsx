import { ComponentProps } from "react";

import AssignmentVerticalField from "../AssignmentVerticalField";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<AssignmentVerticalField />", () => {
    let wrapper: RenderResult;

    const props: ComponentProps<typeof AssignmentVerticalField> = {
        label: "Name",
        value: "Test",
        valueTypoProps: {
            "data-testid": "Test_Id",
        },
    };

    beforeEach(() => {
        wrapper = render(<AssignmentVerticalField {...props} />);
    });

    it("should exist label", () => {
        expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("should exist value", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should exist data-testid", () => {
        expect(screen.getByTestId("Test_Id")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
