import { ErrorInfo } from "react";

import { safeStringify } from "src/common/utils/other";

export class AppError extends Error {
    name: string = "AppError";
    originMessage?: string;

    static isAppError(err: Error) {
        return err instanceof AppError;
    }

    constructor(message: string) {
        super(message);
    }
}

export interface IErrorBoundary {
    error: Omit<AppError, "appError"> | Error | null;
    errorInfo: ErrorInfo | null;
}

interface NetworkErrorToStringFormat {
    errorName: string;
    errorDetail: string;
}

interface NetworkErrorOptions {
    message?: string;
    errorDetail?: string;
}
export class NetworkError extends Error {
    name: string = "NetworkError";
    errorDetail: any;
    originMessage?: string;

    static isNetworkError(error: Error) {
        return error instanceof NetworkError;
    }

    constructor({ message, errorDetail }: NetworkErrorOptions = {}) {
        super("resources.common.youAreOffline");
        this.originMessage = message;
        this.errorDetail = errorDetail;

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toString() {
        const formatted: NetworkErrorToStringFormat = {
            errorName: this.name,
            errorDetail: this.errorDetail,
        };
        return safeStringify(formatted, 2);
    }
}
