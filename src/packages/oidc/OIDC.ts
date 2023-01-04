import { UserManager, UserManagerSettings } from "oidc-client";

import {
    AbstractAuth,
    GeneralizedUser,
    isTokenValid,
    LoginCredential,
    ProviderTypes,
    RedirectOptions,
    TokenReturn,
} from "../abstract-auth";
import { getRedirectUri, sleep } from "./utils";

export * from "oidc-client";

//todo: move new UserManager outside
class OIDC extends AbstractAuth<UserManager> {
    private readonly userManager: UserManager;
    blocking: Promise<any> | null = null;
    type = ProviderTypes.oidc;

    constructor(configs: Partial<UserManagerSettings>) {
        super();

        const settings: UserManagerSettings = Object.assign(
            {},
            {
                automaticSilentRenew: true,
                response_type: "code",
                scope: "openid",
            },
            configs
        );

        this.userManager = new UserManager(settings);

        this.getUser = this.getUser.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getInstance = this.getInstance.bind(this);
        this.revokeToken = this.revokeToken.bind(this);
        this._internalGetUser = this._internalGetUser.bind(this);
    }

    async _internalGetUser() {
        return this.userManager.getUser();
    }

    async getUser(): Promise<GeneralizedUser | null> {
        const user = await this._internalGetUser();

        if (!user) return null;

        return {
            name: user?.profile.name,
            email: user?.profile.email,
        };
    }

    async signIn(_cred: LoginCredential, options?: RedirectOptions): Promise<void> {
        const redirectUri = this.userManager.settings.redirect_uri;
        await this.userManager.signinRedirect({
            redirect_uri: getRedirectUri(redirectUri, options?.additionalQuery),
        });
        // for OIDC, wait 20s until the page transition
        await sleep(20000);
    }

    async signOut(options: RedirectOptions): Promise<void> {
        const redirectUri = this.userManager.settings.post_logout_redirect_uri;
        // signout popup is better for UX but most of the time, browser will block us, so let's keep redirect
        return this.userManager.signoutRedirect({
            post_logout_redirect_uri: getRedirectUri(redirectUri, options?.additionalQuery),
        });
    }

    async resetPassword(): Promise<void> {
        throw new Error("forgotPassword not supported");
    }

    async getAccessToken(force?: boolean): Promise<TokenReturn> {
        const user = await this._internalGetUser();

        const idToken = user?.id_token;
        if (!force) {
            return idToken;
        }

        if (idToken && !isTokenValid(idToken)) {
            this.logger?.log("Waiting to revoke token OIDC");

            try {
                await this.revokeToken();
            } catch (e) {
                this.logger?.log("Cannot revoke token", e);
                return undefined;
            }
        }

        return this.getAccessToken(false); //call itself but don't force refresh, else it will cause infinity loop
    }

    getInstance() {
        return this.userManager;
    }

    async revokeToken() {
        await this.userManager.signinSilent();
    }
}

export default OIDC;
