import { queryClient } from "src/internals/query-client";
import warn from "src/internals/warner";
import StandaloneQueryClient from "src/packages/standalone-query-client";

const standaloneQueryClient = new StandaloneQueryClient(queryClient, {
    log: warn.log,
    warn: warn.warn,
    error: warn.error,
});

export default standaloneQueryClient;
