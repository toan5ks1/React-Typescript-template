import { PropsWithChildren } from "react";

import { setLogger, QueryClientProvider as RqQueryClientProvider } from "react-query";
import { queryClient } from "src/internals/query-client";

import warner from "../internals/warner";

setLogger(warner);

function QueryClientProvider({ children }: PropsWithChildren<{}>) {
    return <RqQueryClientProvider client={queryClient}>{children}</RqQueryClientProvider>;
}

export default QueryClientProvider;
