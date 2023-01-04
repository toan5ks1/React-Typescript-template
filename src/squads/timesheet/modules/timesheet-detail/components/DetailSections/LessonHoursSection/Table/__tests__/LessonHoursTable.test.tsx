import {
    formatTimeLength,
    formatTimeRange,
    getDurationInMinute,
} from "src/squads/timesheet/common/utils/time";
import { mockLessonHours } from "src/squads/timesheet/test-utils/mocks/lesson";
import { TestCommonAppProvider, TestingRouter } from "src/squads/timesheet/test-utils/providers";

import LessonHoursTable, {
    LessonHoursTableProps,
} from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections/LessonHoursSection/Table/LessonHoursTable";

import { render, screen } from "@testing-library/react";

const renderComponent = (props: LessonHoursTableProps) => {
    return render(
        <TestingRouter>
            <TestCommonAppProvider>
                <LessonHoursTable {...props} />
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<LessonHoursTable />", () => {
    const props: LessonHoursTableProps = {
        dataSource: mockLessonHours,
        loading: false,
    };

    it("should render to match snapshot", () => {
        const wrapper = renderComponent(props);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render UI", () => {
        renderComponent(props);

        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns.length).toEqual(5);

        const timeRangeRows = screen.getAllByTestId("LessonHoursTable__timeRange");
        timeRangeRows.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeRange(
                    mockLessonHours[index].start_time,
                    mockLessonHours[index].end_time,
                    "HH:mm"
                )
            );
        });
        expect(timeRangeRows).toHaveLength(mockLessonHours.length);

        const statusRows = screen.getAllByTestId("LessonHoursTable__status");
        expect(statusRows[0]).toHaveTextContent("Published");
        expect(statusRows).toHaveLength(mockLessonHours.length);

        const totalHourRows = screen.getAllByTestId("LessonHoursTable__totalHours");
        totalHourRows.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeLength(
                    getDurationInMinute(
                        mockLessonHours[index].start_time,
                        mockLessonHours[index].end_time
                    )
                )
            );
        });
        expect(totalHourRows).toHaveLength(mockLessonHours.length);

        const typeRows = screen.getAllByTestId("LessonHoursTable__type");
        expect(typeRows[0]).toHaveTextContent("Group");
        expect(typeRows).toHaveLength(mockLessonHours.length);
    });
});
