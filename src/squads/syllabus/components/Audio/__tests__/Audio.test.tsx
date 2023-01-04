import Audio from "../Audio";

import { cleanup, render } from "@testing-library/react";

describe("<Audio />", () => {
    beforeEach(cleanup);

    it("should have matches attributes", () => {
        const src = "https://hello.com"; //audio tag will auto add / affix for the link
        const { container } = render(<Audio src={src} />);

        // has correct src based on props
        expect(container.querySelector("audio")?.src).toEqual(`${src}/`);
        // must have controls props = true
        expect(container.querySelector("audio")?.controls).toEqual(true);
    });
});
