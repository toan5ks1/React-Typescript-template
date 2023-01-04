import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { HasuraErrorCode } from "src/common/constants/enum";
import authManager from "src/internals/auth-manager";
import { HasuraError } from "src/squads/adobo/domains/entry-exit/internals/hasura-client/errors";
import {
    injectCatchResponseInterceptor,
    injectRefreshTokenInterceptor,
    injectMetadataInterceptor,
} from "src/squads/adobo/domains/entry-exit/internals/hasura-client/interceptors";
import reactiveStorage from "src/squads/adobo/domains/entry-exit/internals/reactive-storage";

let onResolvedResponseInCatchResponseInterceptor: (res: AxiosResponse) => AxiosResponse;

let onRejectedResponseInCatchResponseInterceptor: (error: any) => any;

let onResolvedResponseInRefreshTokenInterceptor: (res: AxiosResponse) => AxiosResponse;

let onRejectedResponseInRefreshTokenInterceptor: (error: any) => any;

let onResolvedRequestInMetadataInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig;

let onRejectedRequestInMetadataInterceptor: (error: any) => any;

const fakeAxiosWithConfig = (config: AxiosRequestConfig) => {
    // this function only return the object with config to fake create axios instance with config
    return {
        config,
    };
};

const fakeAxiosResponse = (response: Partial<AxiosResponse>) => {
    return {
        data: response.data || {},
        config: response.config || {},
        headers: response.headers || {},
        status: response.status || 200,
        statusText: response.statusText || "",
    };
};

const fakeAxiosForCatchResponseInterceptor = {
    interceptors: {
        response: {
            use: jest.fn((onSuccess, onError) => {
                onResolvedResponseInCatchResponseInterceptor = onSuccess;
                onRejectedResponseInCatchResponseInterceptor = onError;
            }),
        },
    },
} as unknown as AxiosInstance;

const fakeAxiosForMetadataInterceptor = {
    interceptors: {
        request: {
            use: jest.fn((onSuccess, onError) => {
                onResolvedRequestInMetadataInterceptor = onSuccess;
                onRejectedRequestInMetadataInterceptor = onError;
            }),
        },
    },
} as unknown as AxiosInstance;

// fake axios like this because I want to fake axios instance with constructor function
const fakeAxiosForRefreshTokenInterceptor = (config?: AxiosRequestConfig) => {
    return config ? fakeAxiosWithConfig(config) : {};
};
fakeAxiosForRefreshTokenInterceptor.interceptors = {
    response: {
        use: jest.fn((onSuccess, onError) => {
            onResolvedResponseInRefreshTokenInterceptor = onSuccess;
            onRejectedResponseInRefreshTokenInterceptor = onError;
        }),
    },
};

jest.mock("src/internals/auth-manager", () => {
    return {
        getCustomToken: jest.fn(),
        isAuthenticated: jest.fn(),
    };
});

jest.mock("src/squads/adobo/domains/entry-exit/internals/reactive-storage", () => {
    return {
        get: jest.fn(),
    };
});

