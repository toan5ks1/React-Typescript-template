import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { HeaderUserGroupDetail } from "../HeaderUserGroupDetail";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockUserGroup } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: () => ({
        breadcrumbs: [
            {
                url: `/user_group`,
                name: "resources.user_group.title",
            },
        ],
    }),
}));

describe("<HeaderUserGroupDetail /> User Group Header detail", () => {
    const mockHandleOpenEditDialog = jest.fn();
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <HeaderUserGroupDetail
                    userGroup={mockUserGroup}
                    onOpenEditDialog={mockHandleOpenEditDialog}
                />
            </TestCommonAppProvider>
        );
    };
    it("should be to match snapshot", () => {
        const wrapper = renderComponent();

        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct User Group Header detail", () => {
        renderComponent();

        expect(screen.getByTestId("UserGroupDetail__Header")).toBeInTheDocument();
        expect(screen.getByTestId("BreadcrumbItem")).toBeInTheDocument();
        expect(screen.getByTestId("BreadcrumbItem")).toHaveAttribute("href", "/user_group");

        expect(screen.getByTestId("Breadcrumbs__entityName")).toBeInTheDocument();
        expect(screen.getByTestId("Breadcrumbs__entityName")).toHaveTextContent(
            mockUserGroup.user_group_name
        );
    });

    it("should trigger action menus when clicking", () => {
        renderComponent();

        const actionPanelBtn = screen.getByTestId("ActionPanel__trigger");
        userEvent.click(actionPanelBtn);

        const actionPanelMenu = screen.getByTestId("ActionPanel__menuList");
        const editBtn = within(actionPanelMenu).queryByRole("menuitem");
        userEvent.click(editBtn!);

        expect(mockHandleOpenEditDialog).toHaveBeenCalledTimes(1);
    });
});
