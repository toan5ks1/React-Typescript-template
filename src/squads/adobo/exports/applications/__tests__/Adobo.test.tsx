import { createBrowserHistory } from "history";

import Adobo from "../Adobo";

import { render, screen, waitFor } from "@testing-library/react";
import useUpdatePermissionMicroApplication from "src/app/useUpdatePermissionMicroApplication";

jest.mock("src/squads/adobo/routing/MicroRouting", () => {
    return {
        __esModule: true,
        default: () => "Hello Adobo",
    };
});

jest.mock("src/app/useUpdatePermissionMicroApplication", () => ({
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

describe("<Adobo />", () => {
    const history = createBrowserHistory();

    it("should render adobo application without crash", async () => {
        (useUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(true);
        const wrapper = render(<Adobo basename="/" routeHistory={history} />);

        await waitFor(() => {
            expect(wrapper.queryByTestId("Loading__root")).not.toBeInTheDocument();
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render loading when have not initialize CASL yet", () => {
        (useUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(false);
        render(<Adobo basename="/entry-exit" routeHistory={history} />);

        expect(screen.queryByTestId("Loading__root")).toBeInTheDocument();
    });
});
