import BackdropLoading, { BackdropLoadingProps } from "../BackdropLoading";

import { render, RenderResult, screen } from "@testing-library/react";

describe("<BackdropLoading />", () => {
    let wrapper: RenderResult;

    const props: BackdropLoadingProps = {
        open: true,
    };

    beforeEach(() => {
        wrapper = render(<BackdropLoading {...props} />);
    });

    it("should exist children", () => {
        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
