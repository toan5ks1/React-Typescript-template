import { mockWarner } from "src/test-utils/warner";

import { delay } from "../../common/utils/other";
import AppGuard from "../AppGuard";
import useAppInit from "../useAppInit";

import { render, screen, waitFor } from "@testing-library/react";
import useCheckAuth from "src/squads/user/hooks/auth/useCheckAuth";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import TestApp from "src/test-utils/TestApp";
import TestingRouter from "src/test-utils/TestingRouter";
import { mockUseFeatureController } from "src/test-utils/useFeatureController";

jest.mock("src/internals/permission");

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    const loc = {};

    return {
        ...actual,
        useLocation: () => loc,
        Redirect: (props: { to: string | object }) => <div>{JSON.stringify(props.to)}</div>, //mimic Redirect component
    };
});

jest.mock("src/app/useFeatureController", () => jest.fn());

jest.mock("src/squads/user/hooks/auth/useCheckAuth", () => jest.fn());
jest.mock("src/app/useAppInit", () => jest.fn());
jest.mock("src/hooks/useShowSnackbar");

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const FakeComponent = () => {
    const fakeChildTestId = "AppGuard__fakeChild";
    return (
        <TestApp>
            <AppGuard>
                <div data-testid={fakeChildTestId} />
            </AppGuard>
        </TestApp>
    );
};

describe("<AppGuard /> show loading", () => {
    it("should show loading at first", () => {
        mockUseFeatureController();

        const delayedFn = () => delay(500);
        const fakeCheckAuth: ReturnType<typeof useCheckAuth> = {
            additionalQuery: "",
            onCheckAuth: delayedFn,
        };

        (useCheckAuth as jest.Mock).mockImplementation(() => {
            return fakeCheckAuth;
        });

        const resultModules = {
            modules: [],
            ready: false,
        };
        (useAppInit as jest.Mock).mockImplementation(() => {
            return resultModules;
        });

        const { unmount } = render(<FakeComponent />);

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
        unmount();
    });
});

describe("<AppGuard /> after loaded", () => {
    beforeEach(() => {
        const resultModules = {
            modules: [],
            ready: true,
        };
        (useAppInit as jest.Mock).mockImplementation(() => {
            return resultModules;
        });

        mockUseFeatureController();
    });

    const std = mockWarner();

    it("should render children when everything is OK", async () => {
        const checkAuthFn = () => Promise.resolve();
        const fakeCheckAuth: ReturnType<typeof useCheckAuth> = {
            additionalQuery: "",
            onCheckAuth: checkAuthFn,
        };

        (useCheckAuth as jest.Mock).mockImplementation(() => {
            return fakeCheckAuth;
        });
        render(<FakeComponent />);

        expect(await screen.findByTestId("AppGuard__fakeChild")).toBeInTheDocument();
    });

    it("should check error when cannot check auth and redirect to the login page", async () => {
        const errMsg = "This is error";
        const checkAuthFn = jest.fn(() => Promise.reject(errMsg));

        const fakeCheckAuth: ReturnType<typeof useCheckAuth> = {
            additionalQuery: "?search=login",
            onCheckAuth: checkAuthFn,
        };

        (useCheckAuth as jest.Mock).mockImplementation(() => {
            return fakeCheckAuth;
        });

        const wrapper = render(
            <TestingRouter redirectUrl="/login">
                <FakeComponent />
            </TestingRouter>
        );

        await waitFor(() => {
            expect(wrapper.queryByTestId("Loading__root")).not.toBeInTheDocument();
        });
        expect(checkAuthFn).toBeCalledTimes(1);
        expect(std.warn).toBeCalledWith("AppGuard", errMsg);

        expect(await wrapper.findByText(`"/login?search=login"`)).toBeInTheDocument();
    });

    it("should check error when cannot check auth and redirect to the login tenant page", async () => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        const errMsg = "This is error";
        const checkAuthFn = jest.fn(() => Promise.reject(errMsg));

        const fakeCheckAuth: ReturnType<typeof useCheckAuth> = {
            additionalQuery: "?search=login",
            onCheckAuth: checkAuthFn,
        };

        (useCheckAuth as jest.Mock).mockImplementation(() => {
            return fakeCheckAuth;
        });

        const wrapper = render(
            <TestingRouter>
                <FakeComponent />
            </TestingRouter>
        );

        await waitFor(() => {
            expect(wrapper.queryByTestId("Loading__root")).not.toBeInTheDocument();
        });
        expect(checkAuthFn).toBeCalledTimes(1);
        expect(std.warn).toBeCalledWith("AppGuard", errMsg);

        expect(await wrapper.findByText(`"/login-tenant?search=login"`)).toBeInTheDocument();
    });
    it("should reload page when token is changed", async () => {
        const checkAuthFn = () => Promise.resolve();
        const fakeCheckAuth: ReturnType<typeof useCheckAuth> = {
            additionalQuery: "",
            onCheckAuth: checkAuthFn,
        };

        (useCheckAuth as jest.Mock).mockImplementation(() => {
            return fakeCheckAuth;
        });
        const original = window.location;

        Object.defineProperty(window, "location", {
            configurable: true,
            value: { reload: jest.fn() },
        });

        render(<FakeComponent />);

        window.dispatchEvent(
            new StorageEvent("storage", {
                key: "manabie_TOKEN",
                newValue: null,
            })
        );

        await waitFor(() => expect(window.location.reload).toBeCalledTimes(1));

        window.dispatchEvent(
            new StorageEvent("storage", {
                key: "manabie_TOKEN",
                newValue: "valid-token",
            })
        );

        await waitFor(() => expect(window.location.reload).toBeCalledTimes(1));

        Object.defineProperty(window, "location", { configurable: true, value: original });
    });
});
