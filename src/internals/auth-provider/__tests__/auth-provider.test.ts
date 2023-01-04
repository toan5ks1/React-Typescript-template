import { Features } from "src/common/constants/enum";
import { errorCodesMap, FirebaseError } from "src/common/utils/error";
import { AppError } from "src/internals/errors";
import reactiveStorage from "src/internals/reactive-storage";
import { ProviderTypes } from "src/packages/abstract-auth";
import { mockWarner } from "src/test-utils/warner";
import {
    UserTokenPayload,
    AbstractAuthWithSupports,
    UserIdentity,
    LoginCredential,
} from "src/typings/auth-provider";

jest.mock("src/services/yasuo/user-service-yasuo", () => {
    return {
        getBasicUserProfile: jest.fn(),
    };
});

describe("auth-provider | login", () => {
    mockWarner({
        warn: jest.fn(),
        log: jest.fn(),
    });

    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
        localStorage.clear();
    });

    it("should call login correctly", async () => {
        const signIn = jest.fn(() => {
            return Promise.resolve("signIn");
        });
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: signIn,
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;
            const args: LoginCredential = {
                username: "username@example",
                password: "password",
            };
            authProvider.checkAuth = jest.fn(() => {
                return {
                    hello: 1,
                };
            });

            await authProvider.login(args);

            expect(signIn).toHaveBeenCalled();
        });
    });
    it("should throw error when isAuthenticated = false", async () => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    isAuthenticated: () => false,
                    signIn: () => Promise.resolve(),
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;
            const args: LoginCredential = { username: "username@example", password: "password" };
            const err = new Error("ra.auth.auth/unauthorized");
            await expect(() => authProvider.login(args)).rejects.toThrow(err);

            expect(window.warner?.warn).toHaveBeenCalledWith("Cannot login:", err);
        });
    });
    it("should throw error when signIn throw unknown error", async () => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: () => Promise.reject("ra.manabie-error.unknown"),
                    getType: () => ProviderTypes.oidc,
                },
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;
            const args: LoginCredential = { username: "username@example", password: "password" };

            await expect(() => authProvider.login(args)).rejects.toThrow(
                "ra.manabie-error.unknown"
            );

            expect(window.warner?.warn).toHaveBeenCalledWith(
                "Cannot login:",
                "ra.manabie-error.unknown"
            );
        });
    });
    it("should throw error when signIn = false with error", async () => {
        const err = new Error("i'm error");
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: () => {
                        throw err;
                    },
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;
            const args: LoginCredential = { username: "username@example", password: "password" };

            await expect(() => authProvider.login(args)).rejects.toThrowError(err);

            expect(window.warner?.warn).toHaveBeenCalledWith("Cannot login:", err);
        });
    });
});

