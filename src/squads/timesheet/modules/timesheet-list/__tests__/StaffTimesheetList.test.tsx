import { mockLocationListData } from "src/squads/timesheet/test-utils/mocks/locations";
import { createMockPaginationWithTotalObject } from "src/squads/timesheet/test-utils/mocks/pagination";
import { mockStaffTimesheetListData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestingRouter,
} from "src/squads/timesheet/test-utils/providers";

import { render, screen } from "@testing-library/react";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import StaffTimesheetList from "src/squads/timesheet/modules/timesheet-list/StaffTimesheetList";
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
                    <StaffTimesheetList staffId="staff_0" />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<StaffTimesheetList />", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useQueryTimesheetList as jest.Mock).mockReturnValue({
            data: mockStaffTimesheetListData,
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

        expect(screen.getByTestId("StaffTimesheetList")).toBeInTheDocument();
        expect(screen.getByTestId("StaffTimesheetListNavbar__addButton")).toBeInTheDocument();
        expect(screen.getByTestId("StaffTimesheetList__table")).toBeInTheDocument();
        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(
            mockStaffTimesheetListData.length
        );
    });

    it("should render correct timesheet", () => {
        renderComponent();
        const timesheetLocation = mockLocationListData.find(
            (location) => location.location_id === mockStaffTimesheetListData[0].location_id
        )?.name;

        expect(
            screen.getAllByTestId("StaffTimesheetListTable__timesheetDate")[0]
        ).toHaveTextContent(mockStaffTimesheetListData[0].timesheet_date);

        expect(
            screen.getAllByTestId("StaffTimesheetListTable__timesheetLocation")[0]
        ).toHaveTextContent(timesheetLocation!);
    });
});
