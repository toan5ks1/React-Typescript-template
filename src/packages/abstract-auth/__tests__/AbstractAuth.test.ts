import {
    AbstractAuth,
    LoginCredential,
    ProviderTypes,
    RedirectOptions,
    TokenReturn,
    ResetPasswordData,
} from "../AbstractAuth";

describe("AbstractAuth", () => {
    class FakeClass extends AbstractAuth<any> {
        type = ProviderTypes.oidc;

        getAccessToken(_force?: boolean): Promise<TokenReturn> {
            return Promise.resolve(undefined);
        }

        getInstance(): any {}

        getUser(): Promise<any> {
            return Promise.resolve(undefined);
        }

        resetPassword(_data: ResetPasswordData | undefined): Promise<void> {
            return Promise.resolve(undefined);
        }

        revokeToken(): Promise<void> {
            return Promise.resolve(undefined);
        }

        signIn(
            _cred: LoginCredential | undefined,
            _options: RedirectOptions | undefined
        ): Promise<void> {
            return Promise.resolve(undefined);
        }

        signOut(_options: RedirectOptions | undefined): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    it("should have default refresh flag is false", () => {
        const ins = new FakeClass();

        expect(ins.isRefreshingToken()).toEqual(false);
    });
});
