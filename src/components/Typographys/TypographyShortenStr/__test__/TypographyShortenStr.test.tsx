import TypographyShortenStr, { TypographyShortenStrProps } from "../TypographyShortenStr";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<TypographyShortenStr />", () => {
    let wrapper: RenderResult;

    const props: TypographyShortenStrProps = {
        children: "1234567890",
        maxLength: 5,
    };

    beforeEach(() => {
        wrapper = render(<TypographyShortenStr {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByText("12345...")).toBeInTheDocument();
        expect(screen.getByTestId("TypographyShortenStr").getAttribute("title")).toEqual(
            "1234567890"
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});

describe("<TypographyShortenStr /> without tooltip", () => {
    it("should match snapshot", () => {
        const props: TypographyShortenStrProps = {
            children: "12345",
            maxLength: 5,
        };

        const wrapper = render(<TypographyShortenStr {...props} />);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct text length < maxLength", () => {
        const props: TypographyShortenStrProps = {
            children: "1234",
            maxLength: 5,
        };

        const wrapper = render(<TypographyShortenStr {...props} />);
        expect(wrapper.getByText("1234")).toBeInTheDocument();
        expect(wrapper.queryByTestId("TypographyShortenStr")).not.toBeInTheDocument();
    });

    it("should render correct text length = maxLength", () => {
        const props: TypographyShortenStrProps = {
            children: "12345",
            maxLength: 5,
        };

        const wrapper = render(<TypographyShortenStr {...props} />);
        expect(wrapper.getByText("12345")).toBeInTheDocument();

        expect(wrapper.queryByTestId("TypographyShortenStr")).not.toBeInTheDocument();
    });
});
