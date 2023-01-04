import { Request, UnaryInterceptor, StatusCode, UnaryResponse } from "grpc-web";
import { handleUnknownError } from "src/common/utils/error";

import authManager from "../auth-manager";
import { GrpcError } from "./errors";

type Invoker = {
    (...args: any): Promise<UnaryResponseWithToObject>;
    _retry?: boolean;
};

type ToObject = {
    toObject?: () => any;
};

type RequestWithToObject = Request<ToObject, any>;

type UnaryResponseWithToObject = UnaryResponse<RequestWithToObject, ToObject>;

export const METADATA = {
    KEY_TOKEN: import.meta.env.VITE_KEY_TOKEN || "token",
    KEY_PKG: import.meta.env.VITE_KEY_PKG || "pkg",
    KEY_VERSION: import.meta.env.VITE_KEY_VERSION || "version",
    VALUE_PKG: import.meta.env.VITE_VALUE_PKG || "com.manabie.liz",
    VALUE_VERSION: import.meta.env.VITE_VALUE_VERSION || "1.0.0",
};

export async function getMetadata(token = "") {
    return {
        [METADATA.KEY_TOKEN]: token || authManager.getCustomToken(),
        [METADATA.KEY_PKG]: METADATA.VALUE_PKG,
        [METADATA.KEY_VERSION]: METADATA.VALUE_VERSION,
    };
}

declare module "grpc-web" {
    export interface Request<REQ, RESP> {
        _retry?: boolean;
    }
}

function formatRequestName(reqName?: string) {
    if (!reqName) {
        return "Unknown method";
    }

    const split = reqName.split(".");

    if (split.length > 0) {
        return split.pop();
    }

    return reqName;
}

export class LoggingInterceptor implements UnaryInterceptor<any, any> {
    async intercept(request: Request<any, any>, invoker: any) {
        // @ts-expect-error We try to get the request message destination for easier debug
        const requestImplicitName = request.getMethodDescriptor()?.name;
        const formattedName = formatRequestName(requestImplicitName);

        try {
            window.warner?.log(
                `[${formattedName}]`,
                "req",
                request.getRequestMessage?.().toObject?.()
            );

            const resp = await invoker(request);

            window.warner?.log(
                `[${formattedName}]`,
                "resp",
                resp.getResponseMessage?.().toObject?.()
            );

            return resp;
        } catch (err: unknown) {
            const error = handleUnknownError(err);
            let message: string = error.message;
            if (err instanceof GrpcError) {
                message = `code: ${err.code}, message: ${err.originMessage}`;
            }

            // request may contain confidential information, so we only report endpoint + err
            window.warner?.warn(`[Endpoint: ${requestImplicitName}]`, message, error?.stack);
            window.warner?.log(
                `[Endpoint: ${requestImplicitName}]`,
                err,
                request.getMetadata(),
                request.getRequestMessage?.().toObject?.()
            );

            throw err;
        }
    }
}

export class MetadataInterceptor implements UnaryInterceptor<any, any> {
    async _appendMetadata(request: RequestWithToObject, forceOverrides: string[] = []) {
        let metadata = request.getMetadata();
        const interceptMetadata = await getMetadata();

        //only add keys that not exist in metadata or in forceOverrides list
        Object.keys(interceptMetadata).forEach((key) => {
            const metadataProp = interceptMetadata[key];

            const shouldOverride = forceOverrides.includes(key);
            const shouldAssign = metadataProp && (!metadata[key] || shouldOverride);

            if (shouldAssign) {
                metadata[key] = metadataProp!;
            }
        });
    }

    async intercept(request: RequestWithToObject, invoker: Invoker) {
        await this._appendMetadata(request);

        // After the RPC returns successfully, update the response.
        try {
            return await invoker(request);
        } catch (e: any) {
            if (e.code !== StatusCode.UNAUTHENTICATED || invoker._retry) {
                throw new GrpcError(e);
            }

            const isStillAuthenticated = await authManager.isAuthenticated(true);

            if (!isStillAuthenticated) {
                throw new GrpcError(e);
            }

            //after refresh token, we intercept the request to update the metadata
            await this._appendMetadata(request, [METADATA.KEY_TOKEN]);

            invoker._retry = true;
            return invoker(request);
        }
    }
}
