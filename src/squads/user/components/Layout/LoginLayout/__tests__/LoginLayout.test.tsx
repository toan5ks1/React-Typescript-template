import { delay } from "src/common/utils/other";
import { AppProvider, TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import LoginLayout, { LoginLayoutProps } from "../LoginLayout";

import { render, screen, waitFor } from "@testing-library/react";
import useCheckAuth from "src/squads/user/hooks/auth/useCheckAuth";

jest.mock("src/squads/user/hooks/auth/useCheckAuth", () => jest.fn());
jest.mock("src/squads/user/hooks/auth/useLogin", () => ({
    __esModule: true,
    default: () => ({
        onLogin: jest.fn(),
        loading: false,
    }),
}));
jest.mock("src/squads/user/hooks/useSubRedirect", () => ({
    __esModule: true,
    default: () => ({
        navigateToRedirectUrl: jest.fn(),
    }),
}));
describe("<LoginLayout />", () => {
    const renderComponent = () => {
        const fakeLoginForm: LoginLayoutProps["form"] = () => <div data-testid="Login_fakeForm" />;
        return render(
            <TestCommonAppProvider>
                <AppProvider>
                    <LoginLayout form={fakeLoginForm} />
                </AppProvider>
            </TestCommonAppProvider>
        );
    };
    it("should show loading at first", async () => {
        const mockOnCheckAuth = () => delay(100);

        (useCheckAuth as jest.Mock<ReturnType<typeof useCheckAuth>>).mockReturnValue({
            onCheckAuth: mockOnCheckAuth,
            additionalQuery: "",
        });

        renderComponent();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();

        expect(await screen.findByTestId("Login_fakeForm")).toBeInTheDocument();
    });
    it("should render login form when finish check auth", async () => {
        const mockOnCheckAuth = () => Promise.resolve();

        (useCheckAuth as jest.Mock<ReturnType<typeof useCheckAuth>>).mockReturnValue({
            onCheckAuth: mockOnCheckAuth,
            additionalQuery: "",
        });
        renderComponent();

        expect(await screen.findByTestId("Login_fakeForm")).toBeInTheDocument();
    });

    it("should reload page when token is changed", async () => {
        const mockOnCheckAuth = () => Promise.resolve();

        (useCheckAuth as jest.Mock<ReturnType<typeof useCheckAuth>>).mockReturnValue({
            onCheckAuth: mockOnCheckAuth,
            additionalQuery: "",
        });
        const original = window.location;

        Object.defineProperty(window, "location", {
            configurable: true,
            value: { reload: jest.fn() },
        });

        renderComponent();

        window.dispatchEvent(
            new StorageEvent("storage", {
                key: "manabie_TOKEN",
                newValue: "valid-token",
            })
        );

        await waitFor(() => expect(window.location.reload).toBeCalledTimes(1));

        window.dispatchEvent(
            new StorageEvent("storage", {
                key: "manabie_TOKEN",
                newValue: null,
            })
        );

        await waitFor(() => expect(window.location.reload).toBeCalledTimes(1));

        Object.defineProperty(window, "location", { configurable: true, value: original });
    });
});
