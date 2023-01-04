import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/timesheet/test-utils/providers";

import TimesheetList from "../index";

import { render } from "@testing-library/react";
import useGetLocalProfile from "src/squads/timesheet/hooks/useGetLocalProfile";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";

jest.mock("src/squads/timesheet/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/timesheet/hooks/useGetLocalProfile", () => {
    const original = jest.requireActual("src/squads/timesheet/hooks/useGetLocalProfile");
    return {
        __esModule: true,
        ...original,
        default: jest.fn(),
    };
});

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <TimesheetList />
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};

describe("TimesheetList as Admin role", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (useGetLocalProfile as jest.Mock).mockImplementation(() => {
            return { userProfile: { userGroup: "USER_GROUP_SCHOOL_ADMIN" } };
        });
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});

describe("TimesheetList as Staff role", () => {
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (useGetLocalProfile as jest.Mock).mockImplementation(() => {
            return { userProfile: { userGroup: "USER_GROUP_TEACHER" } };
        });
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
