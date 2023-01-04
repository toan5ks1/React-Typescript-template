import { catchNetworkErrorResponseInterceptor } from "src/internals/interceptors";

import { createHttpClient, HttpClientAdapter } from "@manabie-com/http-client";

const createClient = (timeout: number) => {
    return createHttpClient(
        {
            timeout,
            timeoutErrorMessage: "ra.manabie-error.query_timeout_exceeded",
            transitional: {
                clarifyTimeoutError: true,
            },
        },
        {
            interceptors: [catchNetworkErrorResponseInterceptor],
        }
    );
};

const axios = new HttpClientAdapter(createClient(15000));
export const axiosUpload = new HttpClientAdapter(createClient(0));

export default axios;
