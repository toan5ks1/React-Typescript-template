import { safeStringify } from "src/common/utils/other";
import { AppError, NetworkError } from "src/internals/errors";

describe("AppError", () => {
    it("can check if an error is a AppError", () => {
        const err = new AppError("test");

        expect(AppError.isAppError(err)).toEqual(true);
    });
});

describe("NetworkError", () => {
    it("can check if an error is NetworkError", () => {
        const networkError = new NetworkError({
            errorDetail: "Query",
        });

        expect(NetworkError.isNetworkError(networkError)).toEqual(true);
        expect(networkError.message).toEqual("resources.common.youAreOffline");

        const expectedToString = safeStringify(
            {
                errorName: "NetworkError",
                errorDetail: "Query",
            },
            2
        );
        expect(networkError.toString()).toEqual(expectedToString);
    });
});
