import { TimesheetInformation } from "src/squads/timesheet/common/types";
import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider } from "src/squads/timesheet/test-utils/providers";

import { RemarkSection } from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections";

import { render, screen } from "@testing-library/react";

const renderComponent = (timesheet?: TimesheetInformation) => {
    return render(
        <TestCommonAppProvider>
            <RemarkSection timesheet={timesheet} />
        </TestCommonAppProvider>
    );
};

describe("<RemarkSection />", () => {
    it("should render match snapshot", () => {
        const wrapper = renderComponent(mockTimesheetData);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent(mockTimesheetData);
        expect(screen.getByTestId("RemarkSection__title")).toBeInTheDocument();
        expect(screen.getByTestId("RemarkSection__remarkItem")).toBeInTheDocument();
    });

    it("should render correct remark content", () => {
        renderComponent(mockTimesheetData);
        const remarkItem = screen.getByTestId("RemarkSection__remarkItem");

        expect(remarkItem).toHaveTextContent(mockTimesheetData.remark!);
    });
});