describe("auth-provider | resolveCurrentUser", () => {
    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
        jest.dontMock("src/services/yasuo/user-service-yasuo");
    });

    beforeEach(() => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    getCustomToken: () => "custom-token",
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: jest.fn(),
                    getType: () => ProviderTypes.firebase,
                },
            };
        });
    });

    it("resolveCurrentUser | err Sorry, you don't have permission", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_STUDENT",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [-2147483647],
            schoolsList: [
                {
                    schoolId: -2147483647,
                    schoolName: "Jpref",
                },
            ],
            schoolName: "Jpref",
            schoolId: -2147483647,
            countryName: "COUNTRY_VN",
        };

        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const token =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJhdWQiOiJtYW5hYmllLXN0YWciLCJleHAiOjE2MzE1NTU1ODIsImlhdCI6MTYzMTU1MTk3NywianRpIjoiMDFGRkcxNlk3NjBUVlozMzJOMlA4RU1IMzUiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiVVNFUl9HUk9VUF9QQVJFTlQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJ4LWhhc3VyYS1zY2hvb2wtaWRzIjoie30iLCJ4LWhhc3VyYS11c2VyLWdyb3VwIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS1yZXNvdXJjZS1wYXRoIjoiLTIxNDc0ODM2NDUifSwibWFuYWJpZSI6eyJhbGxvd2VkX3JvbGVzIjpbIlVTRVJfR1JPVVBfUEFSRU5UIl0sImRlZmF1bHRfcm9sZSI6IlVTRVJfR1JPVVBfUEFSRU5UIiwidXNlcl9pZCI6IjAxRjdKR05LRUtUNTkxRUFFQ1IyUDZHWUYwIiwidXNlcl9ncm91cCI6IlVTRVJfR1JPVVBfUEFSRU5UIiwicmVzb3VyY2VfcGF0aCI6Ii0yMTQ3NDgzNjQ1In19.RUgHPMvCkpxkxyw34c0cNpDKPmOH2tDJNRVervE4wrleM_ORnq1rfTAsUlr8BO0TK8RldGxlrVzMHCw7kvSxmiXrechszZkEVmhHWIfD693Q697h1AoKLQ3GxX3ySJUKrS42SDgiXlB_xD2MMxSCZLEoH-NjMSlN-G3lcGlg__I";

            const err = new FirebaseError({
                code: "permission-denied",
                message: "Sorry, you don't have permission",
            });
            await expect(authProvider.resolveCurrentUser(token)).rejects.toThrow(err);
        });
    });
    it("resolveCurrentUser | err Claim token is not valid. Please contact staffs for support!", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [-2147483647],
            schoolsList: [
                {
                    schoolId: -2147483647,
                    schoolName: "Jpref",
                },
            ],
            schoolName: "Jpref",
            schoolId: -2147483647,
            countryName: "COUNTRY_VN",
        };
        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });
        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const token =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJhdWQiOiJtYW5hYmllLXN0YWciLCJleHAiOjE2MzE1NTU1ODIsImlhdCI6MTYzMTU1MTk3NywianRpIjoiMDFGRkcxNlk3NjBUVlozMzJOMlA4RU1IMzUiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiVVNFUl9HUk9VUF9QQVJFTlQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJ4LWhhc3VyYS1zY2hvb2wtaWRzIjoie30iLCJ4LWhhc3VyYS11c2VyLWdyb3VwIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS1yZXNvdXJjZS1wYXRoIjoiLTIxNDc0ODM2NDUifSwibWFuYWJpZSI6eyJhbGxvd2VkX3JvbGVzIjpbIlVTRVJfR1JPVVBfUEFSRU5UIl0sImRlZmF1bHRfcm9sZSI6IlVTRVJfR1JPVVBfUEFSRU5UIiwidXNlcl9pZCI6IjAxRjdKR05LRUtUNTkxRUFFQ1IyUDZHWUYwIiwidXNlcl9ncm91cCI6IlVTRVJfR1JPVVBfUEFSRU5UIiwicmVzb3VyY2VfcGF0aCI6Ii0yMTQ3NDgzNjQ1In19.RUgHPMvCkpxkxyw34c0cNpDKPmOH2tDJNRVervE4wrleM_ORnq1rfTAsUlr8BO0TK8RldGxlrVzMHCw7kvSxmiXrechszZkEVmhHWIfD693Q697h1AoKLQ3GxX3ySJUKrS42SDgiXlB_xD2MMxSCZLEoH-NjMSlN-G3lcGlg__I";

            const err = new FirebaseError({
                code: "claim_token_invalid",
                message: "Claim token is not valid. Please contact staffs for support!",
            });
            await expect(authProvider.resolveCurrentUser(token)).rejects.toThrow(err);
        });
    });
    it("resolveCurrentUser | invalid token", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [-2147483647],
            schoolsList: [
                {
                    schoolId: -2147483647,
                    schoolName: "Jpref",
                },
            ],
            schoolName: "Jpref",
            schoolId: -2147483647,
            countryName: "COUNTRY_VN",
        };
        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });
        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const token = "invalid token";

            const err = new FirebaseError({
                code: "claim_token_invalid",
                message: "Claim token is not valid. Please contact staffs for support!",
            });
            await expect(authProvider.resolveCurrentUser(token)).rejects.toThrow(err);
        });
    });

    it("resolveCurrentUser | isSchoolAdmin without schoolId", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [],
            schoolsList: [],
            schoolName: "Jpref",
            schoolId: 0,
            countryName: "COUNTRY_VN",
        };

        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });

        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    getCustomToken: () => "custom-token",
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: jest.fn(),
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const token =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiZjFkZDU0YTUtYzhjNy00YTI2LWI4YTctOGU0NzRkOGY3MDVjIiwiYXVkIjoibWFuYWJpZS1zdGFnIiwiZXhwIjoxNjMxNTUxMjIwLCJpYXQiOjE2MzE1NTAzMTYsImp0aSI6IjAxRkZGWk03S1hKRDc2RFFZTlFQMlE3QjFNIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6IlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIiwieC1oYXN1cmEtdXNlci1pZCI6ImYxZGQ1NGE1LWM4YzctNGEyNi1iOGE3LThlNDc0ZDhmNzA1YyIsIngtaGFzdXJhLXNjaG9vbC1pZHMiOiJ7LTIxNDc0ODM2NDd9IiwieC1oYXN1cmEtdXNlci1ncm91cCI6IlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIiwieC1oYXN1cmEtcmVzb3VyY2UtcGF0aCI6Ii0yMTQ3NDgzNjQ3In0sIm1hbmFiaWUiOnsiYWxsb3dlZF9yb2xlcyI6WyJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiJdLCJkZWZhdWx0X3JvbGUiOiJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiIsInVzZXJfaWQiOiJmMWRkNTRhNS1jOGM3LTRhMjYtYjhhNy04ZTQ3NGQ4ZjcwNWMiLCJzY2hvb2xfaWRzIjpbIi0yMTQ3NDgzNjQ3Il0sInVzZXJfZ3JvdXAiOiJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiIsInJlc291cmNlX3BhdGgiOiItMjE0NzQ4MzY0NyJ9fQ.pVZ4Jt5ox9YP7Cx0W0dU6wmPfFPiAV12SjgcVWNOn-Gy2JrMCW6HtvuvawLZmPm6ZZSxJEwP3Tqh6TUgZrygUruNUNeP_wcehF9b2WyklwRUg8sIlG_NxB1YSKwuGFdP4QLRVP2xSOqiQlfI59chP9igyhNkpRDv1SJfxRksaeU";

            await expect(authProvider.resolveCurrentUser(token)).rejects.toThrow(
                new AppError("ra.manabie-error.specified.school_not_found")
            );
        });
    });

    it("resolveCurrentUser | isTeacher without schoolId", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_TEACHER",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [],
            schoolsList: [],
            schoolName: "Jpref",
            schoolId: 0,
            countryName: "COUNTRY_VN",
        };

        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });

        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    getCustomToken: () => "custom-token",
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: jest.fn(),
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const token =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiZjFkZDU0YTUtYzhjNy00YTI2LWI4YTctOGU0NzRkOGY3MDVjIiwiYXVkIjoibWFuYWJpZS1zdGFnIiwiZXhwIjoxNjMxNTUxMjIwLCJpYXQiOjE2MzE1NTAzMTYsImp0aSI6IjAxRkZGWk03S1hKRDc2RFFZTlFQMlE3QjFNIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6IlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIiwieC1oYXN1cmEtdXNlci1pZCI6ImYxZGQ1NGE1LWM4YzctNGEyNi1iOGE3LThlNDc0ZDhmNzA1YyIsIngtaGFzdXJhLXNjaG9vbC1pZHMiOiJ7LTIxNDc0ODM2NDd9IiwieC1oYXN1cmEtdXNlci1ncm91cCI6IlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIiwieC1oYXN1cmEtcmVzb3VyY2UtcGF0aCI6Ii0yMTQ3NDgzNjQ3In0sIm1hbmFiaWUiOnsiYWxsb3dlZF9yb2xlcyI6WyJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiJdLCJkZWZhdWx0X3JvbGUiOiJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiIsInVzZXJfaWQiOiJmMWRkNTRhNS1jOGM3LTRhMjYtYjhhNy04ZTQ3NGQ4ZjcwNWMiLCJzY2hvb2xfaWRzIjpbIi0yMTQ3NDgzNjQ3Il0sInVzZXJfZ3JvdXAiOiJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiIsInJlc291cmNlX3BhdGgiOiItMjE0NzQ4MzY0NyJ9fQ.pVZ4Jt5ox9YP7Cx0W0dU6wmPfFPiAV12SjgcVWNOn-Gy2JrMCW6HtvuvawLZmPm6ZZSxJEwP3Tqh6TUgZrygUruNUNeP_wcehF9b2WyklwRUg8sIlG_NxB1YSKwuGFdP4QLRVP2xSOqiQlfI59chP9igyhNkpRDv1SJfxRksaeU";

            await expect(authProvider.resolveCurrentUser(token)).rejects.toThrow(
                new AppError("ra.manabie-error.specified.school_not_found")
            );
        });
    });
    it("resolveCurrentUser | CASL is updated", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [-2147483647],
            schoolsList: [
                {
                    schoolId: -2147483647,
                    schoolName: "Jpref",
                },
            ],
            schoolName: "Jpref",
            schoolId: -2147483647,
            countryName: "COUNTRY_VN",
        };

        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });

        const permissionUpdate = jest.fn();
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    getCustomToken: () => "custom-token",
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: jest.fn(),
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.doMock("src/internals/permission", () => {
            const actual = jest.requireActual("src/internals/permission");
            return {
                ...actual,
                update: permissionUpdate,
            };
        });
        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const token =
                "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiZjFkZDU0YTUtYzhjNy00YTI2LWI4YTctOGU0NzRkOGY3MDVjIiwiYXVkIjoibWFuYWJpZS1zdGFnIiwiZXhwIjoxNjMxNTUxMjIwLCJpYXQiOjE2MzE1NTAzMTYsImp0aSI6IjAxRkZGWk03S1hKRDc2RFFZTlFQMlE3QjFNIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIl0sIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6IlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIiwieC1oYXN1cmEtdXNlci1pZCI6ImYxZGQ1NGE1LWM4YzctNGEyNi1iOGE3LThlNDc0ZDhmNzA1YyIsIngtaGFzdXJhLXNjaG9vbC1pZHMiOiJ7LTIxNDc0ODM2NDd9IiwieC1oYXN1cmEtdXNlci1ncm91cCI6IlVTRVJfR1JPVVBfU0NIT09MX0FETUlOIiwieC1oYXN1cmEtcmVzb3VyY2UtcGF0aCI6Ii0yMTQ3NDgzNjQ3In0sIm1hbmFiaWUiOnsiYWxsb3dlZF9yb2xlcyI6WyJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiJdLCJkZWZhdWx0X3JvbGUiOiJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiIsInVzZXJfaWQiOiJmMWRkNTRhNS1jOGM3LTRhMjYtYjhhNy04ZTQ3NGQ4ZjcwNWMiLCJzY2hvb2xfaWRzIjpbIi0yMTQ3NDgzNjQ3Il0sInVzZXJfZ3JvdXAiOiJVU0VSX0dST1VQX1NDSE9PTF9BRE1JTiIsInJlc291cmNlX3BhdGgiOiItMjE0NzQ4MzY0NyJ9fQ.pVZ4Jt5ox9YP7Cx0W0dU6wmPfFPiAV12SjgcVWNOn-Gy2JrMCW6HtvuvawLZmPm6ZZSxJEwP3Tqh6TUgZrygUruNUNeP_wcehF9b2WyklwRUg8sIlG_NxB1YSKwuGFdP4QLRVP2xSOqiQlfI59chP9igyhNkpRDv1SJfxRksaeU";

            const result = await authProvider.resolveCurrentUser(token);

            expect(result?.token).toEqual(token);
            expect(result?.tokens["manabie"]).toEqual({
                allowed_roles: ["USER_GROUP_SCHOOL_ADMIN"],
                default_role: "USER_GROUP_SCHOOL_ADMIN",
                user_id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
                school_ids: ["-2147483647"],
                user_group: "USER_GROUP_SCHOOL_ADMIN",
                resource_path: "-2147483647",
            });

            expect(result?.profile).toEqual(profile);
            expect(permissionUpdate).toBeCalledWith(profile.userGroup);
        });

        jest.dontMock("src/internals/permission");
    });
});

