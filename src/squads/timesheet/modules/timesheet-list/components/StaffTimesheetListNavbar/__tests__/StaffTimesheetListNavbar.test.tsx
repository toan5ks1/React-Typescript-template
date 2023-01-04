import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestingRouter,
} from "src/squads/timesheet/test-utils/providers";

import StaffTimesheetListNavbar from "src/squads/timesheet/modules/timesheet-list/components/StaffTimesheetListNavbar";
import MuiPickersUtilsProvider from "src/squads/timesheet/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderComponent = () => {
    return render(
        <TestingRouter>
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <MuiPickersUtilsProvider>
                        <StaffTimesheetListNavbar />
                    </MuiPickersUtilsProvider>
                </TestQueryWrapper>
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<StaffTimesheetListNavbar />", () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => jest.fn());
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render UI", () => {
        renderComponent();
        expect(screen.getByTestId("StaffTimesheetListNavbar__root")).toBeInTheDocument();
        expect(screen.getByTestId("StaffTimesheetListNavbar__addButton")).toBeInTheDocument();
    });

    it("should render upsert timesheet", () => {
        renderComponent();

        const addButton = screen.getByTestId("StaffTimesheetListNavbar__addButton");
        expect(addButton).toBeInTheDocument();

        userEvent.click(addButton);

        expect(screen.getByTestId("DialogFullScreenHF__container")).toBeInTheDocument();
    });
});