describe("Interceptors", () => {
    describe("injectRefreshTokenInterceptor", () => {
        injectRefreshTokenInterceptor(
            fakeAxiosForRefreshTokenInterceptor as unknown as AxiosInstance
        );

        it("injectRefreshTokenInterceptor response success", async () => {
            const response = fakeAxiosResponse({
                data: {
                    message: "get data success",
                },
            });

            await expect(onResolvedResponseInRefreshTokenInterceptor(response)).resolves.toEqual(
                response
            );
        });
        it("injectRefreshTokenInterceptor throw error", async () => {
            const error = {
                message: "Error",
            };

            await expect(async () => {
                await onRejectedResponseInRefreshTokenInterceptor(error);
            }).rejects.toMatchObject(error);
        });

        it("injectRefreshTokenInterceptor response invalid jwt with retry", async () => {
            const errorObject = {
                extensions: {
                    path: "$",
                    code: HasuraErrorCode.INVALID_JWT,
                },
                message: "Could not verify JWT",
            };
            const response = fakeAxiosResponse({
                data: {
                    errors: [errorObject],
                    message: "get data error",
                },
                config: {
                    _retry: true,
                },
            });

            await expect(onResolvedResponseInRefreshTokenInterceptor(response)).resolves.toEqual(
                response
            );
        });

        it("injectRefreshTokenInterceptor response invalid jwt without retry when not authenticated", async () => {
            const errorObject = {
                extensions: {
                    path: "$",
                    code: HasuraErrorCode.INVALID_JWT,
                },
                message: "Could not verify JWT",
            };
            const response = fakeAxiosResponse({
                data: {
                    errors: [errorObject],
                    message: "get data error",
                },
                config: {
                    _retry: false,
                },
            });

            (authManager.isAuthenticated as jest.Mock).mockImplementation(() => {
                return false;
            });

            await expect(async () => {
                await onResolvedResponseInRefreshTokenInterceptor(response);
            }).rejects.toEqual(
                new HasuraError({ code: errorObject.extensions.code, message: errorObject.message })
            );
        });

        it("injectRefreshTokenInterceptor response invalid jwt without retry when still authenticated", async () => {
            const errorObject = {
                extensions: {
                    path: "$",
                    code: HasuraErrorCode.INVALID_JWT,
                },
                message: "Could not verify JWT",
            };
            const response = fakeAxiosResponse({
                data: {
                    errors: [errorObject],
                    message: "get data error",
                },
                config: {
                    _retry: false,
                },
            });

            (authManager.isAuthenticated as jest.Mock).mockImplementation(() => {
                return true;
            });

            await expect(onResolvedResponseInRefreshTokenInterceptor(response)).resolves.toEqual(
                fakeAxiosWithConfig(response.config)
            );
        });
    });

    describe("injectMetadataInterceptor", () => {
        injectMetadataInterceptor(fakeAxiosForMetadataInterceptor);

        it("injectMetadataInterceptor error", async () => {
            const error = {
                message: "Error",
            };

            await expect(async () => {
                await onRejectedRequestInMetadataInterceptor(error);
            }).rejects.toMatchObject(error);
        });

        it("injectMetadataInterceptor response success", async () => {
            (reactiveStorage.get as jest.Mock).mockImplementation(() => {
                // only fake user data
                return {
                    id: "01",
                };
            });
            const config: AxiosRequestConfig = {
                url: "/fake",
                _retry: true,
            };

            await expect(onResolvedRequestInMetadataInterceptor(config)).resolves.toEqual(config);
        });
    });

    describe("injectCatchResponseInterceptor", () => {
        injectCatchResponseInterceptor(fakeAxiosForCatchResponseInterceptor);

        it("injectCatchResponseInterceptor response success", async () => {
            const response = fakeAxiosResponse({
                data: {
                    message: "get data success",
                },
            });

            await expect(onResolvedResponseInCatchResponseInterceptor(response)).resolves.toEqual(
                response
            );
        });

        it("injectCatchResponseInterceptor throw error", async () => {
            const error = {
                message: "Error",
            };

            await expect(async () => {
                await onRejectedResponseInCatchResponseInterceptor(error);
            }).rejects.toMatchObject(error);
        });

        it("injectCatchResponseInterceptor throw hasura error when query is not allowed", async () => {
            const errorObject = {
                extensions: {
                    path: "$",
                    code: HasuraErrorCode.VALIDATION_FAILED,
                },
                message: "query is not allowed",
            };

            const response = fakeAxiosResponse({
                data: {
                    errors: [errorObject],
                },
            });

            await expect(async () => {
                await onResolvedResponseInCatchResponseInterceptor(response);
            }).rejects.toEqual(
                new HasuraError({ code: errorObject.extensions.code, message: errorObject.message })
            );
        });

        it("injectCatchResponseInterceptor throw hasura error when could not verify JWT", async () => {
            const errorObject = {
                extensions: {
                    path: "$",
                    code: HasuraErrorCode.INVALID_JWT,
                },
                message: "Could not verify JWT",
            };

            const response = fakeAxiosResponse({
                data: {
                    errors: [errorObject],
                },
            });

            await expect(async () => {
                await onResolvedResponseInCatchResponseInterceptor(response);
            }).rejects.toEqual(
                new HasuraError({ code: errorObject.extensions.code, message: errorObject.message })
            );
        });

        it("injectCatchResponseInterceptor when response error code", async () => {
            const response = fakeAxiosResponse({
                data: {
                    code: "400",
                    message: "query is not allowed",
                },
            });

            await expect(async () => {
                await onResolvedResponseInCatchResponseInterceptor(response);
            }).rejects.toEqual(response.data.message);
        });
    });
});
