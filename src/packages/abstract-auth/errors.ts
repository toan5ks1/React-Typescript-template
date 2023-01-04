export enum EnumAuthErrors {
    wrongPassword = "auth/wrong-password",
    argumentError = "auth/argument-error",
    invalidEmail = "auth/invalid-email",
    userDisabled = "auth/user-disabled",
    userNotFound = "auth/user-not-found",
    timeout = "auth/timeout",
    cannotSignOut = "auth/cannot-sign-out",

    credentialExpired = "auth/credential-expired",
    unauthorized = "auth/unauthorized",
}

export class AuthError extends Error {
    static isCriticalError(err: AuthError) {
        return (
            err.message === EnumAuthErrors.wrongPassword ||
            err.message === EnumAuthErrors.userNotFound ||
            err.message === EnumAuthErrors.userDisabled ||
            err.message === EnumAuthErrors.timeout ||
            err.message === EnumAuthErrors.credentialExpired
        );
    }

    constructor({ message }: { message: EnumAuthErrors }) {
        super(message);

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
            return;
        }
    }
}
