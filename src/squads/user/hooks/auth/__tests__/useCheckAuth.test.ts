import { initNewConfigWithOrganization } from "src/internals/configuration/dynamic-config";
import reactiveStorage, {
    OrganizationProperties,
} from "src/squads/user/internals/reactive-storage";
import { AppProvider } from "src/squads/user/test-utils/providers";

import { renderHook, act } from "@testing-library/react-hooks";
import useAuthProvider from "src/squads/user/hooks/auth/useAuthProvider";
import useCheckAuth from "src/squads/user/hooks/auth/useCheckAuth";
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

const mockFakeAuthProvider = (checkAuth: jest.Mock, checkError: jest.Mock) => {
    const fakeAuthProvider: ReturnType<typeof useAuthProvider> = {
        checkAuth: checkAuth,
        checkError: checkError,
        login: jest.fn(),
        logout: jest.fn(),
        isErrorRelatedToPermission: () => false,
    };
    (useAuthProvider as jest.Mock).mockImplementation(() => {
        return fakeAuthProvider;
    });
};

describe("useCheckAuth", () => {
    const fakeSubRedirect: ReturnType<typeof useSubRedirect> = {
        currentSearchParams: "?search=login",
        navigateToRedirectUrl: jest.fn(),
        convertCurrentUrlToSearch: jest.fn(),
        getRedirectUrlFromCurrentUrl: jest.fn(),
        applyCurrentSearchToPath: jest.fn(),
    };
    const showSnackbar = jest.fn();

    const organizationInfo: OrganizationProperties = {
        saved_organization: "manabie",
        active_organization: "manabie",
    };

    const checkError = jest.fn();

    beforeEach(() => {
        (useSubRedirect as jest.Mock).mockReturnValue(fakeSubRedirect);

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (initNewConfigWithOrganization as jest.Mock).mockImplementation(jest.fn());

        reactiveStorage.set("ORGANIZATION_INFO", organizationInfo);
    });

    afterAll(() => {
        reactiveStorage.clear();
    });

    it("onCheckAuth | success", async () => {
        const checkAuth = jest.fn(() => Promise.resolve(undefined));

        mockFakeAuthProvider(checkAuth, checkError);

        const { result } = renderHook(() => useCheckAuth(), {
            wrapper: AppProvider,
        });

        await act(async () => {
            await result.current.onCheckAuth();
        });

        expect(checkAuth).toBeCalledTimes(1);
        expect(checkError).not.toBeCalled();
        expect(initNewConfigWithOrganization).toBeCalledWith(organizationInfo.active_organization);
    });

    it("onCheckAuth | error | login option", async () => {
        const msgError = "This is error";
        const checkAuth = jest.fn(() => Promise.reject(msgError));

        mockFakeAuthProvider(checkAuth, checkError);

        const { result } = renderHook(() => useCheckAuth(), {
            wrapper: AppProvider,
        });

        await act(async () => {
            try {
                await result.current.onCheckAuth();
            } catch (error) {
                expect(error).toEqual(msgError);
            }
        });

        expect(checkAuth).toBeCalledTimes(1);
        expect(showSnackbar).toBeCalledWith(msgError, "error");
        expect(checkError).toBeCalledTimes(1);

        expect(reactiveStorage.get("ORGANIZATION_INFO")).toEqual({
            active_organization: "",
            saved_organization: "manabie",
        });
    });

    it("onCheckAuth | error | not login option", async () => {
        reactiveStorage.set("PROFILE", {
            id: "unit-test",
            name: "unit-test@manabie",
            country: 5,
            phoneNumber: "",
            email: "unit-test@manabie",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1653533999, nanos: 0 },
            updatedAt: { seconds: 1653533999, nanos: 0 },
            schoolIdsList: [-2147483639],
            schoolsList: [{ schoolId: 123, schoolName: "Manabie" }],
            schoolName: "Manabie",
            schoolId: 123,
            countryName: "COUNTRY_JP",
        });
        reactiveStorage.set("TOKEN", "Manabie_Token");

        const msgError = "This is error";
        const checkAuth = jest.fn(() => Promise.reject(msgError));

        mockFakeAuthProvider(checkAuth, checkError);

        const { result } = renderHook(() => useCheckAuth(true), {
            wrapper: AppProvider,
        });

        await act(async () => {
            try {
                await result.current.onCheckAuth();
            } catch (error) {
                expect(error).toEqual(msgError);
            }
        });

        expect(checkAuth).toBeCalledTimes(1);
        expect(showSnackbar).not.toBeCalled();
        expect(checkError).not.toBeCalled();
        expect(reactiveStorage.get("ORGANIZATION_INFO")).toEqual({
            active_organization: "",
            saved_organization: "manabie",
        });
        expect(reactiveStorage.get("PROFILE")).toBeNull();
        expect(reactiveStorage.get("TOKEN")).toBeNull();
    });
});
