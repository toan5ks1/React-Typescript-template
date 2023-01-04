import { staffOneMockData } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { HeaderStaffDetail } from "../HeaderStaffDetail";

import { render, screen } from "@testing-library/react";

//TODO: Will update when we move component in phase - 2
jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: () => ({
        breadcrumbs: [
            {
                url: `/staff`,
                name: "resources.staff.titles.staffManagement",
            },
        ],
    }),
}));

describe("<HeaderStaffDetail/>", () => {
    const renderComponent = () => {
        const wrapper = render(
            <TestCommonAppProvider>
                <HeaderStaffDetail staff={staffOneMockData} />
            </TestCommonAppProvider>
        );

        return wrapper;
    };
    it("should be to match snapshot", () => {
        const wrapper = renderComponent();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct breadcrumb", () => {
        renderComponent();

        expect(screen.getByTestId("BreadcrumbItem")).toBeInTheDocument();
        expect(screen.getByTestId("BreadcrumbItem")).toHaveAttribute("href", "/staff");

        expect(screen.getByTestId("Breadcrumbs__entityName")).toBeInTheDocument();
        expect(screen.getByTestId("Breadcrumbs__entityName")).toHaveTextContent(
            staffOneMockData.user!.name
        );
    });
});
