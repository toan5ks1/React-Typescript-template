import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { getFakeLocalUser } from "src/squads/timesheet/test-utils/mocks/user";
import {
    TestCommonAppProvider,
    TestingRouter,
    TestQueryWrapper,
} from "src/squads/timesheet/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/timesheet/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useBreadcrumb from "src/hooks/useBreadcrumb";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import TimesheetDetail from "src/squads/timesheet/modules/timesheet-detail/TimesheetDetail";
import useTimesheetDetail from "src/squads/timesheet/modules/timesheet-detail/hooks/useTimesheetDetail";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/timesheet/modules/timesheet-detail/hooks/useTimesheetDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderComponent = () => {
    const mockUserProfile = getFakeLocalUser();
    return render(
        <TestQueryWrapper>
            <TestCommonAppProvider>
                <TestingRouter>
                    <MuiPickersUtilsProvider>
                        <TimesheetDetail
                            id={mockTimesheetData.timesheet_id}
                            userProfile={mockUserProfile}
                        />
                    </MuiPickersUtilsProvider>
                </TestingRouter>
            </TestCommonAppProvider>
        </TestQueryWrapper>
    );
};

describe("<TimesheetDetail />", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useTimesheetDetail as jest.Mock).mockReturnValue({
            data: mockTimesheetData,
            isLoading: false,
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (useBreadcrumb as jest.Mock).mockReturnValue({
            breadcrumbs: [
                {
                    url: `/timesheet_management`,
                    name: "resources.timesheet_management.titles.timesheetManagement",
                },
            ],
        });
    });
    it("should match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render Loading component when fetching timesheet detail", () => {
        (useTimesheetDetail as jest.Mock).mockReturnValue({
            isLoading: true,
        });
        renderComponent();
        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
    it("should render NotFound component when staff has no data", () => {
        (useTimesheetDetail as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
            data: undefined,
        }));
        renderComponent();
        expect(screen.getByTestId("NotFound__root")).toBeInTheDocument();
    });
    it("should render correct UI", () => {
        renderComponent();
        expect(screen.getByTestId("TimesheetDetail__root")).toBeInTheDocument();
        expect(screen.getByTestId("HeaderTimesheetDetail__root")).toBeInTheDocument();
        expect(screen.getByTestId("TimesheetDetail__detailSections")).toBeInTheDocument();
        expect(screen.getByTestId("GeneralInfoSection__root")).toBeInTheDocument();
        expect(screen.getByTestId("OtherWorkingHourSection__root")).toBeInTheDocument();
        expect(screen.getByTestId("LessonHoursSection__root")).toBeInTheDocument();
        expect(screen.getByTestId("RemarkSection__root")).toBeInTheDocument();
    });
    it("should render upsert timesheet", () => {
        renderComponent();

        const buttonAction = screen.getByTestId("ActionPanel__trigger");
        expect(buttonAction).toBeInTheDocument();

        userEvent.click(buttonAction);

        const buttonEdit = screen.getByText("Edit");
        userEvent.click(buttonEdit);

        expect(screen.getByTestId("DialogFullScreenHF__container")).toBeInTheDocument();
    });
});
