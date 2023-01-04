import { initNewConfigWithOrganization } from "src/internals/configuration/dynamic-config";
import reactiveStorage from "src/squads/user/internals/reactive-storage";
import { AppProvider } from "src/squads/user/test-utils/providers";
import { LoginCredential, LoginOptions } from "src/squads/user/typings/auth-provider";

import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import useAuthProvider from "src/squads/user/hooks/auth/useAuthProvider";
import useLogin from "src/squads/user/hooks/auth/useLogin";
import useGetTenantId from "src/squads/user/hooks/useGetTenantId";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useSubRedirect from "src/squads/user/hooks/useSubRedirect";

jest.mock("src/squads/user/hooks/auth/useAuthProvider", () => jest.fn());

jest.mock("src/squads/user/hooks/useSubRedirect", () => jest.fn());

jest.mock("src/squads/user/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/user/hooks/useGetTenantId", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/internals/configuration/dynamic-config", () => ({
    __esModule: true,
    initNewConfigWithOrganization: jest.fn(),
}));

const mockFakeAuthProvider = (login: jest.Mock) => {
    const fakeAuthProvider: ReturnType<typeof useAuthProvider> = {
        checkAuth: jest.fn(),
        checkError: jest.fn(),
        login: login,
        logout: jest.fn(),
        isErrorRelatedToPermission: () => false,
    };
    (useAuthProvider as jest.Mock).mockImplementation(() => {
        return fakeAuthProvider;
    });
};
describe("useLogin", () => {
    const accounts: LoginCredential = {
        username: "thu.vo@manabie.com",
        password: "thu.vo@manabie.com",
        tenantName: "manabie",
    };
    const tenantId = "manabie-p7muf";
    const options: LoginOptions = { additionalQuery: "?search=login" };
    const showSnackbar = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (useGetTenantId as jest.Mock).mockReturnValue({
            getTenantIdByTenantName: jest.fn(() => Promise.resolve(tenantId)),
        });
        (initNewConfigWithOrganization as jest.Mock).mockImplementation(jest.fn());
    });
    it("onLogin | success", async () => {
        const login = jest.fn((_: LoginCredential, __: LoginOptions | undefined) =>
            Promise.resolve(undefined)
        );

        mockFakeAuthProvider(login);

        const fakeSubRedirect: ReturnType<typeof useSubRedirect> = {
            currentSearchParams: "?search=login",
            navigateToRedirectUrl: jest.fn(),
            convertCurrentUrlToSearch: jest.fn(),
            getRedirectUrlFromCurrentUrl: jest.fn(),
            applyCurrentSearchToPath: jest.fn(),
        };

        (useSubRedirect as jest.Mock).mockImplementation(() => {
            return fakeSubRedirect;
        });

        const { result } = renderHook(() => useLogin(), {
            wrapper: AppProvider,
        });
        expect(result.current.loading).toEqual(false);

        await act(async () => {
            await result.current.onLogin(accounts);
        });

        expect(login).toBeCalledWith(
            {
                username: accounts.username,
                password: accounts.password,
                tenantId,
            },
            options
        );
        expect(fakeSubRedirect.navigateToRedirectUrl).toBeCalledWith("/");
        expect(initNewConfigWithOrganization).toBeCalledWith("manabie");
        expect(initNewConfigWithOrganization).toBeCalledTimes(1);

        expect(reactiveStorage.get("ORGANIZATION_INFO")).toEqual({
            active_organization: "manabie",
            saved_organization: "manabie",
        });
    });

    it("onLogin | error string", async () => {
        const msgError = "This is error";
        const login = jest.fn((_: LoginCredential, __: LoginOptions | undefined) =>
            Promise.reject(msgError)
        );

        mockFakeAuthProvider(login);

        const fakeSubRedirect: ReturnType<typeof useSubRedirect> = {
            currentSearchParams: "?search=login",
            navigateToRedirectUrl: jest.fn(),
            convertCurrentUrlToSearch: jest.fn(),
            getRedirectUrlFromCurrentUrl: jest.fn(),
            applyCurrentSearchToPath: jest.fn(),
        };

        (useSubRedirect as jest.Mock).mockImplementation(() => {
            return fakeSubRedirect;
        });

        const { result } = renderHook(() => useLogin(), {
            wrapper: AppProvider,
        });

        await act(async () => {
            await result.current.onLogin(accounts);
        });
        expect(login).toBeCalledWith(
            {
                username: accounts.username,
                password: accounts.password,
                tenantId,
            },
            options
        );

        //wait for login fn already called
        expect(showSnackbar).toBeCalledWith(msgError, "error");
        expect(initNewConfigWithOrganization).toBeCalledTimes(2);
        expect(reactiveStorage.get("ORGANIZATION_INFO")).toBeNull();
    });
    it("onLogin | error undefined", async () => {
        const msgError = undefined;
        const login = jest.fn((_: LoginCredential, __: LoginOptions | undefined) =>
            Promise.reject(msgError)
        );

        mockFakeAuthProvider(login);

        const fakeSubRedirect: ReturnType<typeof useSubRedirect> = {
            currentSearchParams: "?search=login",
            navigateToRedirectUrl: jest.fn(),
            convertCurrentUrlToSearch: jest.fn(),
            getRedirectUrlFromCurrentUrl: jest.fn(),
            applyCurrentSearchToPath: jest.fn(),
        };

        (useSubRedirect as jest.Mock).mockImplementation(() => {
            return fakeSubRedirect;
        });

        const { result } = renderHook(() => useLogin(), {
            wrapper: AppProvider,
        });

        await act(async () => {
            await result.current.onLogin(accounts);
        });
        expect(login).toBeCalledWith(
            {
                username: accounts.username,
                password: accounts.password,
                tenantId,
            },
            options
        );

        //wait for login fn already called
        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("ra.auth.sign_in_error", "error");
        });
        expect(initNewConfigWithOrganization).toBeCalledTimes(2);
        expect(reactiveStorage.get("ORGANIZATION_INFO")).toBeNull();
    });
    it("onLogin | error instanceof Error", async () => {
        const msgError = new Error("This is error");
        const login = jest.fn((_: LoginCredential, __: LoginOptions | undefined) =>
            Promise.reject(msgError)
        );
        mockFakeAuthProvider(login);

        const fakeSubRedirect: ReturnType<typeof useSubRedirect> = {
            currentSearchParams: "?search=login",
            navigateToRedirectUrl: jest.fn(),
            convertCurrentUrlToSearch: jest.fn(),
            getRedirectUrlFromCurrentUrl: jest.fn(),
            applyCurrentSearchToPath: jest.fn(),
        };

        (useSubRedirect as jest.Mock).mockImplementation(() => {
            return fakeSubRedirect;
        });
        const { result } = renderHook(() => useLogin(), {
            wrapper: AppProvider,
        });

        await act(async () => {
            await result.current.onLogin(accounts);
        });
        expect(login).toBeCalledWith(
            {
                username: accounts.username,
                password: accounts.password,
                tenantId,
            },
            options
        );

        //wait for login fn already called
        await waitFor(() => {
            expect(showSnackbar).toBeCalledWith("This is error", "error");
        });
        expect(initNewConfigWithOrganization).toBeCalledTimes(2);
        expect(reactiveStorage.get("ORGANIZATION_INFO")).toBeNull();
    });

    it("onLogin | can not get tenant", async () => {
        (useGetTenantId as jest.Mock).mockReturnValue({
            getTenantIdByTenantName: jest.fn(() => Promise.resolve(undefined)),
        });

        const login = jest.fn((_: LoginCredential, __: LoginOptions | undefined) =>
            Promise.resolve(undefined)
        );

        mockFakeAuthProvider(login);

        const fakeSubRedirect: ReturnType<typeof useSubRedirect> = {
            currentSearchParams: "?search=login",
            navigateToRedirectUrl: jest.fn(),
            convertCurrentUrlToSearch: jest.fn(),
            getRedirectUrlFromCurrentUrl: jest.fn(),
            applyCurrentSearchToPath: jest.fn(),
        };

        (useSubRedirect as jest.Mock).mockImplementation(() => {
            return fakeSubRedirect;
        });

        const { result } = renderHook(() => useLogin(), {
            wrapper: AppProvider,
        });

        await act(async () => {
            await result.current.onLogin(accounts);
        });

        expect(login).not.toBeCalled();

        expect(result.current.loading).toEqual(false);
    });
});
