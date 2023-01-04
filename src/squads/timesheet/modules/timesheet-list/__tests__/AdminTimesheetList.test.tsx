import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";
import { createMockPaginationWithTotalObject } from "src/squads/timesheet/test-utils/mocks/pagination";
import { mockStaffListData } from "src/squads/timesheet/test-utils/mocks/staff";
import { mockAdminTimesheetListData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestingRouter,
} from "src/squads/timesheet/test-utils/providers";

import { render, screen } from "@testing-library/react";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import AdminTimesheetList from "src/squads/timesheet/modules/timesheet-list/AdminTimesheetList";
import useQueryTimesheetList from "src/squads/timesheet/modules/timesheet-list/hooks/useQueryTimesheetList";

const mockPagination = createMockPaginationWithTotalObject();

jest.mock("src/squads/timesheet/service/infer-service", () => {
    return {
        __esModule: true,
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/modules/timesheet-list/hooks/useQueryTimesheetList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderComponent = () => {
    return render(
        <TestingRouter>
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <AdminTimesheetList />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<TimesheetList /> as Admin role", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useQueryTimesheetList as jest.Mock).mockReturnValue({
            data: mockAdminTimesheetListData,
            pagination: mockPagination,
            isFetching: false,
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render correct UI if have no Data", () => {
        (useQueryTimesheetList as jest.Mock).mockReturnValue({
            data: [],
            pagination: {},
            isFetching: false,
        });
        renderComponent();

        expect(screen.getByTestId("LookingFor__icon")).toBeInTheDocument();
        expect(screen.getByText("No Result")).toBeInTheDocument();
        expect(
            screen.getByText("Please use try again with different keywords or filters")
        ).toBeInTheDocument();
    });

    it("should render correct UI and Timesheet Length", () => {
        renderComponent();

        expect(screen.getByTestId("AdminTimesheetList")).toBeInTheDocument();
        expect(screen.getByTestId("ActionPanel__root")).toBeInTheDocument();
        expect(screen.getByTestId("AdminTimesheetList__table")).toBeInTheDocument();
        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(
            mockAdminTimesheetListData.length
        );
    });

    it("should render correct timesheet", () => {
        renderComponent();

        const staffName = mockStaffListData.find(
            (staff) => staff.user_id === mockAdminTimesheetListData[0].staff_id
        )?.name;

        const staffEmail = mockStaffListData.find(
            (staff) => staff.user_id === mockAdminTimesheetListData[0].staff_id
        )?.email;

        const timesheetLocation = mockLocationListData.find(
            (location) => location.location_id === mockAdminTimesheetListData[0].location_id
        )?.name;

        expect(
            screen.getAllByTestId("AdminTimesheetListTable__timesheetDate")[0]
        ).toHaveTextContent(mockAdminTimesheetListData[0].timesheet_date);

        expect(
            screen.getAllByTestId("AdminTimesheetListTable__timesheetStaffName")[0]
        ).toHaveTextContent(staffName!);

        expect(
            screen.getAllByTestId("AdminTimesheetListTable__timesheetStaffEmail")[0]
        ).toHaveTextContent(staffEmail!);

        expect(
            screen.getAllByTestId("AdminTimesheetListTable__timesheetLocation")[0]
        ).toHaveTextContent(timesheetLocation!);
    });
});
