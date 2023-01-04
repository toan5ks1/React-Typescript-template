import { TimesheetInformation } from "src/squads/timesheet/common/types";
import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider } from "src/squads/timesheet/test-utils/providers";

import GeneralInfoSection from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections/GeneralInfoSection";

import { render, screen } from "@testing-library/react";

const renderComponent = (timesheet?: TimesheetInformation) => {
    return render(
        <TestCommonAppProvider>
            <GeneralInfoSection timesheet={timesheet} />
        </TestCommonAppProvider>
    );
};

describe("<GeneralInfoSection />", () => {
    it("should render match snapshot", () => {
        const wrapper = renderComponent(mockTimesheetData);
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct UI", () => {
        renderComponent(mockTimesheetData);
        expect(screen.getByText("General Info")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Email")).toBeInTheDocument();
        expect(screen.getByText("Date")).toBeInTheDocument();
        expect(screen.getByText("Location")).toBeInTheDocument();
    });

    it("should render correct detail info student", () => {
        renderComponent(mockTimesheetData);

        const staffNameColumn = screen.getByTestId("GeneralInfoSection__generalStaffNameValue");
        const staffEmailColumn = screen.getByTestId("GeneralInfoSection__generalStaffEmailValue");
        const timesheetLocationColumn = screen.getByTestId(
            "GeneralInfoSection__generalTimesheetLocationValue"
        );
        const timesheetDateColumn = screen.getByTestId(
            "GeneralInfoSection__generalTimesheetDateValue"
        );

        expect(staffNameColumn).toHaveTextContent(mockTimesheetData.staff_name);
        expect(staffEmailColumn).toHaveTextContent(mockTimesheetData.staff_email);
        expect(timesheetLocationColumn).toHaveTextContent(mockTimesheetData.location_name);
        expect(timesheetDateColumn).toHaveTextContent(mockTimesheetData.timesheet_date);
    });
});
