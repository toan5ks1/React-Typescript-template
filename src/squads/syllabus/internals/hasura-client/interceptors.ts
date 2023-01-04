import { AxiosInstance, AxiosRequestConfig } from "axios";
import { HasuraErrorCode } from "src/common/constants/enum";
import authManager from "src/internals/auth-manager";
import reactiveStorage from "src/squads/syllabus/internals/reactive-storage";

import { HasuraError } from "./errors";

export interface HasuraErrorReturn {
    message: string;
    extensions: {
        path: string;
        code: string;
    };
}

declare module "axios" {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

export function isTokenExpiredError(errors: HasuraErrorReturn[]) {
    return (
        Array.isArray(errors) &&
        errors.some((error) => error.extensions?.code === HasuraErrorCode.INVALID_JWT)
    );
}

// keep it async to be consistent with grpc
async function appendAuthHeader(config: AxiosRequestConfig) {
    if (!config.headers) {
        config.headers = {};
    }

    config.headers.Authorization = `Bearer ${await authManager.getCustomToken()}`;
}

export function injectRefreshTokenInterceptor(ins: AxiosInstance) {
    ins.interceptors.response.use(
        async (response) => {
            if (!isTokenExpiredError(response.data?.errors) || response.config._retry) {
                return response;
            }

            const isStillAuthenticated = await authManager.isAuthenticated(true);

            if (!isStillAuthenticated) {
                throw new HasuraError({
                    message: HasuraErrorCode.INVALID_JWT,
                    code: HasuraErrorCode.INVALID_JWT,
                });
            }

            await appendAuthHeader(response.config);

            response.config._retry = true;
            return ins(response.config);
        },
        (error) => {
            throw error;
        }
    );
}

export function injectMetadataInterceptor(ins: AxiosInstance) {
    ins.interceptors.request.use(
        async (config) => {
            const user = reactiveStorage.get("PROFILE");
            window.warner?.log("[Hasura request]", config.data);

            if (user) {
                await appendAuthHeader(config);
            }

            if (!config.headers) {
                config.headers = {};
            }

            config.headers["Content-Type"] = "application/json";

            return config;
        },
        (error) => {
            throw error;
        }
    );
}

export function doesDataHasErrors(data: any) {
    return "error" in data || "code" in data || "errors" in data;
}

export function injectCatchResponseInterceptor(ins: AxiosInstance) {
    ins.interceptors.response.use(
        async (response) => {
            const { data } = response;
            window.warner?.log("[Hasura response]", data);

            if (!doesDataHasErrors(data)) {
                return response;
            }

            if (!data.errors) {
                return Promise.reject(data.message);
            }

            const [mainError] = data.errors;
            let { message, extensions } = mainError;

            if (message.includes("Could not verify JWT")) {
                extensions.code = HasuraErrorCode.INVALID_JWT;
            }

            if (message.includes("query is not allowed")) {
                extensions.code = HasuraErrorCode.VALIDATION_FAILED;
            }

            throw new HasuraError({ code: extensions.code, message: message });
        },
        (error) => {
            throw error;
        }
    );
}
