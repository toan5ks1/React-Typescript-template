import { AuthError } from "../errors";

describe("AuthError", () => {
    test("isCriticalError should return TRUE when message is match", () => {
        expect(AuthError.isCriticalError(new Error("auth/user-not-found"))).toBe(true);
        expect(AuthError.isCriticalError(new Error("auth/user-disabled"))).toBe(true);
        expect(AuthError.isCriticalError(new Error("auth/timeout"))).toBe(true);
        expect(AuthError.isCriticalError(new Error("auth/credential-expired"))).toBe(true);
        expect(AuthError.isCriticalError(new Error("auth/wrong-password"))).toBe(true);
    });

    test("isCriticalError should return FALSE when message is not match", () => {
        expect(AuthError.isCriticalError(new Error("not match"))).toBe(false);
    });
});
