import { PropsWithChildren } from "react";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export function TestQueryWrapper({ children }: PropsWithChildren<{}>) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
