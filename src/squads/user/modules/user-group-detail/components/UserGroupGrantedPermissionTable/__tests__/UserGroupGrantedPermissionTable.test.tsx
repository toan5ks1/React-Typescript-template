import { mockTreeLocations } from "src/squads/user/test-utils/mocks/locations";
import { pagination } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import UserGroupGrantedPermissionTable, {
    UserGroupTableProps,
} from "../UserGroupGrantedPermissionTable";

import { render, screen, within } from "@testing-library/react";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/modules/user-group-upsert/hooks/useFetchLocations");
describe("<UserGroupGrantedPermissionTable />", () => {
    const renderComponent = (props: UserGroupTableProps) => {
        return render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <UserGroupGrantedPermissionTable {...props} />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );
    };
    const props: UserGroupTableProps = {
        dataSource: mockGrantedPermissionPackage,
        isLoading: false,
        pagination: pagination(5),
    };
    it("should be to match snapshot", () => {
        const wrapper = renderComponent(props);

        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct UserGroup table with data", () => {
        renderComponent(props);
        const UserGroupGrantedPermissionRows = screen.getAllByTestId("TableBase__row");
        expect(UserGroupGrantedPermissionRows).toHaveLength(5);
        UserGroupGrantedPermissionRows.forEach((row, index) => {
            const columnRoleName = within(row).getByTestId(
                "UserGroupGrantedPermissionTable__roleName"
            );
            const columnLocation = within(row).getByTestId(
                "UserGroupGrantedPermissionTable__location"
            );
            const userGroupGrantedPermission = mockGrantedPermissionPackage[index];

            expect(columnRoleName).toHaveTextContent(userGroupGrantedPermission.role!.role_name);

            const roleLocations = userGroupGrantedPermission
                .locations!.map(({ name }) => name)
                .join(", ");
            mockTreeLocations;
            expect(columnLocation).toHaveTextContent(roleLocations);
        });
    });
    it("should render correct UserGroup table with no data", () => {
        const newProps: UserGroupTableProps = {
            ...props,
            dataSource: [],
        };
        renderComponent(newProps);
        expect(
            screen.queryByTestId("UserGroupGrantedPermissionTable__roleName")
        ).not.toBeInTheDocument();
        expect(screen.queryByTestId("NoData__message")).toBeInTheDocument();
    });

    it("should render skeleton when fetching data", () => {
        const newProps: UserGroupTableProps = {
            ...props,
            isLoading: true,
        };
        renderComponent(newProps);
        expect(screen.getAllByTestId("TableSke__item")).toHaveLength(5);
    });
});
