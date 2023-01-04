import { MemoryRouter, Route } from "react-router";

import StyledLink from "../StyledLink";

import { render } from "@testing-library/react";

describe("<StyledLink />", () => {
    it("should has correct attributes", () => {
        const src = "to-here";
        const children = "123";

        const { container } = render(
            <MemoryRouter>
                <Route>
                    <StyledLink to={src}>{children}</StyledLink>
                </Route>
            </MemoryRouter>
        );

        expect(container.querySelector("a")?.href).toContain(src);

        expect(container.querySelector("a")?.textContent).toEqual(children);
    });
});
