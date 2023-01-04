import { formatTimeLength, formatTimeRange } from "src/squads/timesheet/common/utils/time";
import { mockOtherWorkingHours } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestingRouter } from "src/squads/timesheet/test-utils/providers";

import OtherWorkingHourTable, { OtherWorkingHourTableProps } from "../OtherWorkingHourTable";

import { render, screen } from "@testing-library/react";

const renderComponent = (props: OtherWorkingHourTableProps) => {
    return render(
        <TestingRouter>
            <TestCommonAppProvider>
                <OtherWorkingHourTable {...props} />
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<OtherWorkingHourTable />", () => {
    const props: OtherWorkingHourTableProps = {
        dataSource: mockOtherWorkingHours,
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

        const workingTypeRows = screen.getAllByTestId("OtherWorkingHourTable__workingType");
        workingTypeRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockOtherWorkingHours[index].working_type!);
        });
        expect(workingTypeRows).toHaveLength(mockOtherWorkingHours.length);

        const timeRangeRows = screen.getAllByTestId("OtherWorkingHourTable__timeRange");
        timeRangeRows.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeRange(
                    mockOtherWorkingHours[index].start_time,
                    mockOtherWorkingHours[index].end_time,
                    "HH:mm"
                )
            );
        });
        expect(timeRangeRows).toHaveLength(mockOtherWorkingHours.length);

        const totalHourRows = screen.getAllByTestId("OtherWorkingHourTable__totalHours");
        totalHourRows.forEach((row, index) => {
            expect(row).toHaveTextContent(
                formatTimeLength(mockOtherWorkingHours[index].total_hour)
            );
        });
        expect(totalHourRows).toHaveLength(mockOtherWorkingHours.length);

        const remarkRows = screen.getAllByTestId("OtherWorkingHourTable__remarks");
        remarkRows.forEach((row, index) => {
            expect(row).toHaveTextContent(mockOtherWorkingHours[index].remarks!);
        });
        expect(remarkRows).toHaveLength(mockOtherWorkingHours.length);
    });
});
