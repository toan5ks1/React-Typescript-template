import { catchNetworkErrorResponseInterceptor } from "src/internals/interceptors";
import warner from "src/internals/warner";

import {
    injectCatchResponseInterceptor,
    injectMetadataInterceptor,
    injectRefreshTokenInterceptor,
} from "./interceptors";

import GraphqlClient from "@manabie-com/graphql-client";
import { createHttpClient } from "@manabie-com/http-client";

// create a new http client, dont mutate other instances
export const httpClient = createHttpClient(
    {
        timeout: 15000,
        timeoutErrorMessage: "ra.manabie-error.query_timeout_exceeded",
        transitional: {
            clarifyTimeoutError: true,
        },
    },
    {
        interceptors: [
            injectMetadataInterceptor,
            injectRefreshTokenInterceptor,
            injectCatchResponseInterceptor,
            catchNetworkErrorResponseInterceptor,
        ],
    }
);

const graphqlClient = new GraphqlClient(httpClient, {
    defaultHeaders: { "Content-Type": "application/json" },
    logger: warner,
});

export default graphqlClient;