describe("auth-provider | checkError", () => {
    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
    });
    it("checkError | should resolve with unknown error", () => {
        const authProvider = require("../auth-provider").default;
        const err = new Error("should be unknown");
        return expect(authProvider.checkError(err)).resolves.toEqual(undefined);
    });

    it("OIDC | should call sign out when error is critical and user session is still valid", () => {
        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: () => "custom-token",
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.oidc,
            signOut: jest.fn(),
        };
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });

        jest.isolateModules(() => {
            const authProvider = require("../auth-provider").default;

            const errPermission = new Error("ra.manabie-error.firebase.permission_denied");
            authProvider.checkError(errPermission);
            expect(authManager.getAccessToken).toHaveBeenCalledTimes(1);

            const errJwt = new Error("ra.manabie-error.jwt_invalid");
            authProvider.checkError(errJwt);
            expect(authManager.getAccessToken).toHaveBeenCalledTimes(2);

            const errClaim = new Error("ra.manabie-error.claim_token_invalid");
            authProvider.checkError(errClaim);
            expect(authManager.getAccessToken).toHaveBeenCalledTimes(3);

            const errNotFound = new Error("auth/user-not-found");
            authProvider.checkError(errNotFound);
            expect(authManager.getAccessToken).toHaveBeenCalledTimes(4);

            const errTimeout = new Error("auth/timeout");
            authProvider.checkError(errTimeout);
            expect(authManager.getAccessToken).toHaveBeenCalledTimes(5);
        });
    });
    it("OIDC | user session is not expired, log them out", async () => {
        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: (_: boolean | undefined) => Promise.resolve(""),
            signOut: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: jest.fn(),
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.oidc,
        };

        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const errPermission = new Error("ra.manabie-error.firebase.permission_denied");

            await expect(authProvider.checkError(errPermission)).resolves.toEqual(undefined);
            expect(authManager.signOut).toBeCalled();
        });
    });

    it("Firebase | should reject", async () => {
        reactiveStorage.set("PROFILE", {
            id: "unit-test",
            name: "unit-test@manabie",
            country: 5,
            phoneNumber: "",
            email: "unit-test@manabie",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1653533999, nanos: 0 },
            updatedAt: { seconds: 1653533999, nanos: 0 },
            schoolIdsList: [-2147483639],
            schoolsList: [{ schoolId: 123, schoolName: "Manabie" }],
            schoolName: "Manabie",
            schoolId: 123,
            countryName: "COUNTRY_JP",
        });
        reactiveStorage.set("TOKEN", "Manabie_Token");

        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: () => Promise.resolve(""),
            signOut: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: jest.fn(),
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.firebase,
        };

        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const errPermission = new Error("ra.manabie-error.firebase.permission_denied");

            await expect(authProvider.checkError(errPermission)).rejects.toEqual(undefined);
            expect(authManager.signOut).toBeCalled();
            expect(reactiveStorage.get("PROFILE")).toBeNull();
            expect(reactiveStorage.get("TOKEN")).toBeNull();
        });
    });
});

