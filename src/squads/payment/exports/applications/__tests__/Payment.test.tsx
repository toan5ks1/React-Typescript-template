import { createBrowserHistory } from "history";

import Payment from "../Payment";

import { render, screen, waitFor } from "@testing-library/react";
import usePaymentUpdatePermissionMicroApplication from "src/squads/payment/hooks/usePaymentUpdatePermissionMicroApplication";

jest.mock("src/squads/payment/routing/MicroRouting", () => {
    return {
        __esModule: true,
        default: () => "Hello Payment",
    };
});

jest.mock("src/squads/payment/hooks/usePaymentUpdatePermissionMicroApplication", () => ({
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

describe("<Payment />", () => {
    const history = createBrowserHistory();

    it("should render payment application without crash", async () => {
        (usePaymentUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(true);
        const wrapper = render(<Payment basename="/payment" routeHistory={history} />);

        await waitFor(() => {
            expect(wrapper.queryByTestId("Loading__root")).not.toBeInTheDocument();
        });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render loading when have not initialize CASL yet", () => {
        (usePaymentUpdatePermissionMicroApplication as jest.Mock).mockReturnValue(false);
        render(<Payment basename="/payment" routeHistory={history} />);

        expect(screen.queryByTestId("Loading__root")).toBeInTheDocument();
    });
});
