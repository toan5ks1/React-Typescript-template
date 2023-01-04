import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import TimesheetConfigButton, {
    TimesheetConfigButtonProps,
} from "src/squads/user/modules/staff-timesheet-setting/components/TimesheetConfigButton";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("TimesheetConfigButton component", () => {
    const props: TimesheetConfigButtonProps = {
        isAutoCreateTimesheet: false,
        onConfirm: jest.fn(),
    };
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <TimesheetConfigButton {...props} />
            </TestCommonAppProvider>
        );
    };
    it("should render match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();

        expect(
            screen.getByTestId("TimesheetConfigButton__configAutoCreateTimesheet")
        ).toBeInTheDocument();

        expect(screen.getByTestId("Radio__enable")).toBeInTheDocument();
        expect(screen.getByTestId("Radio__disable")).toBeInTheDocument();
    });

    it("should render correct DialogTimesheetConfig", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();

        const enableBtn = screen.getByTestId("Radio__enable");
        userEvent.click(enableBtn);

        expect(screen.getByTestId("DialogTimesheetConfig")).toBeInTheDocument();
    });
});