describe("auth-provider | logOut", () => {
    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
        jest.dontMock("src/internals/reactive-storage");
    });
    it("should call authManager logout & clear localStorage SUCCESS", async () => {
        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: () => "custom-token",
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.firebase,
            signOut: jest.fn(),
        };
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });
        const reactiveStorage = {
            clear: jest.fn(),
        };
        jest.doMock("src/internals/reactive-storage", () => {
            return reactiveStorage;
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const redirectUrl = "fakeUrl";

            await expect(authProvider.logout({ additionalQuery: redirectUrl })).resolves.toEqual(
                undefined
            );
            expect(authManager.signOut).toHaveBeenCalledWith({ additionalQuery: redirectUrl });
            expect(reactiveStorage.clear).toHaveBeenCalledTimes(1);
        });
    });

    it("should rethrow FirebaseError when error occur", async () => {
        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: () => "custom-token",
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.firebase,
            signOut: () => {
                throw new Error("auth/cannot-sign-out");
            },
        };
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });
        const reactiveStorage = {
            clear: jest.fn(),
        };
        jest.doMock("src/internals/reactive-storage", () => {
            return reactiveStorage;
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            await expect(() => authProvider.logout()).rejects.toThrow(
                `ra.auth.auth/cannot-sign-out`
            );
        });
    });
});

