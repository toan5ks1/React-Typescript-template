import axios from "axios";

import { catchNetworkErrorResponseInterceptor } from "../interceptors";

let onRejected: (error: any) => any;

jest.mock("axios", () => {
    return {
        interceptors: {
            response: {
                use: jest.fn((_onSuccess, onError) => {
                    onRejected = onError;
                }),
            },
        },
        isAxiosError: () => {
            return true;
        },
    };
});

describe("Interceptors", () => {
    describe("catchNetworkErrorResponseInterceptor", () => {
        catchNetworkErrorResponseInterceptor(axios);

        it("should throw translation key when network error occurs", async () => {
            const error = {
                message: "Network Error",
                config: {
                    data: "Query",
                },
            };

            await expect(async () => {
                await onRejected(error);
            }).rejects.toMatchObject({
                message: "resources.common.youAreOffline",
                name: "NetworkError",
            });
        });

        it("should throw error message when error occurs", async () => {
            const error = new Error("Error Message");

            await expect(async () => {
                await onRejected(error);
            }).rejects.toMatchObject({
                message: "Error Message",
                name: "Error",
            });
        });
    });
});
