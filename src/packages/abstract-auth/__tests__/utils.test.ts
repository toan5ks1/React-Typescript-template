import { mergeSearchSideEffect, decodeJWTToken, isTokenValid } from "../utils";

describe("mergeSearchSideEffect", () => {
    it("should merge in 2nd param into the 1st param", () => {
        const first = new URLSearchParams("?foo=foo&bar=bar");
        const second = new URLSearchParams("?bar=baz&nii=niiVal");

        mergeSearchSideEffect(first, second);

        expect(first.getAll("bar")).toEqual(["bar", "baz"]);
        expect(first.get("foo")).toEqual("foo");
        expect(first.get("nii")).toEqual("niiVal");
    });
});

describe("decodeJWTToken", () => {
    const validToken =
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUzNmRhZWFiZjhkZDY1ZDRkZTIxZTgyNGI4OTlhMWYzZGEyZjg5NTgiLCJ0eXAiOiJKV1QifQ.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiVVNFUl9HUk9VUF9TQ0hPT0xfQURNSU4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiVVNFUl9HUk9VUF9TQ0hPT0xfQURNSU4iLCJ4LWhhc3VyYS1zY2hvb2wtaWQiOiIxNjA5MSIsIngtaGFzdXJhLXVzZXItaWQiOiJwT2ZVU2VLVTFUUDFqU2U1QmM5NkpTdklLT1YyIn0sImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zdGFnaW5nLW1hbmFiaWUtb25saW5lIiwiYXVkIjoic3RhZ2luZy1tYW5hYmllLW9ubGluZSIsImF1dGhfdGltZSI6MTYyMTQyMDAyOCwidXNlcl9pZCI6InBPZlVTZUtVMVRQMWpTZTVCYzk2SlN2SUtPVjIiLCJzdWIiOiJwT2ZVU2VLVTFUUDFqU2U1QmM5NkpTdklLT1YyIiwiaWF0IjoxNjIxNDIwMDI5LCJleHAiOjE2MjE0MjM2MjksImVtYWlsIjoidGh1LnZvK3NjaG9vbEBtYW5hYmllLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRodS52bytzY2hvb2xAbWFuYWJpZS5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.QJyznE1hdAzX-rhUf-b6UVvekC-MpHCTPYzlJTh2x_UKeZRaei2i0b081c6uEb3lUkIjlfYUqHRXxVnNXstRPV7nlDkb24CbPwu596CIAiQy2x8dKR6N_Nz4CsZOtPStVg_en4kHdNvCWFIn0jIicl2D4fG7Yr5yUFZFM4bM1yRWaqdUPLbjARL0jkkkMkAo4GwV3UQl72dB40JUAM-o1h789rotfKVyRyoEwvF7o_ETmXKUqO5cLyirCKZs1yHUDl0fXVJfN1ZVeDfAuj1vbc82Rk8QP67f_H9WiDVyKTfZi8326r9Cu5r3yF44SfKyNqW9mDA4MDEbQKwgctjXaQ";

    const invalidToken = "invalid";

    it("should decode the token correctly", () => {
        expect(decodeJWTToken(validToken)).toEqual(
            expect.objectContaining({
                "https://hasura.io/jwt/claims": {
                    "x-hasura-allowed-roles": ["USER_GROUP_SCHOOL_ADMIN"],
                    "x-hasura-default-role": "USER_GROUP_SCHOOL_ADMIN",
                    "x-hasura-school-id": "16091",
                    "x-hasura-user-id": "pOfUSeKU1TP1jSe5Bc96JSvIKOV2",
                },
                iss: "https://securetoken.google.com/staging-manabie-online",
                aud: "staging-manabie-online",
                auth_time: 1621420028,
                user_id: "pOfUSeKU1TP1jSe5Bc96JSvIKOV2",
                sub: "pOfUSeKU1TP1jSe5Bc96JSvIKOV2",
                iat: 1621420029,
                exp: 1621423629,
                email: "thu.vo+school@manabie.com",
                email_verified: true,
                firebase: {
                    identities: {
                        email: ["thu.vo+school@manabie.com"],
                    },
                    sign_in_provider: "password",
                },
            })
        );
    });

    it("should NOT throw and return 'null' when token is not valid", () => {
        expect(() => {
            decodeJWTToken(invalidToken);
        }).not.toThrow();
        expect(decodeJWTToken(invalidToken)).toEqual(null);
    });
});

describe(isTokenValid.name, () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it("should return FALSE when pass invalid token", () => {
        expect(isTokenValid("")).toEqual(false);
        expect(isTokenValid(null)).toEqual(false);
        expect(isTokenValid(undefined)).toEqual(false);
    });

    it("should return FALSE when we cant decode the token", () => {
        const fakeInvalidToken = "abc";
        expect(isTokenValid(fakeInvalidToken)).toEqual(false);
    });

    it("should return FALSE if token expired in less 10 seconds", () => {
        const alreadyExpiredToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0MzU2NDcxNjEsImV4cCI6MTQzNTY0NzE2MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoidGVzdCJ9.TW8SqdmOV89RHS0iaBL2LOYQbIrzLduNy_OHkQmD8FY";
        expect(isTokenValid(alreadyExpiredToken)).toEqual(false);
    });
});
