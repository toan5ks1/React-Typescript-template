import { ProviderTypes } from "src/packages/abstract-auth";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/internals/configuration");

describe("<SSOLayout />", () => {
    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
    });
    it("should show Not Found page when current auth mechanism is not OIDC", async () => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),

                    type: ProviderTypes.firebase,
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.isolateModules(() => {
            const SSOLayout = require("../SSOLayout").default;

            render(<SSOLayout />);
        });
        expect(await screen.findByTestId("SSOLayout__notfound")).toBeInTheDocument();
    });

    it("should show loading based on loading prop", async () => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),

                    type: ProviderTypes.oidc,
                    getType: () => ProviderTypes.oidc,
                },
            };
        });

        jest.isolateModules(() => {
            const SSOLayout = require("../SSOLayout").default;
            render(<SSOLayout loading={true} />);
        });
        expect(await screen.findByTestId("SSOLayout__loading")).toBeInTheDocument();
    });

    it("should render return home page button on error", async () => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),

                    type: ProviderTypes.oidc,
                    getType: () => ProviderTypes.oidc,
                },
            };
        });

        jest.isolateModules(() => {
            const SSOLayout = require("../SSOLayout").default;
            render(<SSOLayout error={true} />);
        });
        expect(await screen.findByTestId("SSOLayout__backBtn")).toBeInTheDocument();
    });

    it("should handle back action on back button", async () => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),

                    type: ProviderTypes.oidc,
                    getType: () => ProviderTypes.oidc,
                },
            };
        });

        const fn = jest.fn();

        jest.isolateModules(() => {
            const SSOLayout = require("../SSOLayout").default;
            render(<SSOLayout error={true} onBack={fn} />);
        });

        expect(await screen.findByTestId("SSOLayout__backBtn")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("SSOLayout__backBtn"));

        expect(fn).toHaveBeenCalled();
    });
});