describe("auth-provider | checkAuth", () => {
    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
        jest.dontMock("src/services/yasuo/user-service-yasuo");
    });
    it("checkAuth | err Claim token is not valid. Please contact staffs for support!", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [-2147483647],
            schoolsList: [
                {
                    schoolId: -2147483647,
                    schoolName: "Jpref",
                },
            ],
            schoolName: "Jpref",
            schoolId: -2147483647,
            countryName: "COUNTRY_VN",
        };

        const token =
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJhdWQiOiJtYW5hYmllLXN0YWciLCJleHAiOjE2MzE1NTU1ODIsImlhdCI6MTYzMTU1MTk3NywianRpIjoiMDFGRkcxNlk3NjBUVlozMzJOMlA4RU1IMzUiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiVVNFUl9HUk9VUF9QQVJFTlQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJ4LWhhc3VyYS1zY2hvb2wtaWRzIjoie30iLCJ4LWhhc3VyYS11c2VyLWdyb3VwIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS1yZXNvdXJjZS1wYXRoIjoiLTIxNDc0ODM2NDUifSwibWFuYWJpZSI6eyJhbGxvd2VkX3JvbGVzIjpbIlVTRVJfR1JPVVBfUEFSRU5UIl0sImRlZmF1bHRfcm9sZSI6IlVTRVJfR1JPVVBfUEFSRU5UIiwidXNlcl9pZCI6IjAxRjdKR05LRUtUNTkxRUFFQ1IyUDZHWUYwIiwidXNlcl9ncm91cCI6IlVTRVJfR1JPVVBfUEFSRU5UIiwicmVzb3VyY2VfcGF0aCI6Ii0yMTQ3NDgzNjQ1In19.RUgHPMvCkpxkxyw34c0cNpDKPmOH2tDJNRVervE4wrleM_ORnq1rfTAsUlr8BO0TK8RldGxlrVzMHCw7kvSxmiXrechszZkEVmhHWIfD693Q697h1AoKLQ3GxX3ySJUKrS42SDgiXlB_xD2MMxSCZLEoH-NjMSlN-G3lcGlg__I";

        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: () => token,
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.firebase,
            signOut: jest.fn(),
        };
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });

        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const err = new FirebaseError({
                code: "claim_token_invalid",
                message: "Claim token is not valid. Please contact staffs for support!",
            });
            await expect(() => authProvider.checkAuth()).rejects.toThrow(err);
        });
    });
    it("checkAuth | err Account information is incorrect. Please check again or contact Manabie staff", async () => {
        const token =
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJhdWQiOiJtYW5hYmllLXN0YWciLCJleHAiOjE2MzE1NTU1ODIsImlhdCI6MTYzMTU1MTk3NywianRpIjoiMDFGRkcxNlk3NjBUVlozMzJOMlA4RU1IMzUiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiVVNFUl9HUk9VUF9QQVJFTlQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJ4LWhhc3VyYS1zY2hvb2wtaWRzIjoie30iLCJ4LWhhc3VyYS11c2VyLWdyb3VwIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS1yZXNvdXJjZS1wYXRoIjoiLTIxNDc0ODM2NDUifSwibWFuYWJpZSI6eyJhbGxvd2VkX3JvbGVzIjpbIlVTRVJfR1JPVVBfUEFSRU5UIl0sImRlZmF1bHRfcm9sZSI6IlVTRVJfR1JPVVBfUEFSRU5UIiwidXNlcl9pZCI6IjAxRjdKR05LRUtUNTkxRUFFQ1IyUDZHWUYwIiwidXNlcl9ncm91cCI6IlVTRVJfR1JPVVBfUEFSRU5UIiwicmVzb3VyY2VfcGF0aCI6Ii0yMTQ3NDgzNjQ1In19.RUgHPMvCkpxkxyw34c0cNpDKPmOH2tDJNRVervE4wrleM_ORnq1rfTAsUlr8BO0TK8RldGxlrVzMHCw7kvSxmiXrechszZkEVmhHWIfD693Q697h1AoKLQ3GxX3ySJUKrS42SDgiXlB_xD2MMxSCZLEoH-NjMSlN-G3lcGlg__I";

        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: () => token,
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.firebase,
            signOut: jest.fn(),
        };
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });

        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: null }),
            };
        });
        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const err = new AppError("ra.manabie-error.specified.user_not_found");
            await expect(() => authProvider.checkAuth()).rejects.toThrow(err);
        });
    });
    it("checkAuth | err Sorry, you don't have permission", async () => {
        const profile: UserIdentity = {
            id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
            name: "product.test+jprep.staging@manabie.com",
            country: 2,
            phoneNumber: "product.test+jprep.staging@manabie.com",
            email: "product.test+jprep.staging@manabie.com",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_STUDENT",
            createdAt: { seconds: 1613992820, nanos: 0 },
            updatedAt: { seconds: 1613992820, nanos: 0 },
            schoolIdsList: [-2147483647],
            schoolsList: [
                {
                    schoolId: -2147483647,
                    schoolName: "Jpref",
                },
            ],
            schoolName: "Jpref",
            schoolId: -2147483647,
            countryName: "COUNTRY_VN",
        };

        const token =
            "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQyNGYwZjQ1ZTdhM2Y5YmVkMTA2MThmMDA2ZWExYzAwM2FhNmFlNzMifQ.eyJpc3MiOiJtYW5hYmllIiwic3ViIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJhdWQiOiJtYW5hYmllLXN0YWciLCJleHAiOjE2MzE1NTU1ODIsImlhdCI6MTYzMTU1MTk3NywianRpIjoiMDFGRkcxNlk3NjBUVlozMzJOMlA4RU1IMzUiLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiVVNFUl9HUk9VUF9QQVJFTlQiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS11c2VyLWlkIjoiMDFGN0pHTktFS1Q1OTFFQUVDUjJQNkdZRjAiLCJ4LWhhc3VyYS1zY2hvb2wtaWRzIjoie30iLCJ4LWhhc3VyYS11c2VyLWdyb3VwIjoiVVNFUl9HUk9VUF9QQVJFTlQiLCJ4LWhhc3VyYS1yZXNvdXJjZS1wYXRoIjoiLTIxNDc0ODM2NDUifSwibWFuYWJpZSI6eyJhbGxvd2VkX3JvbGVzIjpbIlVTRVJfR1JPVVBfUEFSRU5UIl0sImRlZmF1bHRfcm9sZSI6IlVTRVJfR1JPVVBfUEFSRU5UIiwidXNlcl9pZCI6IjAxRjdKR05LRUtUNTkxRUFFQ1IyUDZHWUYwIiwidXNlcl9ncm91cCI6IlVTRVJfR1JPVVBfUEFSRU5UIiwicmVzb3VyY2VfcGF0aCI6Ii0yMTQ3NDgzNjQ1In19.RUgHPMvCkpxkxyw34c0cNpDKPmOH2tDJNRVervE4wrleM_ORnq1rfTAsUlr8BO0TK8RldGxlrVzMHCw7kvSxmiXrechszZkEVmhHWIfD693Q697h1AoKLQ3GxX3ySJUKrS42SDgiXlB_xD2MMxSCZLEoH-NjMSlN-G3lcGlg__I";

        const authManager: Partial<AbstractAuthWithSupports<any>> = {
            getAccessToken: jest.fn(),
            getInstance: jest.fn(),
            exchangeToken: jest.fn(),
            getCustomToken: () => token,
            isAuthenticated: () => Promise.resolve(true),
            signIn: jest.fn(),
            getType: () => ProviderTypes.firebase,
            signOut: jest.fn(),
        };
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: authManager,
            };
        });
        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({
                    data: profile,
                }),
            };
        });
        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const err = new FirebaseError({
                code: "permission-denied",
                message: "Sorry, you don't have permission",
            });
            await expect(() => authProvider.checkAuth()).rejects.toThrow(err);
        });
    });
});

