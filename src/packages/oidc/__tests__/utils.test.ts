import { getRedirectUri } from "../utils";

describe("getRedirectUri", () => {
    it("should return empty when default redirect uri not exist", () => {
        expect(getRedirectUri()).toEqual("");
    });

    it("should return default redirect uri when additional query is not passed", () => {
        const defaultUrl = "https://hello.com";
        expect(getRedirectUri(defaultUrl)).toEqual(defaultUrl);
    });

    it("should merge addition queries into the default uri", () => {
        const defaultUrl = "https://hello.com?bar=bar&hello=1";
        const additionQuery = "?bar=foo&no=no";

        expect(getRedirectUri(defaultUrl, additionQuery)).toEqual(
            "https://hello.com/?bar=bar&hello=1&bar=foo&no=no"
        );
    });
});
