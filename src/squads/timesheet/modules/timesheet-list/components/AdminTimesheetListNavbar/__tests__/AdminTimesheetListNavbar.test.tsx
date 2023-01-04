import {
    TestQueryWrapper,
    TestCommonAppProvider,
    TestingRouter,
} from "src/squads/timesheet/test-utils/providers";

import AdminTimesheetListNavbar from "src/squads/timesheet/modules/timesheet-list/components/AdminTimesheetListNavbar";
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
                        <AdminTimesheetListNavbar />
                    </MuiPickersUtilsProvider>
                </TestQueryWrapper>
            </TestCommonAppProvider>
        </TestingRouter>
    );
};

describe("<AdminTimesheetListNavbar />", () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => jest.fn());
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render UI", () => {
        renderComponent();
        expect(screen.getByTestId("AdminTimesheetListNavbar__root")).toBeInTheDocument();
        expect(screen.getByTestId("ActionPanel__root")).toBeInTheDocument();
    });

    it("should render upsert timesheet", () => {
        renderComponent();

        const buttonAction = screen.getByTestId("ActionPanel__trigger");
        expect(buttonAction).toBeInTheDocument();

        userEvent.click(buttonAction);

        const buttonCreate = screen.getByText("Create");
        userEvent.click(buttonCreate);

        expect(screen.getByTestId("DialogFullScreenHF__container")).toBeInTheDocument();
    });
});
