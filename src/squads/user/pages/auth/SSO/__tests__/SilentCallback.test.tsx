import authManager from "src/internals/auth-manager";

import SilentCallback from "../SilentCallback";

import { render, screen, waitFor } from "@testing-library/react";

jest.mock("src/squads/user/i18n", () => {
    return {
        translate: (t: string) => t,
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

describe("<SilentCallback />", () => {
    afterEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it("should call signinSilentCallback when first mount", async () => {
        const fn = jest.fn();
        (authManager.getInstance as jest.Mock).mockImplementation(() => {
            return {
                signinSilentCallback: fn,
            };
        });

        render(<SilentCallback />);

        await waitFor(() => expect(fn).toHaveBeenCalled());
    });

    it("should show correct msg based on error or not", async () => {
        (authManager.getInstance as jest.Mock).mockImplementation(() => {
            throw new Error("test");
        });

        render(<SilentCallback />);

        expect(
            await screen.findByText("ra.manabie-error.cannotIdentifyYourCredentials")
        ).toBeInTheDocument();
    });
});
