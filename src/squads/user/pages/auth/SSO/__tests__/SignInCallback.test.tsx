import authManager from "src/internals/auth-manager";

import SignInCallback from "../SignInCallback";

import { render, screen, waitFor } from "@testing-library/react";
import useSubRedirect from "src/squads/user/hooks/useSubRedirect";

// mock i18n to return the correct translation string to allow us making assertions
jest.mock("src/squads/user/i18n", () => {
    return {
        translate: (t: string) => t,
    };
});

jest.mock("src/internals/configuration");

jest.mock("src/internals/auth-manager", () => {
    return {
        __esModule: true,
        default: {
            getAccessToken: jest.fn(),
            getInstance: jest.fn().mockImplementation(() => {
                return {
                    signinRedirectCallback: () => {
                        return Promise.resolve(true);
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
        navigateToRedirectUrl: jest.fn(),
    };
    return () => resp;
});

describe("<SignInCallback />", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should redirect on authentication success", async () => {
        (authManager.getInstance as jest.Mock).mockImplementation(() => {
            return {
                signinRedirectCallback: () => {
                    return Promise.resolve();
                },
            };
        });
        (authManager.isAuthenticated as jest.Mock).mockImplementation(() => {
            return Promise.resolve(true);
        });
        render(<SignInCallback />);
        await waitFor(() =>
            expect(useSubRedirect().navigateToRedirectUrl).toHaveBeenCalledWith("/")
        );
    });

    it("should show correct msg based on error or not", async () => {
        (authManager.getInstance as jest.Mock).mockImplementation(() => {
            throw new Error("test");
        });

        render(<SignInCallback />);

        expect(
            await screen.findByText("ra.manabie-error.cannotIdentifyYourCredentials")
        ).toBeInTheDocument();
    });

    it("should still throw Error when isAuthenticated return false", async () => {
        (authManager.isAuthenticated as jest.Mock).mockImplementation(() => {
            return Promise.resolve(false);
        });

        render(<SignInCallback />);

        expect(
            await screen.findByText("ra.manabie-error.cannotIdentifyYourCredentials")
        ).toBeInTheDocument();
    });
});
