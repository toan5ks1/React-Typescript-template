import { ErrorInfo } from "react";

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
