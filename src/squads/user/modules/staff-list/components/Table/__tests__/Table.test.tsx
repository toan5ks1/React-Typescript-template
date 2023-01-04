import { staffTableProp } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import StaffTable from "../Table";

import { render, screen } from "@testing-library/react";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StaffListTable />", () => {
    it("should render correct Staff", () => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);
        render(
            <TestCommonAppProvider>
                <StaffTable {...staffTableProp} />
            </TestCommonAppProvider>
        );

        const staffNameRows = screen.getAllByTestId("StaffList__staffName");
        const staffEmailRows = screen.getAllByTestId("StaffList__staffEmail");
        const staffUserGroups = screen.getAllByTestId("StaffList__staffUserGroup");
        expect(staffNameRows).toHaveLength(5);
        staffNameRows.forEach((staffRow, index) => {
            expect(staffRow).toHaveTextContent(staffTableProp.data[index]?.user?.name);
        });

        expect(staffEmailRows).toHaveLength(5);
        staffEmailRows.forEach((staffRow, index) => {
            if (staffTableProp.data[index]?.user?.email) {
                expect(staffRow).toHaveTextContent(staffTableProp.data[index]!.user?.email!);
            }
        });

        expect(staffUserGroups).toHaveLength(5);
        staffUserGroups.forEach((staffRow, index) => {
            if (staffTableProp.data[index]?.user?.user_group_members.length) {
                const userGroupNamesUnion = staffTableProp.data[index]?.user?.user_group_members
                    .map((userGroup) => userGroup.user_group?.user_group_name)
                    .join(", ");
                expect(staffRow).toHaveTextContent(userGroupNamesUnion);
            }
        });
    });
});