describe("auth-provider | isErrorRelatedToPermission ", () => {
    const cases: { error: Error; isCriticalError: boolean }[] = [
        {
            error: new FirebaseError({
                code: "permission-denied",
                message: "Sorry, you don't have permission",
            }),
            isCriticalError: true,
        },
        {
            error: new FirebaseError({
                code: "claim_token_invalid",
                message: "Claim token is not valid. Please contact staffs for support!",
            }),
            isCriticalError: true,
        },
        {
            error: new Error(errorCodesMap.PERMISSION_DENIED),
            isCriticalError: true,
        },
        {
            error: new Error(errorCodesMap.INVALID_JWT),
            isCriticalError: true,
        },
        {
            error: new Error("auth/credential-expired"),
            isCriticalError: true,
        },
        {
            error: new Error("ra.auth.auth/unauthorized"),
            isCriticalError: true,
        },
        {
            error: new Error(errorCodesMap.CONNECTION),
            isCriticalError: false,
        },
    ];

    const authProvider = require("../auth-provider").default;

    it.concurrent.each(cases)(
        "%p",
        async ({ error, isCriticalError }: { error: Error; isCriticalError: boolean }) => {
            expect(authProvider.isErrorRelatedToPermission(error)).toEqual(isCriticalError);
        }
    );
});

