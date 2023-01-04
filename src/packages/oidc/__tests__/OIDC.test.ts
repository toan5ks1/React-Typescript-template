import { UserManagerSettings } from "oidc-client";

import OIDC from "../OIDC";

describe("OIDC", () => {
    const configs: UserManagerSettings = {
        authority:
            "https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",
        client_id: "manabie-app",
        response_type: "code",
        scope: "openid",
        redirect_uri: `/_auth/_callback`,
        post_logout_redirect_uri: `/_auth/_signout`,
        silent_redirect_uri: `/_auth/_silent`,
        automaticSilentRenew: false,
        silentRequestTimeout: 10000,
    };

    test("getAccessToken should return id token", async () => {
        const mockGetUser = jest.fn();
        const getUserResult = {
            access_token: "access_token",
            id_token: "id_token",
        };

        OIDC.prototype._internalGetUser = mockGetUser;
        mockGetUser.mockReturnValue(getUserResult);

        const oidc = new OIDC(configs);
        expect(await oidc.getAccessToken()).toEqual(getUserResult.id_token);
    });

    it("should return undefined when revokeToken throw error", async () => {
        const getUserResult = {
            access_token: "access_token",
            id_token: "invalid_id_token",
        };

        OIDC.prototype._internalGetUser = jest.fn().mockReturnValue(getUserResult);
        OIDC.prototype.revokeToken = jest.fn().mockImplementation(async () => {
            throw new Error("test");
        });

        const oidc = new OIDC(configs);

        expect(await oidc.getAccessToken(true)).toEqual(undefined);
    });
});
