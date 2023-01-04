import * as er from "../error";
import { copyError, FirebaseError } from "../error";

const errorCodesMap = er.errorCodesMap;

describe("getFirebaseErrorMsg", () => {
    it("should return correct err msg", () => {
        expect(er.getFirebaseErrorMsg()).toEqual(errorCodesMap.UNKNOWN); // default value

        expect(er.getFirebaseErrorMsg("auth/invalid-email")).toEqual(
            errorCodesMap.FIREBASE_INVALID_EMAIL
        );
        expect(er.getFirebaseErrorMsg("auth/user-disabled")).toEqual(
            errorCodesMap.FIREBASE_USER_DISABLED
        );
        expect(er.getFirebaseErrorMsg("auth/user-not-found")).toEqual(
            errorCodesMap.FIREBASE_USER_NOT_FOUND
        );
        expect(er.getFirebaseErrorMsg("auth/wrong-password")).toEqual(
            errorCodesMap.FIREBASE_WRONG_PASSWORD
        );
        expect(er.getFirebaseErrorMsg("auth/missing-android-pkg-name")).toEqual(
            errorCodesMap.FIREBASE_MISSING_ANDROID_PKG_NAME
        );
        expect(er.getFirebaseErrorMsg("auth/missing-continue-uri")).toEqual(
            errorCodesMap.FIREBASE_MISSING_CONTINUE_URI
        );
        expect(er.getFirebaseErrorMsg("auth/missing-ios-bundle-id")).toEqual(
            errorCodesMap.FIREBASE_MISSING_IOS_BUNDLE_ID
        );
        expect(er.getFirebaseErrorMsg("auth/invalid-continue-uri")).toEqual(
            errorCodesMap.FIREBASE_INVALID_CONTINUE_URI
        );
        expect(er.getFirebaseErrorMsg("auth/unauthorized-continue-uri")).toEqual(
            errorCodesMap.FIREBASE_UNAUTHORIZED_CONTINUE_URI
        );

        //custom manabie-error
        expect(er.getFirebaseErrorMsg("token-not-exist")).toEqual(errorCodesMap.TOKEN_NOT_EXIST);
        expect(er.getFirebaseErrorMsg("token-invalid")).toEqual(errorCodesMap.CLAIM_TOKEN_INVALID); // same with bellow
        expect(er.getFirebaseErrorMsg("claim_token_invalid")).toEqual(
            errorCodesMap.CLAIM_TOKEN_INVALID
        );
        expect(er.getFirebaseErrorMsg("permission-denied")).toEqual(
            errorCodesMap.FIREBASE_PERMISSION_DENIED
        );

        expect(er.getFirebaseErrorMsg("auth/too-many-requests")).toEqual(
            errorCodesMap.FIREBASE_TOO_MANY_REQUEST
        );

        expect(er.getFirebaseErrorMsg("auth/quota-exceeded")).toEqual(
            errorCodesMap.FIREBASE_QUOTA_EXCEEDED
        );
    });
});

describe("FirebaseError", () => {
    it("should return correct error property", () => {
        const err = { message: "ABC", code: "auth/invalid-email" };

        expect(new FirebaseError(err).originMessage).toEqual("ABC");
        expect(new FirebaseError(err).message).toEqual(errorCodesMap.FIREBASE_INVALID_EMAIL);
        expect(new FirebaseError(err).code).toEqual("auth/invalid-email");
    });
});

describe("copyError", () => {
    it("should return correct error property", () => {
        const sampleError = new Error("sample error");

        expect(copyError(sampleError)).toEqual(sampleError);
    });
    it("should return error correct with newMessage", () => {
        const sampleError = new Error("sample error");
        const newMessage = "this is newMessage";

        expect(copyError(sampleError, newMessage)).toEqual(new Error(newMessage));
    });
    it("should return error correct with originMessage", () => {
        const originMessage = "this is originMessage";
        const sampleError = new Error("sample error");
        sampleError["originMessage"] = originMessage;

        expect(copyError(sampleError)).toEqual(new Error(originMessage));
    });
});
