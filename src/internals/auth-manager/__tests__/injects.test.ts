import appConfigs from "src/internals/configuration";
import { AbstractAuthWithSupports } from "src/typings/auth-provider";

import { UserModifierServicePromiseClient } from "manabuf/bob/v1/users_grpc_web_pb";
import { ExchangeTokenRequest, ExchangeTokenResponse } from "manabuf/bob/v1/users_pb";

import {
    AbstractAuth,
    GeneralizedUser,
    isTokenValid,
    QueueItem,
} from "../../../packages/abstract-auth";
import { mockWarner } from "../../../test-utils/warner";
import reactiveStorage from "../../reactive-storage";
import withSupports from "../injects";

jest.mock("../../configuration");

jest.mock("src/packages/abstract-auth", () => {
    const actual = jest.requireActual("src/packages/abstract-auth");

    return {
        ...actual,
        isTokenValid: jest.fn(),
    };
});

jest.mock("manabuf/bob/v1/users_grpc_web_pb", () => {
    return {
        UserModifierServicePromiseClient: jest.fn(),
    };
});

jest.mock("src/internals/configuration", () => {
    return jest.requireActual("src/internals/configuration/__mocks__/configuration");
});

function setupSupport(overrides?: undefined | Record<string, any>) {
    const auth = { ...overrides } as AbstractAuth<any>; //fake abstract auth

    return withSupports(auth);
}

