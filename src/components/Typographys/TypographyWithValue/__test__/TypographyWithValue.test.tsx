import { ComponentProps } from "react";

import TypographyWithValue from "../TypographyWithValue";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyWithValue /> with vertical direction", () => {
    let wrapper: RenderResult;

    const props: ComponentProps<typeof TypographyWithValue> = {
        label: "Name",
        value: "Test",
    };

    beforeEach(() => {
        wrapper = render(<TypographyWithValue {...props} />);
    });

    it("should exist label", () => {
        expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("should exist value", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<TypograhpyWithValue /> with horizontal direction", () => {
    let wrapper: RenderResult;

    const props: ComponentProps<typeof TypographyWithValue> = {
        label: "Name",
        value: "Test",
        variant: "horizontal",
    };

    beforeEach(() => {
        wrapper = render(<TypographyWithValue {...props} />);
    });
    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
