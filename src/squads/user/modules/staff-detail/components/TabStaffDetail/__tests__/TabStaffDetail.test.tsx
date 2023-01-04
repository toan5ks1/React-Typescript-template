import { ArrayElement } from "src/common/constants/types";
import { User_StaffOneV2Query } from "src/squads/user/service/bob/bob-types";
import { staffOneMockData } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { TabStaffDetail } from "src/squads/user/modules/staff-detail/components/TabStaffDetail";

import { render, screen, within } from "@testing-library/react";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("TabStaffDetail component", () => {
    const renderComponent = (staff: ArrayElement<User_StaffOneV2Query["staff"]>) => {
        return render(
            <TestCommonAppProvider>
                <TabStaffDetail staff={staff} />
            </TestCommonAppProvider>
        );
    };
    it("should render match snapshot", () => {
        const wrapper = renderComponent(staffOneMockData);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct button edit", () => {
        renderComponent(staffOneMockData);

        const buttonEdit = screen.getByTestId(`TabStaffDetail__buttonEdit`);
        expect(buttonEdit).toBeInTheDocument();
        expect(buttonEdit).toHaveTextContent("Edit");
        expect(buttonEdit).toHaveStyle("color: rgb(33, 150, 243)");

        const svgEdit = within(buttonEdit).getByTestId("TabStaffDetail__svgEdit");
        expect(svgEdit).toBeInTheDocument();
    });

    it("should render correct detail info staff", () => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);
        renderComponent(staffOneMockData);
        expect(screen.getByTestId("TabStaffDetail__generalNameValue")).toHaveTextContent(
            staffOneMockData.user!.name
        );
        expect(screen.getByTestId("TabStaffDetail__generalEmailValue")).toHaveTextContent(
            staffOneMockData.user!.email!
        );
        expect(
            screen.getByTestId("TabStaffDetail__generalUserGroupMembersValue")
        ).toHaveTextContent(
            staffOneMockData?.user?.user_group_members
                ?.map((userGroup) => userGroup.user_group.user_group_name)
                .join(", ")
        );
    });
});
