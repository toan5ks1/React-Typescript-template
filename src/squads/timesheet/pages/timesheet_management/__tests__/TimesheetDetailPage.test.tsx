import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { getFakeLocalUser } from "src/squads/timesheet/test-utils/mocks/user";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import TimesheetDetailPage from "../[id]/show";

import { render } from "@testing-library/react";
import useGetLocalProfile from "src/squads/timesheet/hooks/useGetLocalProfile";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";

const mockUserProfile = getFakeLocalUser();

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: mockTimesheetData.timesheet_id,
        }),
    };
});

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/hooks/useGetLocalProfile", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("should render correctly", () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => jest.fn());
        (useGetLocalProfile as jest.Mock).mockReturnValue({ userProfile: mockUserProfile });
    });

    it("should render to match snapshot", () => {
        const wrapper = render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <TimesheetDetailPage />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
