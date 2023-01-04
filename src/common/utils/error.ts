export const errorCodesMap = {
    FIREBASE_INVALID_EMAIL: "ra.manabie-error.firebase.invalid_email",
    FIREBASE_USER_DISABLED: "ra.manabie-error.firebase.user_disabled",
    FIREBASE_USER_NOT_FOUND: "ra.manabie-error.firebase.user_not_found",
    FIREBASE_WRONG_PASSWORD: "ra.manabie-error.firebase.wrong_password",
    FIREBASE_MISSING_ANDROID_PKG_NAME: "ra.manabie-error.firebase.missing_android_pkg_name",
    FIREBASE_MISSING_CONTINUE_URI: "ra.manabie-error.firebase.missing_continue_uri",
    FIREBASE_MISSING_IOS_BUNDLE_ID: "ra.manabie-error.firebase.missing_ios_bundle_id",
    FIREBASE_INVALID_CONTINUE_URI: "ra.manabie-error.firebase.invalid_continue_uri",
    FIREBASE_UNAUTHORIZED_CONTINUE_URI: "ra.manabie-error.firebase.unauthorized_continue_uri",
    FIREBASE_PERMISSION_DENIED: "ra.manabie-error.firebase.permission_denied",
    FIREBASE_TOO_MANY_REQUEST: "ra.manabie-error.firebase.too_many_request",
    FIREBASE_QUOTA_EXCEEDED: "ra.manabie-error.firebase.quota_exceeded",

    TOKEN_NOT_EXIST: "ra.manabie-error.token_not_exist",
    UNKNOWN: "ra.manabie-error.unknown",
    CONNECTION: "ra.manabie-error.disconnect",
    INVALID_PARAMS: "ra.manabie-error.invalid_params",
    PERMISSION_DENIED: "ra.manabie-error.permission_denied",
    INVALID_JWT: "ra.manabie-error.jwt_invalid",
    CLAIM_TOKEN_INVALID: "ra.manabie-error.claim_token_invalid",
    ALLOW_LIST_DENIED: "ra.manabie-error.allow_list_denied",
    TOKEN_EXPIRED: "ra.manabie-error.token_expired",

    TEACHER_JPREP_PERMISSION_DENIED: "ra.manabie-error.teacher_jprep_permission_denied",
};

export function getFirebaseErrorMsg(errCode = "") {
    switch (errCode) {
        //signInWithEmailAndPassword
        case "auth/invalid-email":
            return errorCodesMap.FIREBASE_INVALID_EMAIL;
        case "auth/user-disabled":
            return errorCodesMap.FIREBASE_USER_DISABLED;
        case "auth/user-not-found":
            return errorCodesMap.FIREBASE_USER_NOT_FOUND;
        case "auth/wrong-password":
            return errorCodesMap.FIREBASE_WRONG_PASSWORD;
        case "auth/quota-exceeded":
            return errorCodesMap.FIREBASE_QUOTA_EXCEEDED;
        // sendPasswordResetEmail
        case "auth/missing-android-pkg-name":
            return errorCodesMap.FIREBASE_MISSING_ANDROID_PKG_NAME;
        case "auth/missing-continue-uri":
            return errorCodesMap.FIREBASE_MISSING_CONTINUE_URI;
        case "auth/missing-ios-bundle-id":
            return errorCodesMap.FIREBASE_MISSING_IOS_BUNDLE_ID;
        case "auth/invalid-continue-uri":
            return errorCodesMap.FIREBASE_INVALID_CONTINUE_URI;
        case "auth/unauthorized-continue-uri":
            return errorCodesMap.FIREBASE_UNAUTHORIZED_CONTINUE_URI;
        case "auth/too-many-requests":
            return errorCodesMap.FIREBASE_TOO_MANY_REQUEST;

        //custom
        case "token-not-exist":
            return errorCodesMap.TOKEN_NOT_EXIST;
        case "token-invalid":
        case "claim_token_invalid":
            return errorCodesMap.CLAIM_TOKEN_INVALID;
        case "permission-denied":
            return errorCodesMap.FIREBASE_PERMISSION_DENIED;
        default:
            return errorCodesMap.UNKNOWN;
    }
}

export interface FirebaseErrorOptions {
    message: string;
    code?: string;
}

export class FirebaseError extends Error {
    originMessage: string;
    code?: string;
    name = "ManabieFirebaseError";

    constructor({ message, code }: FirebaseErrorOptions) {
        super(getFirebaseErrorMsg(code));
        this.originMessage = message;
        this.code = code;

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

interface OriginError {
    originMessage?: string;
}
export interface ErrorResponse extends OriginError, Error {}

export const handleUnknownError = (err: unknown): ErrorResponse | FirebaseError => {
    if (err instanceof FirebaseError) {
        return err;
    }
    if (err instanceof Error) {
        return err;
    }

    const defaultMessage = (err as any).message || errorCodesMap.UNKNOWN;

    return new Error(defaultMessage);
};

export const copyError = (err: Error & { originMessage?: string }, newMessage?: string) => {
    let message: string = err.message;
    if (typeof err["originMessage"] !== "undefined" && err.originMessage)
        message = err.originMessage;

    const newErr = new Error(newMessage ?? message);
    newErr.stack = err.stack;
    newErr.name = err.name;

    return newErr;
};
