import { User_UserGroupListV2Query } from "src/squads/user/service/bob/bob-types";
import { inferQuery, inferQueryPagination } from "src/squads/user/service/infer-service";
import { mockPagination } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import UserGroupList from "../UserGroupList";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    mockGrantedPermissionPackage,
    mockUserGroupList,
} from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQueryPagination: jest.fn(),
        inferQuery: jest.fn(),
    };
});
jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/user-group-upsert/hooks/useFetchLocations");

jest.mock("src/squads/user/hooks/useMapTreeLocations");

describe("<UserGroupList/>", () => {
    const renderComponent = (userGroupList: User_UserGroupListV2Query["user_group"]) => {
        (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
            result: {
                isLoading: false,
                refetch: jest.fn(),
            },
            data: { data: userGroupList },
            pagination: mockPagination,
        }));

        return render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <UserGroupList />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );
    };

    it("should render correct UserGroup table with data", () => {
        renderComponent(mockUserGroupList);
        const userGroupNameRows = screen.getAllByTestId("UserGroupList__userGroupName");
        expect(userGroupNameRows).toHaveLength(mockUserGroupList.length);
        userGroupNameRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockUserGroupList[index].user_group_name);
        });
    });
    it("should render correct UserGroup table with no data", () => {
        renderComponent([]);
        expect(screen.queryByTestId("UserGroupList__userGroupName")).not.toBeInTheDocument();
        expect(screen.getByText("No Result")).toBeInTheDocument();
    });

    it("should open and close user group upsert dialog correctly", () => {
        const roles = mockGrantedPermissionPackage.map((p) => p.role);

        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: roles,
            isLoading: false,
        }));

        renderComponent(mockUserGroupList);

        const addBtn = screen.getByTestId("UserGroupTable__addButton");

        userEvent.click(addBtn);

        expect(screen.getByTestId("DialogFullScreen__dialog")).toBeInTheDocument();

        expect(screen.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent(
            "Add User Group"
        );

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));

        const confirmDialog = screen.getByTestId("DialogWithHeaderFooter_wrapper");

        expect(screen.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();

        userEvent.click(within(confirmDialog).getByTestId("FooterDialogConfirm__buttonSave"));

        expect(screen.queryByTestId("DialogFullScreen__dialog")).not.toBeInTheDocument();
    });
});
