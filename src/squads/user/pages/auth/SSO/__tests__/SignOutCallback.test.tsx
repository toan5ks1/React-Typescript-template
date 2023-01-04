import authManager from "src/internals/auth-manager";
import reactiveStorage from "src/squads/user/internals/reactive-storage";

import SignOutCallback from "../SignOutCallback";

import { render, screen, waitFor } from "@testing-library/react";
import useSubRedirect from "src/squads/user/hooks/useSubRedirect";

jest.useFakeTimers("modern");

jest.mock("src/squads/user/i18n", () => {
    return {
        translate: (t: string) => t,
    };
});

jest.mock("src/squads/user/internals/reactive-storage", () => {
    return {
        StorageKeys: {},
        clear: jest.fn(),
        get: jest.fn(),
    };
});

jest.mock("src/internals/auth-manager", () => {
    return {
        __esModule: true,
        default: {
            getAccessToken: jest.fn(),
            getInstance: jest.fn().mockImplementation(() => {
                return {
                    signoutRedirectCallback: () => {
                        return Promise.resolve();
                    },
                };
            }),
            isAuthenticated: jest.fn(),
            exchangeToken: jest.fn(),
            getType: () => "oidc",
        },
    };
});

jest.mock("src/squads/user/hooks/useSubRedirect", () => {
    const resp = {
        currentSearchParams: "?haha=1",
    };
    return () => resp;
});

describe("<SignOutCallback />", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should call signoutRedirectCallback when first mount", async () => {
        const fn = jest.fn();
        (authManager.getInstance as jest.Mock).mockImplementation(() => {
            return {
                signoutRedirectCallback: fn,
            };
        });

        render(<SignOutCallback />);

        await waitFor(() => expect(fn).toHaveBeenCalled());
    });

    it("should clear storage when sign out success and redirect to login with current query params", async () => {
        (authManager.getInstance as jest.Mock).mockImplementation(() => {
            return {
                signoutRedirectCallback: () => Promise.resolve(),
            };
        });

        const clearHandler = jest.fn();

        (reactiveStorage.clear as jest.Mock).mockImplementation(clearHandler);

        render(<SignOutCallback />);

        await waitFor(() => expect(clearHandler).toHaveBeenCalled());

        expect(window.location.assign).toHaveBeenCalledWith(
            `/login${useSubRedirect().currentSearchParams}`
        );
    });

    it("should show correct msg based on error or not", async () => {
        (authManager.getInstance as jest.Mock).mockImplementation(() => {
            throw new Error("test");
        });

        render(<SignOutCallback />);

        expect(await screen.findByText("ra.auth.auth/cannot-sign-out")).toBeInTheDocument();
    });
});
