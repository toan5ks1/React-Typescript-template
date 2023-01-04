import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { delay } from "src/common/utils/other";
import { TestCommonAppProvider, AppProvider } from "src/squads/user/test-utils/providers";

import LoginTenant from "../LoginTenant";

import { render, RenderResult, waitFor } from "@testing-library/react";
import useAuthProvider from "src/squads/user/hooks/auth/useAuthProvider";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useShowSnackbar");
jest.mock("src/squads/user/hooks/useSubRedirect", () => {
    const resp = {
        currentSearchParams: "?haha=1",
        navigateToRedirectUrl: jest.fn(),
    };
    return () => resp;
});

jest.mock("src/squads/user/hooks/auth/useAuthProvider", () => jest.fn());

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<LoginTenant/>", () => {
    let wrapper: RenderResult;

    beforeEach(async () => {
        const delayedFn = () => delay(500);

        const fakeAuthProvider: ReturnType<typeof useAuthProvider> = {
            checkAuth: delayedFn,
            checkError: jest.fn(),
            login: jest.fn(),
            logout: jest.fn(),
            isErrorRelatedToPermission: () => false,
        };
        (useAuthProvider as jest.Mock).mockImplementation(() => {
            return fakeAuthProvider;
        });

        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        const history = createMemoryHistory();
        history.push = jest.fn();

        wrapper = render(
            <TestCommonAppProvider>
                <AppProvider>
                    <Router history={history}>
                        <LoginTenant />
                    </Router>
                </AppProvider>
            </TestCommonAppProvider>
        );
        await waitFor(() => expect(wrapper.queryByTestId("Loading__root")).not.toBeInTheDocument());
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
});
