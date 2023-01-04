import { Fn } from "../../typings/support-types";

export enum ProviderTypes {
    firebase = "firebase",
    oidc = "oidc",
}

// this will be defined base on internals logic
export interface AbstractAuth<T> {
    exchangeToken?(token: string): Promise<string | undefined>;
    isAuthenticated?(force?: boolean): Promise<boolean>;
    getCustomToken?(): string | null;
    setCustomToken?(token: string): void;
}

export interface LoginCredential {
    tenantId?: string;
    username?: string;
    password?: string;
}

// Currently, we don't need much information from user, you can add if you want, but remember to change in firebase auth and OIDC
export interface GeneralizedUser {
    name?: string;
    email?: string;
}

export interface RedirectOptions {
    additionalQuery?: string;
}

export interface OptionalLogger {
    warn: Fn;
    log: Fn;
    error: Fn;
}

export type QueueItem = {
    resolve: (value: string | PromiseLike<string>) => void;
    reject: (reason?: any) => void;
};

export type Queue = Array<QueueItem>;

export interface ResetPasswordData {
    email: string;
    locale: string;
    tenantId?: string;
}

//every type of auth instance must implement this class
export abstract class AbstractAuth<T> {
    abstract type: ProviderTypes;
    // this property is using for blocking the request to revokeToken
    private refreshTokenOnFlight: boolean = false;
    private refreshQueue: Queue = [];
    logger: OptionalLogger | null = null;

    protected startRefresh() {
        this.refreshTokenOnFlight = true;
    }

    protected stopRefresh() {
        this.refreshTokenOnFlight = false;
    }

    // make sure to queue for your access token turn in getAccessToken
    protected addToQueue(resolver: QueueItem) {
        // only resolve when
        this.refreshQueue.push(resolver);
    }

    protected processQueue(error: Error | string | null, token: string | null) {
        this.refreshQueue.forEach(({ resolve, reject }) => {
            if (error || !token) {
                reject(error);
            } else {
                resolve(token);
            }
        });

        this.clearQueue();
    }

    protected clearQueue() {
        this.refreshQueue = [];
    }

    getType() {
        return this.type;
    }

    isRefreshingToken() {
        return this.refreshTokenOnFlight;
    }

    setLogger(logger: OptionalLogger | null) {
        this.logger = logger;
    }

    abstract signIn(cred?: LoginCredential, options?: RedirectOptions): Promise<void>;

    abstract signOut(options?: RedirectOptions): Promise<void>;

    abstract resetPassword(data?: ResetPasswordData): Promise<void>;

    abstract getAccessToken(force?: boolean): Promise<TokenReturn>;

    abstract getUser(): Promise<GeneralizedUser | null>;

    abstract getInstance(): T;

    abstract revokeToken(): Promise<void>;
}

export type TokenReturn = string | undefined;
