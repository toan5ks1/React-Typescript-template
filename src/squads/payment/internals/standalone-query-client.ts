import { queryClient } from "src/internals/query-client";
import logger from "src/internals/warner";
import StandaloneQueryClient from "src/packages/standalone-query-client";

const standaloneQueryClient = new StandaloneQueryClient(queryClient, logger);
export default standaloneQueryClient;