describe("auth-provider | validationUserGroupOfUserLogin", () => {
    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
        jest.dontMock("src/services/yasuo/user-service-yasuo");
    });

    beforeEach(() => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    getCustomToken: () => "custom-token",
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: jest.fn(),
                    getType: () => ProviderTypes.firebase,
                },
            };
        });

        jest.doMock("src/internals/feature-controller", () => {
            return {
                __esModule: true,
                default: {
                    isFeatureEnabled: (featureName: Features) => {
                        return (
                            featureName === Features.STAFF_MANAGEMENT_USER_GROUP_LOGIN_VALIDATION
                        );
                    },
                },
            };
        });
    });

    it("validationUserGroupOfUserLogin | allow user login", async () => {
        jest.doMock("src/squads/user/service/usermgmt/user-group-service-user-mgmt", () => {
            return {
                validateUserLogin: () => ({ allowable: true }),
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            await expect(authProvider.validationUserGroupOfUserLogin()).resolves.toEqual(undefined);
        });
    });

    it("validationUserGroupOfUserLogin | err Sorry, you don't have permission", async () => {
        jest.doMock("src/squads/user/service/usermgmt/user-group-service-user-mgmt", () => {
            return {
                validateUserLogin: () => ({ allowable: false }),
            };
        });

        jest.isolateModules(async () => {
            const authProvider = require("../auth-provider").default;

            const err = new FirebaseError({
                code: "permission-denied",
                message: "Sorry, you don't have permission",
            });

            await expect(authProvider.validationUserGroupOfUserLogin()).rejects.toThrow(err);
        });
    });
});

