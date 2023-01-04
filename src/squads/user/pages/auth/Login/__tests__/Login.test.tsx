import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Features } from "src/common/constants/enum";
import { delay } from "src/common/utils/other";
import { TestCommonAppProvider, AppProvider } from "src/squads/user/test-utils/providers";

import Login from "../Login";

import { render, screen, waitFor } from "@testing-library/react";
import useAuthProvider from "src/squads/user/hooks/auth/useAuthProvider";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useSubRedirect", () => {
    const resp = {
        navigateToRedirectUrl: jest.fn(),
    };
    return () => resp;
});

jest.mock("src/squads/user/hooks/auth/useAuthProvider", () => jest.fn());

jest.mock("src/squads/user/hooks/useShowSnackbar");

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<Login/>", () => {
    const mockCustomHookLoginPage = () => {
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

        (useUserFeatureToggle as jest.Mock).mockImplementation((feature: keyof typeof Features) => {
            switch (feature) {
                case "USER_MULTI_TENANT_LOGIN":
                    return true;
                default:
                    return false;
            }
        });
    };

    const renderLoginPage = () => {
        const history = createMemoryHistory();
        history.push = jest.fn();

        return render(
            <TestCommonAppProvider>
                <AppProvider>
                    <Router history={history}>
                        <Login />
                    </Router>
                </AppProvider>
            </TestCommonAppProvider>
        );
    };

    it("should render the correctly UI", async () => {
        mockCustomHookLoginPage();

        const wrapper = renderLoginPage();

        await waitFor(() => expect(screen.queryByTestId("Loading__root")).not.toBeInTheDocument());

        expect(wrapper.container).toMatchSnapshot();

        expect(screen.getByTestId("LoginCard__background")).toHaveStyle({
            backgroundImage: "none",
        });
        expect(screen.getByTestId("LoginCard__content")).toBeInTheDocument();
        expect(screen.getByTestId("AuthLayout__background")).toBeInTheDocument();
        expect(screen.getByTestId("LocaleSwitcher")).toHaveTextContent("English");
    });
});
