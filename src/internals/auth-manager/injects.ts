import appConfigs from "src/internals/configuration";
import { AbstractAuthWithSupports } from "src/typings/auth-provider";

import { UserModifierServicePromiseClient } from "manabuf/bob/v1/users_grpc_web_pb";
import { ExchangeTokenRequest } from "manabuf/bob/v1/users_pb";

import { AbstractAuth, isTokenValid } from "../../packages/abstract-auth";
// we must initialize this module as a standalone service else we will have cyclic import
// (service need interceptor, but interceptor need service)
import reactiveStorage from "../reactive-storage";

// we need to exchange other provider token into our manabie token
async function exchangeToken(
    this: AbstractAuth<any>,
    providerToken: string
): Promise<string | undefined> {
    try {
        // eslint-disable-next-line no-restricted-syntax
        const userModifierClientBob = new UserModifierServicePromiseClient(
            appConfigs.getEndpoints().gRPC,
            {}
        );

        const resp = await userModifierClientBob.exchangeToken(
            new ExchangeTokenRequest().setToken(providerToken)
        );

        const token = resp.getToken();
        this.setCustomToken!(token);
        return token;
    } catch (err) {
        window.warner?.warn("ExchangeToken err: ", err);
    }
}

//todo: we should move the control of custom token into the authManager
async function isAuthenticated(this: AbstractAuth<any>, force = true) {
    const ourToken = this.getCustomToken!();
    const isValid = isTokenValid(ourToken);

    if (isValid || !force) {
        return isValid;
    }

    //if token is invalid & user session is expired, LOG OUT
    if (!(await this.getUser())) {
        window.warner?.log("User session is ended");
        return false;
    }

    return new Promise<boolean>(async (resolve) => {
        if (this.isRefreshingToken()) {
            window.warner?.log("Other refresh token request is on the flight, waiting");

            const wrappedResolve = (token: string | PromiseLike<string>) => resolve(Boolean(token));
            const wrappedReject = (reason?: any) => {
                this.logger?.warn("Cannot refresh token", reason);
                // we dont re
                resolve(false);
            };

            this.addToQueue({ resolve: wrappedResolve, reject: wrappedReject });
            return;
        }

        this.startRefresh();
        // if our token is expired but the provider session is still valid, then we try to exchangeToken again
        try {
            const providerToken = await this.getAccessToken(true);
            if (!providerToken) {
                window.warner?.log("Cannot get provider token");

                this.processQueue("Cannot get provider token", null);
                return resolve(false);
            }

            const newExchangedToken = await this.exchangeToken!(providerToken);
            if (!newExchangedToken) {
                window.warner?.log("Cannot exchange new token");

                this.processQueue("Cannot exchange new token", null);
                return resolve(false);
            }

            this.processQueue(null, newExchangedToken);
            resolve(true);
        } catch (e) {
            resolve(false);
            window.warner?.warn("Refresh token process has error", e);
        } finally {
            this.stopRefresh();
        }
    });
}

function getCustomToken() {
    return reactiveStorage.get("TOKEN") as string | null;
}

function setCustomToken(token: string) {
    reactiveStorage.set("TOKEN", token);
}

function withSupports<T>(authManager: AbstractAuth<T>): AbstractAuthWithSupports<T> {
    authManager.exchangeToken = exchangeToken.bind(authManager);
    authManager.isAuthenticated = isAuthenticated.bind(authManager);
    authManager.getCustomToken = getCustomToken.bind(authManager);
    authManager.setCustomToken = setCustomToken.bind(authManager);

    return authManager as AbstractAuthWithSupports<T>;
}

export default withSupports;
