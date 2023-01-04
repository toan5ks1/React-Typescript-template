import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestingRouter } from "src/squads/timesheet/test-utils/providers";

import HeaderTimesheetDetail from "../HeaderTimesheetDetail";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useBreadcrumb from "src/hooks/useBreadcrumb";

jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: jest.fn(),
}));
const onAction = jest.fn();

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <TestingRouter>
                <HeaderTimesheetDetail
                    timesheet={mockTimesheetData}
                    isLoading={false}
                    onAction={onAction}
                />
            </TestingRouter>
        </TestCommonAppProvider>
    );
};

describe("<HeaderTimesheetDetail />", () => {
    beforeEach(() => {
        (useBreadcrumb as jest.Mock).mockReturnValue({
            breadcrumbs: [
                {
                    url: `/timesheet_management`,
                    name: "resources.timesheet_management.titles.timesheetManagement",
                },
            ],
        });
    });
    it("should be to match snapshot", () => {
        const wrapper = renderComponent();

        //TODO: Will update when we move components in phase -2
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render Status indicator", () => {
        renderComponent();

        expect(screen.queryByTestId("TimesheetStatusChip")).toBeInTheDocument();
    });

    it("should render correct breadcrumb", () => {
        renderComponent();

        expect(screen.queryByTestId("BreadcrumbItem")).toBeInTheDocument();
        expect(screen.queryByTestId("BreadcrumbItem")).toHaveAttribute(
            "href",
            "/timesheet_management"
        );

        expect(screen.queryByTestId("Breadcrumbs__entityName")).toBeInTheDocument();
        expect(screen.getByTestId("Breadcrumbs__entityName")).toHaveTextContent(
            mockTimesheetData.timesheet_date
        );
    });

    it("should render correct button action and edit and call fn onAction", () => {
        renderComponent();

        const buttonAction = screen.getByTestId("ActionPanel__trigger");
        expect(buttonAction).toBeInTheDocument();

        userEvent.click(buttonAction);

        const buttonEdit = screen.getByText("Edit");

        expect(buttonEdit).toBeInTheDocument();

        userEvent.click(buttonEdit);
        expect(onAction).toBeCalledTimes(1);
    });
});
