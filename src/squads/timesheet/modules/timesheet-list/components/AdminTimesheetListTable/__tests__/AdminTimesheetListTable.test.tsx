import { convertString } from "src/squads/timesheet/common/constants/helper";
import { formatTimeLength } from "src/squads/timesheet/common/utils/time";
import { createMockPaginationWithTotalObject } from "src/squads/timesheet/test-utils/mocks/pagination";
import { mockStaffListData } from "src/squads/timesheet/test-utils/mocks/staff";
import {
    mockAdminTimesheetListData,
    mockTimesheetListData,
} from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestingRouter } from "src/squads/timesheet/test-utils/providers";

import AdminTimesheetListTable, {
    AdminTimesheetListTableProp,
} from "src/squads/timesheet/modules/timesheet-list/components/AdminTimesheetListTable";

import { render, screen } from "@testing-library/react";

const mockPagination = createMockPaginationWithTotalObject();

const renderComponent = (props: AdminTimesheetListTableProp) => {
    return render(
        <TestingRouter>
            <TestCommonAppProvider>
                <AdminTimesheetListTable {...props} />
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<AdminTimesheetListTable />", () => {
    const props: AdminTimesheetListTableProp = {
        data: mockAdminTimesheetListData,
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
        expect(columns.length).toEqual(9);

        const adminTimesheetDateRows = screen.getAllByTestId(
            "AdminTimesheetListTable__timesheetDate"
        );
        adminTimesheetDateRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockAdminTimesheetListData[index].timesheet_date);
        });
        expect(adminTimesheetDateRows).toHaveLength(mockAdminTimesheetListData.length);

        const adminTimesheetStaffNameRows = screen.getAllByTestId(
            "AdminTimesheetListTable__timesheetStaffName"
        );
        adminTimesheetStaffNameRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockStaffListData[index].name);
        });
        expect(adminTimesheetStaffNameRows).toHaveLength(mockStaffListData.length);

        const adminTimesheetStaffEmailRows = screen.getAllByTestId(
            "AdminTimesheetListTable__timesheetStaffEmail"
        );
        adminTimesheetStaffEmailRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockStaffListData[index].email!);
        });
        expect(adminTimesheetStaffEmailRows).toHaveLength(mockStaffListData.length);

        const adminTimesheetStatusRows = screen.getAllByTestId(
            "AdminTimesheetListTable__timesheetStatus"
        );
        expect(adminTimesheetStatusRows).toHaveLength(mockTimesheetListData.length);

        const adminTimesheetNumberOfLessonsRow = screen.getAllByTestId(
            "AdminTimesheetListTable__numberOfLessons"
        );
        adminTimesheetNumberOfLessonsRow.forEach((row, index) => {
            expect(row).toHaveTextContent(
                convertString(`${mockAdminTimesheetListData[index]?.number_of_lessons}`)
            );
        });
        expect(adminTimesheetNumberOfLessonsRow).toHaveLength(mockAdminTimesheetListData.length);

        const adminTimesheetLessonHours = screen.getAllByTestId(
            "AdminTimesheetListTable__lessonHours"
        );
        adminTimesheetLessonHours.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeLength(mockAdminTimesheetListData[index].total_lesson_hours!)
            );
        });
        expect(adminTimesheetNumberOfLessonsRow).toHaveLength(mockAdminTimesheetListData.length);

        const adminTimesheetOtherWorkingHoursRows = screen.getAllByTestId(
            "AdminTimesheetListTable__otherWorkingHours"
        );
        adminTimesheetOtherWorkingHoursRows.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeLength(mockAdminTimesheetListData[index].total_hour!)
            );
        });
        expect(adminTimesheetOtherWorkingHoursRows).toHaveLength(mockAdminTimesheetListData.length);
    });
});
