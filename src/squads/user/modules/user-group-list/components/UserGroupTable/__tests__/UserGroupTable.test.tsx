import { mockPagination } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import UserGroupTable, {
    UserGroupTableProp,
} from "src/squads/user/modules/user-group-list/components/UserGroupTable";

import { render, screen } from "@testing-library/react";
import { mockUserGroupList } from "src/squads/user/test-utils/mocks/userGroups";

export const userGroupTableProp: UserGroupTableProp = {
    data: mockUserGroupList,
    isFetching: false,
    pagination: mockPagination,
};

describe("<UserGroupTable />", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <UserGroupTable {...userGroupTableProp} />
            </TestCommonAppProvider>
        );
    };
    it("should match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct user group", () => {
        renderComponent();
        const userGroupNameRows = screen.getAllByTestId("UserGroupList__userGroupName");
        expect(userGroupNameRows).toHaveLength(mockUserGroupList.length);
        userGroupNameRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockUserGroupList[index].user_group_name);
        });
    });
});
