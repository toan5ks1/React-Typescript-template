import { convertString } from "src/squads/timesheet/common/constants/helper";
import { formatTimeLength } from "src/squads/timesheet/common/utils/time";
import { createMockPaginationWithTotalObject } from "src/squads/timesheet/test-utils/mocks/pagination";
import { mockStaffTimesheetListData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestingRouter } from "src/squads/timesheet/test-utils/providers";

import StaffTimesheetListTable, {
    StaffTimesheetListTableProp,
} from "src/squads/timesheet/modules/timesheet-list/components/StaffTimesheetListTable";

import { render, screen } from "@testing-library/react";

const mockPagination = createMockPaginationWithTotalObject();

const renderComponent = (props: StaffTimesheetListTableProp) => {
    return render(
        <TestingRouter>
            <TestCommonAppProvider>
                <StaffTimesheetListTable {...props} />
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<StaffTimesheetListTable />", () => {
    const props: StaffTimesheetListTableProp = {
        data: mockStaffTimesheetListData,
        isFetching: false,
        pagination: mockPagination,
    };

    it("should render to match snapshot", () => {
        const wrapper = renderComponent(props);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render UI", () => {
        renderComponent(props);

        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns.length).toEqual(7);

        const staffTimesheetDateRows = screen.getAllByTestId(
            "StaffTimesheetListTable__timesheetDate"
        );
        staffTimesheetDateRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockStaffTimesheetListData[index].timesheet_date);
        });
        expect(staffTimesheetDateRows).toHaveLength(mockStaffTimesheetListData.length);

        const staffTimesheetStatusRows = screen.getAllByTestId(
            "StaffTimesheetListTable__timesheetStatus"
        );
        expect(staffTimesheetStatusRows).toHaveLength(mockStaffTimesheetListData.length);

        const staffTimesheetNumberOfLessonsRow = screen.getAllByTestId(
            "StaffTimesheetListTable__numberOfLessons"
        );
        staffTimesheetNumberOfLessonsRow.forEach((row, index) => {
            expect(row).toHaveTextContent(
                convertString(`${mockStaffTimesheetListData[index]?.number_of_lessons}`)
            );
        });
        expect(staffTimesheetNumberOfLessonsRow).toHaveLength(mockStaffTimesheetListData.length);

        const staffTimesheetLessonHours = screen.getAllByTestId(
            "StaffTimesheetListTable__lessonHours"
        );
        staffTimesheetLessonHours.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeLength(mockStaffTimesheetListData[index].total_lesson_hours!)
            );
        });
        expect(staffTimesheetNumberOfLessonsRow).toHaveLength(mockStaffTimesheetListData.length);

        const staffTimesheetOtherWorkingHoursRows = screen.getAllByTestId(
            "StaffTimesheetListTable__otherWorkingHours"
        );
        staffTimesheetOtherWorkingHoursRows.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeLength(mockStaffTimesheetListData[index].total_hour!)
            );
        });
        expect(staffTimesheetOtherWorkingHoursRows).toHaveLength(mockStaffTimesheetListData.length);
    });
});
