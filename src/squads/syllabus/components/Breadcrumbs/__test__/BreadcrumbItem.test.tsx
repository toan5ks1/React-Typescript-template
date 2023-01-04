import { MemoryRouter } from "react-router";
import { toShortenStr } from "src/squads/syllabus/common/utils/string";

import BreadcrumbItem from "../BreadcrumbItem";

import { render, screen } from "@testing-library/react";

const mockName =
    "Breadcrumb name name name. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters";

describe("<BreadcrumbItem />", () => {
    it("should match snapshot", () => {
        const { container } = render(
            <MemoryRouter>
                <BreadcrumbItem name={mockName} to="" />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it("should be limited characters number", () => {
        render(
            <MemoryRouter>
                <BreadcrumbItem name={mockName} to="" />
            </MemoryRouter>
        );

        expect(screen.getByTestId("BreadcrumbItem").textContent).toEqual(
            toShortenStr(mockName, 30)
        );
        expect(screen.getByTestId("TypographyShortenStr")).toHaveAttribute("title", mockName);
    });
});
