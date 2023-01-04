import { ArrayElement } from "src/common/constants/types";
import {
    User_UserGroupOneQuery,
    User_UserGroupOneQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import roleService from "src/squads/user/service/define-service/role-service";
import userGroupService from "src/squads/user/service/define-service/user-group-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { pagination } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import UserGroupDetail from "../UserGroupDetail";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useGrantedPermissionPackage from "src/squads/user/modules/user-group-detail/hooks/useGrantedPermissionPackage";
import {
    mockGrantedPermissionPackage,
    mockUserGroup,
} from "src/squads/user/test-utils/mocks/userGroups";

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

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/user/modules/user-group-detail/hooks/useGrantedPermissionPackage", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useFetchLocations");

jest.mock("src/squads/user/hooks/useMapTreeLocations");

describe("UserGroupDetail component", () => {
    const roles = mockGrantedPermissionPackage.map((p) => p.role);
    const renderComponent = () => {
        const wrapper = render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <UserGroupDetail id={mockUserGroup.user_group_id} />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );

        return wrapper;
    };
    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "userGroup" | "role";
                    action: keyof typeof userGroupService.query | keyof typeof roleService.query;
                }) =>
                () => {
                    if (resource.entity === "userGroup")
                        return {
                            data: mockUserGroup,
                            isLoading: false,
                        };
                    else if (resource.entity === "role")
                        return {
                            data: roles,
                            isLoading: false,
                        };
                }
        );
        (
            useGrantedPermissionPackage as jest.Mock<ReturnType<typeof useGrantedPermissionPackage>>
        ).mockReturnValue({
            grantedPermissionPackage: mockGrantedPermissionPackage,
            isLoading: false,
            pagination: pagination(5),
            refetch: jest.fn(),
        });
    });

    it("should match snapshot", async () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render component correctly", () => {
        renderComponent();
        expect(screen.getByTestId("UserGroupDetail__Header")).toBeInTheDocument();
        expect(screen.getByTestId("GeneralUserGroupDetail__root")).toBeInTheDocument();
        expect(screen.getByTestId("UserGroupGrantedPermission")).toBeInTheDocument();
    });
    it("should render Notfound component when user group has no data", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: undefined,
            isLoading: false,
        }));
        renderComponent();
        expect(screen.getByTestId("NotFound__root")).toBeInTheDocument();
        expect(screen.queryByTestId("UserGroupDetail__Header")).not.toBeInTheDocument();
    });
    it("should render Loading component when fetching user group detail", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: true,
        }));
        renderComponent();
        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
    it("should show error snackbar and not found component when fetch user group data failed", () => {
        const mockShowSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(mockShowSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (_resource: { entity: "userGroup"; action: keyof typeof userGroupService.query }) =>
                (
                    _params: User_UserGroupOneQueryVariables,
                    _options?: UseQueryBaseOptions<
                        ArrayElement<User_UserGroupOneQuery["user_group"]> | undefined
                    >
                ) => {
                    _options?.onError?.(new Error("Fetch failed"));
                    return {
                        data: undefined,
                        isLoading: false,
                    };
                }
        );
        renderComponent();
        expect(mockShowSnackbar).toHaveBeenCalledTimes(1);
        expect(mockShowSnackbar).toBeCalledWith("Unable to load data, please try again!", "error");
        expect(screen.getByTestId("NotFound__root")).toBeInTheDocument();
    });
    it("should render edit dialog with default value correctly", () => {
        renderComponent();

        const userGroupNameField = screen.getByTestId("GeneralUserGroupDetail__generalNameValue");
        expect(userGroupNameField).toHaveTextContent(mockUserGroup.user_group_name);

        const grantedPermissions = screen.getAllByTestId("TableBase__row");

        expect(grantedPermissions).toHaveLength(mockGrantedPermissionPackage.length);

        grantedPermissions.forEach((grantedPermission, index) => {
            const roleField = within(grantedPermission).getByTestId(
                "UserGroupGrantedPermissionTable__roleName"
            );
            expect(roleField).toHaveTextContent(roles[index].role_name);

            const locationField = within(grantedPermission).getByTestId(
                "UserGroupGrantedPermissionTable__location"
            );
            const locations = [...mockGrantedPermissionPackage[index].locations];

            const expectedLocations = locations.map((l) => l.name).join(", ");
            expect(locationField).toHaveTextContent(expectedLocations);
        });
    });
    it("should open and close user group edit dialog correctly", () => {
        renderComponent();

        const actionPanelBtn = screen.getByTestId("ActionPanel__trigger");
        userEvent.click(actionPanelBtn);

        const actionPanelMenu = screen.getByTestId("ActionPanel__menuList");
        const editBtn = within(actionPanelMenu).queryByRole("menuitem");
        userEvent.click(editBtn!);

        expect(screen.getByTestId("DialogFullScreen__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent(
            "Edit User Group"
        );

        expect(screen.getByTestId("FormUserGroupInfo__inputUserGroupName")).toHaveValue(
            mockUserGroup.user_group_name
        );

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        const confirmDialog = screen.getByTestId("DialogWithHeaderFooter_wrapper");

        expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();

        userEvent.click(within(confirmDialog).getByTestId("FooterDialogConfirm__buttonSave"));

        expect(screen.queryByTestId("DialogFullScreen__dialog")).not.toBeInTheDocument();
    });
});
