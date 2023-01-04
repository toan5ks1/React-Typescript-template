import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { inferQueryPagination } from "src/squads/user/service/infer-service";
import { mockReturnStaffData, mockPagination } from "src/squads/user/test-utils/mocks/staff";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
    TestingRouter,
} from "src/squads/user/test-utils/providers";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import StaffList from "src/squads/user/modules/staff-list/StaffList";
import useUserGroupsList from "src/squads/user/modules/staff-upsert/hooks/useUserGroupsList";
import { mockUserGroupListWithDuplicatedLabel } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/squads/user/hooks/useStaffFeatureFlag");

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/squads/user/modules/staff-upsert/hooks/useUserGroupsList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(StaffList.name, () => {
    const redirectUrl = `/${MicroFrontendTypes.USER}/${Entities.STAFF}/${mockReturnStaffData?.data[0]?.staff_id}/show`;

    const renderStaffList = () => {
        (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
            result: {
                isLoading: false,
                refetch: jest.fn(),
            },
            data: mockReturnStaffData,
            pagination: mockPagination,
        }));

        (useUserGroupsList as jest.Mock<ReturnType<typeof useUserGroupsList>>).mockReturnValue({
            options: mockUserGroupListWithDuplicatedLabel,
            loading: false,
            setInputVal: jest.fn(),
        });

        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        return render(
            <TestCommonAppProvider>
                <TestingRouter redirectUrl={redirectUrl}>
                    <TestQueryWrapper>
                        <StaffList />
                    </TestQueryWrapper>
                </TestingRouter>
            </TestCommonAppProvider>
        );
    };

    it("should display dialog to create staff when click add button", () => {
        renderStaffList();
        const addBtn = screen.getByTestId("StaffListNavbar__btnAdd");

        userEvent.click(addBtn);
        expect(screen.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent("Add Staff");
    });

    it("should render correct Staff", () => {
        renderStaffList();
        const staffNameRows = screen.getAllByTestId("StaffList__staffName");
        const staffEmailRows = screen.getAllByTestId("StaffList__staffEmail");
        expect(staffNameRows).toHaveLength(5);
        staffNameRows.forEach((staffRow, index) => {
            expect(staffRow).toHaveTextContent(mockReturnStaffData.data[index]?.user?.name);
        });
        expect(staffEmailRows).toHaveLength(5);
        staffEmailRows.forEach((staffRow, index) => {
            if (mockReturnStaffData.data[index]?.user?.email) {
                expect(staffRow).toHaveTextContent(mockReturnStaffData.data[index]?.user!.email!);
            }
        });
    });
    it("should render search bar", () => {
        renderStaffList();
        expect(screen.getByTestId("FormFilterAdvanced__root")).toBeInTheDocument();
    });
    it("should redirect to staff detail page when click staff name", () => {
        renderStaffList();
        const staffLinkRows = screen.getAllByTestId("StaffList__staffNameLink");
        userEvent.click(staffLinkRows[0]);

        expect(screen.getByTestId("TestingRouter__redirectUrl")).toHaveTextContent(redirectUrl);
    });
});
