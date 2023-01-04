import { TestCommonAppProvider } from "src/squads/timesheet/test-utils/providers";

import ChipTimesheetStatus from "src/squads/timesheet/modules/timesheet-list/components/ChipTimesheetStatus";

import { render, screen } from "@testing-library/react";

const renderComponent = (status: string) => {
    return render(
        <TestCommonAppProvider>
            <ChipTimesheetStatus data-testid="ChipTimesheetStatus" status={status} />
        </TestCommonAppProvider>
    );
};

describe("<ChipTimesheetStatus />", () => {
    it("should be match snapshot TIMESHEET_STATUS_DRAFT", () => {
        const wrapper = renderComponent("TIMESHEET_STATUS_DRAFT");
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot TIMESHEET_STATUS_SUBMITTED", () => {
        const wrapper = renderComponent("TIMESHEET_STATUS_SUBMITTED");
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot TIMESHEET_STATUS_APPROVED", () => {
        const wrapper = renderComponent("TIMESHEET_STATUS_APPROVED");
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot TIMESHEET_STATUS_REJECTED", () => {
        const wrapper = renderComponent("TIMESHEET_STATUS_REJECTED");
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot TIMESHEET_STATUS_CONFIRMED", () => {
        const wrapper = renderComponent("TIMESHEET_STATUS_CONFIRMED");
        expect(wrapper.container).toMatchSnapshot();
    });

    it(`should render correct label with status Draft`, () => {
        renderComponent("TIMESHEET_STATUS_DRAFT");

        expect(screen.getByText(`Draft`)).toBeInTheDocument();
    });

    it(`should render correct label with status Submitted`, () => {
        renderComponent("TIMESHEET_STATUS_SUBMITTED");

        expect(screen.getByText(`Submitted`)).toBeInTheDocument();
    });

    it(`should render correct label with status Approved`, () => {
        renderComponent("TIMESHEET_STATUS_APPROVED");

        expect(screen.getByText(`Approved`)).toBeInTheDocument();
    });

    it(`should render correct label with status Rejected`, () => {
        renderComponent("TIMESHEET_STATUS_REJECTED");

        expect(screen.getByText(`Rejected`)).toBeInTheDocument();
    });

    it(`should render correct label with status Confirmed`, () => {
        renderComponent("TIMESHEET_STATUS_CONFIRMED");

        expect(screen.getByText(`Confirmed`)).toBeInTheDocument();
    });
});
