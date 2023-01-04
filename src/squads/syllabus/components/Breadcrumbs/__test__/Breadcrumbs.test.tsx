import { MemoryRouter } from "react-router";
import { toShortenStr } from "src/squads/syllabus/common/utils/string";

import Breadcrumbs, { BreadcrumbsProps } from "../Breadcrumbs";

import { render, screen } from "@testing-library/react";

describe("<Breadcrumbs />", () => {
    const name =
        "Breadcrumb name name name. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters";

    it("should match snapshot", async () => {
        const props: BreadcrumbsProps = {
            loading: false,
            breadcrumbInfos: [
                {
                    translateKey: "A_title",
                    url: "/A",
                },
                {
                    translateKey: "B_title",
                    name: "B_Name",
                    url: "/A/B",
                },
            ],
            name,
        };
        const { container } = render(
            <MemoryRouter>
                <Breadcrumbs {...props} />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    it("should be limited characters number", async () => {
        const nameTestId = "Breadcrumbs__entityName";
        const props: BreadcrumbsProps = { loading: false, breadcrumbInfos: [], name };
        render(<Breadcrumbs {...props} />);

        expect((await screen.findByTestId(nameTestId)).textContent).toEqual(toShortenStr(name, 30));
    });

    it("should render skeleton when name = undefined", async () => {
        render(<Breadcrumbs loading={false} breadcrumbInfos={[]} name={undefined} />);

        expect(await screen.findByTestId("Breadcrumbs__skeleton")).toBeInTheDocument();
    });

    it("should render skeleton when name null ", async () => {
        render(<Breadcrumbs loading={false} breadcrumbInfos={[]} name={null} />);

        expect(await screen.findByTestId("Breadcrumbs__skeleton")).toBeInTheDocument();
    });
});
