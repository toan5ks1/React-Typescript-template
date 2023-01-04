import { createBrowserHistory } from "history";

import Timesheet from "../Timesheet";

import { render, screen, waitFor } from "@testing-library/react";
import useTimesheetUpdatePermissionMicroApplication from "src/squads/timesheet/hooks/useTimesheetUpdatePermissionMicroApplication";

jest.mock("src/squads/timesheet/routing/MicroRouting", () => {
    return {
        __esModule: true,
        default: () => "Hello Timesheet",
    };
});

jest.mock("src/squads/timesheet/hooks/useTimesheetUpdatePermissionMicroApplication", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// because user team use their feature flag useUserFeatureToggle on MultipleSnackbarProviderRedux
jest.mock("src/internals/feature-controller", () => {
    return {
        __esModule: true,
        default: {
            init: () => Promise.resolve(true),
            isFeatureEnabled: jest.fn(),
            subscribeToRemoteChanges: jest.fn(),
        },
    };
});

describe("<Timesheet />", () => {
    const history = createBrowserHistory();

    it("should render timesheet application without crash", async () => {
        (useTimesheetUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(true);
        const wrapper = render(<Timesheet basename="/" routeHistory={history} />);

        await waitFor(() => {
            expect(wrapper.queryByTestId("Loading__root")).not.toBeInTheDocument();
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render loading when have not initialize CASL yet", () => {
        (useTimesheetUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(false);
        render(<Timesheet basename="/timesheet" routeHistory={history} />);

        expect(screen.queryByTestId("Loading__root")).toBeInTheDocument();
    });
});
