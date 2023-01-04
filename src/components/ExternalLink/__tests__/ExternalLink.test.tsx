import ExternalLink from "../ExternalLink";

import { render, screen } from "@testing-library/react";

describe("<ExternalLink />", () => {
    it("should match snapshot", () => {
        const { container } = render(<ExternalLink href="test-link" />);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("should have correct link value", () => {
        render(<ExternalLink href="test-link1" />);

        expect(screen.getByRole("link").getAttribute("href")).toEqual("test-link1");
    });
});
