import { queryClient } from "src/internals/query-client";
import StandaloneQueryClient from "src/packages/standalone-query-client";
import logger from "src/squads/syllabus/internals/logger";

const standaloneQueryClient = new StandaloneQueryClient(queryClient, {
    log: logger.info,
    warn: logger.warn,
    error: logger.error,
});

export default standaloneQueryClient;
