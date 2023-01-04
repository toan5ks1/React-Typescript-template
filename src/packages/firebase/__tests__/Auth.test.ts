import { Fn } from "../../../typings/support-types";
import { ResetPasswordData } from "../../abstract-auth/AbstractAuth";
import FirebaseAuth from "../Auth";

import type { FirebaseApp } from "@firebase/app";
import { onAuthStateChanged, Auth, sendPasswordResetEmail, getAuth } from "@firebase/auth";

jest.mock("@firebase/auth", () => {
    const actual = jest.requireActual("@firebase/auth");
    return {
        ...actual,
        onAuthStateChanged: jest.fn(),
        getAuth: jest.fn(),
        sendPasswordResetEmail: jest.fn(),
    };
});

describe("FirebaseAuth.getUser", () => {
    it("should not throw when user not found", async () => {
        const fakeUnsubscribe = jest.fn();

        (onAuthStateChanged as jest.Mock).mockImplementation(
            (_firebaseAuth: Auth, callback: Fn) => {
                setTimeout(() => {
                    callback(null);
                }, 0);

                return fakeUnsubscribe;
            }
        );

        const fakeFirebaseApp = {} as FirebaseApp;

        const firebaseAuth = new FirebaseAuth(fakeFirebaseApp, {
            redirectUrl: "/",
        });

        await expect(firebaseAuth.getUser()).resolves.toEqual(null);
        expect(fakeUnsubscribe).toHaveBeenCalledTimes(1);
    });

    it("should unsubscribe when waiting for too long and return null", async () => {
        jest.useFakeTimers("modern");
        const fakeUnsubscribe = jest.fn();

        (onAuthStateChanged as jest.Mock).mockImplementation(() => {
            // don't call the callback to make it timeout
            return fakeUnsubscribe;
        });
        const fakeFirebaseApp = {} as FirebaseApp;

        const firebaseAuth = new FirebaseAuth(fakeFirebaseApp, {
            redirectUrl: "/",
        });

        const result = firebaseAuth.getUser(); // don't block for result
        expect(fakeUnsubscribe).not.toHaveBeenCalled(); //not timeout yet
        jest.runAllTimers();
        expect(fakeUnsubscribe).toHaveBeenCalled(); // should time out

        expect(await result).toEqual(null);
    });
});

describe("FirebaseAuth.resetPassword", () => {
    it("should reset password with correct settings normal", async () => {
        const fakeResetFn = jest.fn();
        const fakeAuth = {};
        const fakeGetAuth = () => fakeAuth;
        (sendPasswordResetEmail as jest.Mock).mockImplementation(fakeResetFn);
        (getAuth as jest.Mock).mockImplementation(fakeGetAuth);

        const fakeFirebaseApp = {} as FirebaseApp;
        const data: ResetPasswordData = {
            email: "hello@gmail.com",
            locale: "en",
        };
        const redirectUrl = "/login";

        const firebaseAuth = new FirebaseAuth(fakeFirebaseApp, {
            redirectUrl,
        });

        await firebaseAuth.resetPassword(data);

        expect(fakeResetFn).toHaveBeenCalledWith(expect.anything(), data.email, {
            url: redirectUrl,
        });
    });

    it("should reset password with correct settings multi-tenant", async () => {
        const fakeResetFn = jest.fn();
        const fakeAuth = {};
        const fakeGetAuth = () => fakeAuth;
        (sendPasswordResetEmail as jest.Mock).mockImplementation(fakeResetFn);
        (getAuth as jest.Mock).mockImplementation(fakeGetAuth);

        const fakeFirebaseApp = {} as FirebaseApp;

        const data: ResetPasswordData = {
            email: "hello@gmail.com",
            locale: "en",
            tenantId: "manabie",
        };

        const redirectUrl = "/login";
        const redirectUrlTenant = "/login-tenant";

        const firebaseAuth = new FirebaseAuth(fakeFirebaseApp, {
            redirectUrl,
            redirectUrlTenant,
        });

        await firebaseAuth.resetPassword(data);

        expect(fakeResetFn).toHaveBeenCalledWith(expect.anything(), data.email, {
            url: redirectUrlTenant,
        });
    });
});

// todo: it run when run all test, dont know why, will trace soon (maybe I mock things wrong)
// describe("FirebaseAuth.getAccessToken", () => {
//     it("should revoke token when forced", async () => {
//         const fakeToken = "token321";
//         const fakeUser = {
//             getIdToken: jest.fn().mockImplementation(async () => fakeToken),
//         } as unknown as User;
//
//         const fakeFirebaseApp = {
//             auth: () => {
//                 return {
//                     onAuthStateChanged: (cb: Fn) => {
//                         setTimeout(() => {
//                             cb(fakeUser);
//                         }, 0);
//
//                         return () => {};
//                     },
//                 };
//             },
//         } as unknown as FirebaseApp;
//
//         const firebaseAuth = new FirebaseAuth(fakeFirebaseApp, { redirectUrl: "/" });
//         const force = true;
//
//         const result = firebaseAuth.getAccessToken(force);
//
//         expect(await result).toEqual(fakeToken);
//         expect(fakeUser.getIdToken).toHaveBeenCalledWith(force);
//     });
// });
