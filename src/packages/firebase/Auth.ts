import {
    AbstractAuth,
    GeneralizedUser,
    LoginCredential,
    ProviderTypes,
    ResetPasswordData,
} from "../abstract-auth";

import type { FirebaseApp } from "@firebase/app";
import {
    getAuth,
    Auth as IFirebaseAuth,
    signInWithEmailAndPassword,
    signInWithRedirect,
    onAuthStateChanged,
    sendPasswordResetEmail,
    User,
} from "@firebase/auth";
import type { AuthProvider } from "@firebase/auth";

export interface FirebaseSettings {
    redirectUrl: string;
    redirectUrlTenant?: string;
}

class FirebaseAuth extends AbstractAuth<IFirebaseAuth> {
    private readonly firebaseAuth: IFirebaseAuth;
    blocking: Promise<any> | null = null;
    private settings: FirebaseSettings;
    type = ProviderTypes.firebase;

    constructor(firebaseApp: FirebaseApp, settings: FirebaseSettings) {
        super();
        this.firebaseAuth = getAuth(firebaseApp);
        this.settings = settings;

        this.getUser = this.getUser.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getInstance = this.getInstance.bind(this);
        this.revokeToken = this.revokeToken.bind(this);
        this._internalGetUser = this._internalGetUser.bind(this);
    }

    async signIn(cred: LoginCredential) {
        if (!cred) {
            throw new Error(
                "Not provide username/password, maybe you have wrong config for firebase"
            );
        }

        this.firebaseAuth.tenantId = cred.tenantId || null;

        await signInWithEmailAndPassword(this.firebaseAuth, cred.username!, cred.password!);
    }

    async signInWithRedirect(provider: AuthProvider): Promise<void> {
        await signInWithRedirect(this.firebaseAuth, provider);
    }

    async signOut() {
        return this.firebaseAuth!.signOut();
    }

    async resetPassword({ email, locale, tenantId }: ResetPasswordData) {
        let actionCodeSettings = {
            url: this.settings.redirectUrl,
        };

        if (tenantId) {
            this.firebaseAuth.tenantId = tenantId;

            const redirectUrlTenant = this.settings.redirectUrlTenant;

            if (redirectUrlTenant) {
                actionCodeSettings.url = redirectUrlTenant;
            }
        }

        const auth = this.firebaseAuth;
        auth.languageCode = locale;

        return sendPasswordResetEmail(auth, email, actionCodeSettings);
    }

    private async _internalGetUser(): Promise<User | null> {
        return new Promise((resolve) => {
            let unsubscribe: () => void;

            const timeout = setTimeout(() => {
                if (typeof unsubscribe === "function") {
                    unsubscribe();
                }

                this.logger?.warn("Firebase: get user timeout 10s");
                resolve(null);
            }, 10000);

            unsubscribe = onAuthStateChanged(this.firebaseAuth, (user: User | null) => {
                unsubscribe();
                clearTimeout(timeout);

                if (!user) {
                    this.logger?.log("Firebase: user not found");
                    return resolve(null);
                }

                resolve(user);
            });
        });
    }

    async getUser(): Promise<GeneralizedUser | null> {
        const user = await this._internalGetUser();

        if (!user) return null;

        return {
            email: user?.email || undefined,
            name: user?.displayName || undefined,
        };
    }

    async getAccessToken(force?: boolean): Promise<string | undefined> {
        if (force) {
            this.logger?.log("Firebase: Force refresh token");
            await this.revokeToken();
        }
        const user = await this._internalGetUser();

        return user?.getIdToken();
    }

    getInstance(): IFirebaseAuth {
        return this.firebaseAuth;
    }

    async revokeToken(): Promise<void> {
        const user = await this._internalGetUser();

        if (user) {
            this.logger?.log("Firebase: Waiting to revoke token Firebase");
            await user.getIdToken(true);
        }
    }
}

export default FirebaseAuth;
