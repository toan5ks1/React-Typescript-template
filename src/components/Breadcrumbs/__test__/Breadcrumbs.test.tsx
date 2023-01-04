import { Entities } from "src/common/constants/enum";
import { toShortenStr } from "src/common/utils/other";

import Breadcrumbs from "../Breadcrumbs";

import { render, screen } from "@testing-library/react";

jest.mock("../../../hooks/useBreadcrumb", () => {
    return {
        __esModule: true,
        default: () => ({ breadcrumbs: [] }),
    };
});

describe("<Breadcrumbs />", () => {
    const name =
        "Breadcrumb name name name. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters";

    it("should match snapshot", async () => {
        const { container } = render(<Breadcrumbs resource={Entities.CHAPTERS} name={name} />);

        expect(container).toMatchSnapshot();
    });

    it("should be limited characters number", async () => {
        const nameTestId = "Breadcrumbs__entityName";
        render(<Breadcrumbs resource={Entities.CHAPTERS} name={name} />);

        expect((await screen.findByTestId(nameTestId)).textContent).toEqual(toShortenStr(name, 30));
    });

    it("should render skeleton when name = undefined", async () => {
        render(<Breadcrumbs resource={Entities.CHAPTERS} name={undefined} />);

        expect(await screen.findByTestId("Breadcrumbs__skeleton")).toBeInTheDocument();
    });
    it("should render skeleton when name null ", async () => {
        render(<Breadcrumbs resource={Entities.CHAPTERS} name={null} />);

        expect(await screen.findByTestId("Breadcrumbs__skeleton")).toBeInTheDocument();
    });
});