describe("withSupports", () => {
    const exchangeToken = jest.fn();

    mockWarner({
        warn: jest.fn(),
        log: jest.fn(),
    });

    afterEach(() => {
        localStorage.clear();
    });

    beforeEach(() => {
        (appConfigs.getEndpoints as jest.Mock).mockReturnValue(() => ({ gRPC: "gRPC" }));

        (UserModifierServicePromiseClient as jest.Mock).mockReturnValue({
            exchangeToken,
        });
    });

    it("should append support function to the object", () => {
        const auth = setupSupport();

        expect(typeof auth.getCustomToken).toEqual("function");
        expect(typeof auth.setCustomToken).toEqual("function");
        expect(typeof auth.exchangeToken).toEqual("function");
        expect(typeof auth.isAuthenticated).toEqual("function");
    });

    it("should get/set token to localStorage", () => {
        const auth = setupSupport();
        const token = "randomToken";

        auth.setCustomToken(token);

        expect(reactiveStorage.get("TOKEN")).toEqual(token);
        expect(auth.getCustomToken()).toEqual(token);
    });

    it("should call exchange token in bob user client", async () => {
        (exchangeToken as jest.Mock).mockReturnValue({
            getToken: (token: string) => token,
        });

        const auth = setupSupport();
        const token = "exchangeToken";

        await auth.exchangeToken(token);

        expect(exchangeToken).toHaveBeenCalledWith(new ExchangeTokenRequest().setToken(token));
        expect(exchangeToken).toHaveBeenCalledTimes(1);
    });

    it("should call exchange token successfully", async () => {
        const auth = setupSupport();
        const token = "exchangeToToken";
        const exchangedToken = "exchangedToken";
        (exchangeToken as jest.Mock).mockImplementation(() => {
            return new ExchangeTokenResponse().setToken(exchangedToken);
        });

        const afterExchangeToken = await auth.exchangeToken(token);

        expect(exchangeToken).toHaveBeenCalledWith(new ExchangeTokenRequest().setToken(token));

        expect(afterExchangeToken).toEqual(exchangedToken);
        expect(auth.getCustomToken()).toEqual(afterExchangeToken);
    });

    it("should warn and return nothing when exchangeToken has error", async () => {
        const auth = setupSupport();
        const token = "exchangeToken";
        const err = new Error("error");
        (exchangeToken as jest.Mock).mockImplementation(() => {
            throw err;
        });

        const resp = await auth.exchangeToken(token);

        expect(resp).toEqual(undefined);
        expect(window.warner?.warn).toHaveBeenCalledWith("ExchangeToken err: ", err);
    });

    test("isAuthenticated should return directly the valid state when force is FALSE", async () => {
        const auth = setupSupport();
        // if isValid is true, just return true
        (isTokenValid as jest.Mock).mockReturnValue(true);

        const isAuth = await auth.isAuthenticated(false);

        expect(isAuth).toEqual(true);

        // if isValid is false and force is false, return the isValid directly
        (isTokenValid as jest.Mock).mockReturnValue(false);
        const isAuthNotValid = await auth.isAuthenticated(false);

        expect(isAuthNotValid).toEqual(false);
    });

    test("isAuthenticated if user is not exist, session is expired , return FALSE and call warner log", async () => {
        const auth = setupSupport({
            getUser: async () => null,
        });

        // token is invalid and force is true
        (isTokenValid as jest.Mock).mockReturnValue(false);
        const isAuth = await auth.isAuthenticated(true);

        expect(isAuth).toEqual(false);
        expect(window.warner?.log).toHaveBeenCalledWith("User session is ended");
    });

    test("isAuthenticated if refreshing is on the flight, add to the queue and wait until it's resolved", async () => {
        //resolve the queue immediately
        const fakeResolved = "valid";
        const addToQueue = jest.fn().mockImplementation(({ resolve }: QueueItem) => {
            resolve(fakeResolved);
        });
        const auth = setupSupport({
            isRefreshingToken: () => true,
            getUser: async (): Promise<GeneralizedUser> => {
                return {
                    name: "hello",
                    email: "hello@gmail.com",
                };
            },
            addToQueue: addToQueue,
        });

        const isAuth = await setupGoToRefresh(auth);

        expect(addToQueue).toHaveBeenCalledTimes(1);
        // return the Boolean type of resolved value
        expect(isAuth).toEqual(Boolean(fakeResolved));
    });

    test("isAuthenticated should stop refresh process and return FALSE when cannot get accessToken", async () => {
        const startRefresh = jest.fn();
        const stopRefresh = jest.fn();
        const getAccessToken = jest.fn();
        const processQueue = jest.fn();
        const auth = setupSupport({
            getUser: async (): Promise<GeneralizedUser> => {
                return {
                    name: "hello",
                    email: "hello@gmail.com",
                };
            },
            startRefresh: startRefresh,
            stopRefresh: stopRefresh,
            processQueue: processQueue,
            isRefreshingToken: () => false,
            getAccessToken: getAccessToken.mockImplementation(() => undefined),
        });

        const isAuth = await setupGoToRefresh(auth);

        expect(startRefresh).toHaveBeenCalledTimes(1);
        expect(stopRefresh).toHaveBeenCalledTimes(1);
        expect(getAccessToken).toHaveBeenCalledWith(true); // called with force = true
        expect(processQueue).toHaveBeenCalledWith("Cannot get provider token", null); // called with force = true
        expect(isAuth).toEqual(false); // called with force = true
    });

    test("isAuthenticated should warn and return FALSE when refresh process throw error", async () => {
        const startRefresh = jest.fn();
        const stopRefresh = jest.fn();
        const getAccessToken = jest.fn();
        const processQueue = jest.fn();
        const err = new Error("Lets throw this error");
        const auth = setupSupport({
            getUser: async (): Promise<GeneralizedUser> => {
                return {
                    name: "hello",
                    email: "hello@gmail.com",
                };
            },
            startRefresh: startRefresh,
            stopRefresh: stopRefresh,
            processQueue: processQueue,
            isRefreshingToken: () => false,
            getAccessToken: getAccessToken.mockImplementation(() => {
                throw err;
            }),
        });

        const isAuth = await setupGoToRefresh(auth);

        expect(window.warner?.warn).toHaveBeenCalledWith("Refresh token process has error", err); // called with force = true
        expect(isAuth).toEqual(false); // called with force = true
    });

    test("isAuthenticated return FALSE when cannot exchange token", async () => {
        const startRefresh = jest.fn();
        const stopRefresh = jest.fn();
        const getAccessToken = jest.fn();
        const processQueue = jest.fn();
        const auth = setupSupport({
            getUser: async (): Promise<GeneralizedUser> => {
                return {
                    name: "hello",
                    email: "hello@gmail.com",
                };
            },
            startRefresh: startRefresh,
            stopRefresh: stopRefresh,
            processQueue: processQueue,
            isRefreshingToken: () => false,
            getAccessToken: getAccessToken.mockImplementation(() => "validToken"),
        });
        const err = new Error("Error in exchange token client");
        (exchangeToken as jest.Mock).mockImplementation(() => {
            throw err; // throw error to return undefined
        });

        const isAuth = await setupGoToRefresh(auth);

        expect(isAuth).toEqual(false);
        expect(processQueue).toHaveBeenCalledWith("Cannot exchange new token", null);
        expect(window.warner?.log).toHaveBeenCalledWith("Cannot exchange new token");
    });

    test("isAuthenticated return TRUE, the refresh process works WELL when everything OK", async () => {
        const startRefresh = jest.fn();
        const stopRefresh = jest.fn();
        const getAccessToken = jest.fn();
        const processQueue = jest.fn();
        const auth = setupSupport({
            getUser: async (): Promise<GeneralizedUser> => {
                return {
                    name: "hello",
                    email: "hello@gmail.com",
                };
            },
            startRefresh: startRefresh,
            stopRefresh: stopRefresh,
            processQueue: processQueue,
            isRefreshingToken: () => false,
            getAccessToken: getAccessToken.mockImplementation(() => "validToken"),
        });
        const tokenAfterExchanged = "exchangedToken";
        (exchangeToken as jest.Mock).mockImplementation(() => {
            return new ExchangeTokenResponse().setToken(tokenAfterExchanged);
        });

        const isAuth = await setupGoToRefresh(auth);

        expect(isAuth).toEqual(true); // finally, it is TRUE now
        expect(processQueue).toHaveBeenCalledWith(null, tokenAfterExchanged); // no error, valid token
    });
});

function setupGoToRefresh(authManager: AbstractAuthWithSupports<any>) {
    (isTokenValid as jest.Mock).mockReturnValue(false); // isTokenValid must return false

    return authManager.isAuthenticated(true); // force must be true
}
