import { createBrowserHistory } from "history";

import Communication from "../Communication";

import { render, screen, waitFor } from "@testing-library/react";
import useCommunicationUpdatePermissionMicroApplication from "src/squads/communication/hooks/useCommunicationUpdatePermissionMicroApplication";

jest.mock("src/squads/communication/routing/MicroRouting", () => {
    return {
        __esModule: true,
        default: () => "Hello Communication",
    };
});

jest.mock(
    "src/squads/communication/hooks/useCommunicationUpdatePermissionMicroApplication",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

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

describe("<Communication />", () => {
    const history = createBrowserHistory();

    it("should render communication application without crash", async () => {
        (useCommunicationUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(true);
        const wrapper = render(<Communication basename="/" routeHistory={history} />);

        await waitFor(() => {
            expect(wrapper.queryByTestId("Loading__root")).not.toBeInTheDocument();
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render loading when have not initialize CASL yet", () => {
        (useCommunicationUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(false);
        render(<Communication basename="/communication" routeHistory={history} />);

        expect(screen.queryByTestId("Loading__root")).toBeInTheDocument();
    });
});
