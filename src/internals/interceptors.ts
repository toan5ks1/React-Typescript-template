import axios, { AxiosInstance } from "axios";

import { NetworkError } from "./errors";

export function catchNetworkErrorResponseInterceptor(ins: AxiosInstance) {
    ins.interceptors.response.use(
        async (response) => {
            return response;
        },
        (error) => {
            if (axios.isAxiosError(error) && error.message === "Network Error") {
                throw new NetworkError({ errorDetail: error.config.data });
            }
            throw error;
        }
    );
}
