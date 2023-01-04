import { useHistory } from "react-router";
import { AppProvider } from "src/squads/user/test-utils/providers";

import useUserFeatureToggle from "../../useUserFeatureFlag";

import { renderHook } from "@testing-library/react-hooks";
import useAuthProvider from "src/squads/user/hooks/auth/useAuthProvider";
import useLogout from "src/squads/user/hooks/auth/useLogout";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/hooks/auth/useAuthProvider", () => jest.fn());

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({}),
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
    };
});

jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockFakeAuthProvider = (logout: jest.Mock) => {
    const fakeAuthProvider: ReturnType<typeof useAuthProvider> = {
        checkAuth: jest.fn(),
        checkError: jest.fn(),
        logout: logout,
        login: jest.fn(),
        isErrorRelatedToPermission: () => false,
    };
    (useAuthProvider as jest.Mock).mockImplementation(() => {
        return fakeAuthProvider;
    });
};
describe("useLogout", () => {
    it("onLogout | success and redirect to login page", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => {
            return jest.fn();
        });
        const logout = jest.fn(() => Promise.resolve(undefined));

        mockFakeAuthProvider(logout);

        const push = jest.fn();
        (useHistory as jest.Mock).mockImplementation(() => {
            return {
                push,
            };
        });

        const { result } = renderHook(() => useLogout(), {
            wrapper: AppProvider,
        });

        await result.current.onLogout();

        expect(logout).toBeCalledTimes(1);
        expect(push).toBeCalledWith("/login");
    });

    it("onLogout | success and redirect to login multi tenant page", async () => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        (useShowSnackbar as jest.Mock).mockImplementation(() => {
            return jest.fn();
        });
        const logout = jest.fn(() => Promise.resolve(undefined));

        mockFakeAuthProvider(logout);

        const push = jest.fn();
        (useHistory as jest.Mock).mockImplementation(() => {
            return {
                push,
            };
        });

        const { result } = renderHook(() => useLogout(), {
            wrapper: AppProvider,
        });

        await result.current.onLogout();

        expect(logout).toBeCalledTimes(1);
        expect(push).toBeCalledWith("/login-tenant");
    });

    it("onLogout | error instanceof Error", async () => {
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const msgError = new Error("This is error");
        const logout = jest.fn(() => Promise.reject(msgError));

        mockFakeAuthProvider(logout);

        const { result } = renderHook(() => useLogout(), {
            wrapper: AppProvider,
        });

        await result.current.onLogout();

        expect(logout).toBeCalledTimes(1);

        expect(showSnackbar).toBeCalledWith(msgError.message, "error");
    });

    it("onLogout | error string", async () => {
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const msgError = "This is error";
        const logout = jest.fn(() => Promise.reject(msgError));

        mockFakeAuthProvider(logout);

        const { result } = renderHook(() => useLogout(), {
            wrapper: AppProvider,
        });

        await result.current.onLogout();

        expect(logout).toBeCalledTimes(1);

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
    });
});
