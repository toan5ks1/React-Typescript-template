import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider } from "src/squads/timesheet/test-utils/providers";

import OtherWorkingHourSection, { OtherWorkingHourSectionProps } from "./OtherWorkingHourSection";

import { render, screen } from "@testing-library/react";

const renderComponent = (props: OtherWorkingHourSectionProps) => {
    return render(
        <TestCommonAppProvider>
            <OtherWorkingHourSection {...props} />
        </TestCommonAppProvider>
    );
};

describe("<OtherWorkingHourSection />", () => {
    const props: OtherWorkingHourSectionProps = {
        timesheet: mockTimesheetData,
        loading: false,
    };
    it("should render match snapshot", () => {
        const wrapper = renderComponent(props);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent(props);

        expect(screen.getByTestId("OtherWorkingHourSection__root")).toBeInTheDocument();
        expect(screen.getByTestId("OtherWorkingHourSection__title")).toHaveTextContent(
            "Other Working Hours"
        );
        expect(
            screen.getByTestId("OtherWorkingHourSection__otherWorkingHours")
        ).toBeInTheDocument();

        expect(screen.getByTestId("OtherWorkingHourTable__table")).toBeInTheDocument();
    });
});