describe("auth-provider | checkClaimToken", () => {
    const errJWTInvalid = new FirebaseError({
        code: "claim_token_invalid",
        message: "Claim token is not valid. Please contact staffs for support!",
    });

    const profile: UserIdentity = {
        id: "f1dd54a5-c8c7-4a26-b8a7-8e474d8f705c",
        name: "product.test+jprep.staging@manabie.com",
        country: 2,
        phoneNumber: "product.test+jprep.staging@manabie.com",
        email: "product.test+jprep.staging@manabie.com",
        avatar: "",
        deviceToken: "",
        userGroup: "USER_GROUP_SCHOOL_ADMIN",
        createdAt: { seconds: 1613992820, nanos: 0 },
        updatedAt: { seconds: 1613992820, nanos: 0 },
        schoolIdsList: [-2147483647],
        schoolsList: [
            {
                schoolId: -2147483647,
                schoolName: "Jpref",
            },
        ],
        schoolName: "Jpref",
        schoolId: -2147483647,
        countryName: "COUNTRY_VN",
    };

    afterEach(() => {
        jest.dontMock("src/internals/auth-manager");
        jest.dontMock("src/services/yasuo/user-service-yasuo");
    });

    beforeEach(() => {
        jest.doMock("src/internals/auth-manager", () => {
            return {
                __esModule: true,
                default: {
                    getAccessToken: jest.fn(),
                    getInstance: jest.fn(),
                    exchangeToken: jest.fn(),
                    getCustomToken: () => "custom-token",
                    isAuthenticated: () => Promise.resolve(true),
                    signIn: jest.fn(),
                    getType: () => ProviderTypes.firebase,
                },
            };
        });
    });

    it("call checkClaimToken without args", () => {
        jest.isolateModules(() => {
            const authProvider = require("../auth-provider").default;
            expect(() => authProvider.checkClaimToken()).toThrowError(errJWTInvalid);
        });
    });

    it("should throw an error when token missing x-hasura-user-id", () => {
        const token: UserTokenPayload = {
            iss: "manabie",
            sub: "01F7JGNKEKT591EAECR2P6GYF0",
            aud: "manabie-stag",
            exp: 1631555582,
            iat: 1631551977,
            "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["USER_GROUP_PARENT"],
                "x-hasura-default-role": "USER_GROUP_PARENT",
                "x-hasura-school-ids": "{}",
            },
            auth_time: 0,
            user_id: "",
            email: "",
            email_verified: false,
        };

        jest.isolateModules(() => {
            const authProvider = require("../auth-provider").default;
            expect(() => authProvider.checkClaimToken(token)).toThrowError(errJWTInvalid);
        });
    });

    it("should throw an error when token x-hasura-default-role mismatch", () => {
        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });
        const token: UserTokenPayload = {
            iss: "manabie",
            sub: "01F7JGNKEKT591EAECR2P6GYF0",
            aud: "manabie-stag",
            exp: 1631555582,
            iat: 1631551977,
            "https://hasura.io/jwt/claims": {
                "x-hasura-default-role": "USER_GROUP_PARENT",
                "x-hasura-user-id": "01F7JGNKEKT591EAECR2P6GYF0",
                "x-hasura-school-ids": "{}",
            },
            auth_time: 0,
            user_id: "",
            email: "",
            email_verified: false,
        };

        jest.isolateModules(() => {
            const authProvider = require("../auth-provider").default;
            expect(() => authProvider.checkClaimToken(token, profile)).toThrowError(errJWTInvalid);
        });
    });

    it("should throw an error when token x-hasura-school-ids mismatch", () => {
        jest.doMock("src/services/yasuo/user-service-yasuo", () => {
            return {
                getBasicUserProfile: () => ({ data: profile }),
            };
        });
        const token: UserTokenPayload = {
            iss: "manabie",
            sub: "01F7JGNKEKT591EAECR2P6GYF0",
            aud: "manabie-stag",
            exp: 1631555582,
            iat: 1631551977,
            "https://hasura.io/jwt/claims": {
                "x-hasura-default-role": "USER_GROUP_PARENT",
                "x-hasura-user-id": "01F7JGNKEKT591EAECR2P6GYF0",
                "x-hasura-school-ids": "{-2147483648}",
            },
            auth_time: 0,
            user_id: "",
            email: "",
            email_verified: false,
        };

        jest.isolateModules(() => {
            const authProvider = require("../auth-provider").default;
            expect(() => authProvider.checkClaimToken(token, profile)).toThrowError(errJWTInvalid);
        });
    });
});
