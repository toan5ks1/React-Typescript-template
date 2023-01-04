import { PropsWithChildren } from "react";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export const TestQueryWrapper = ({ children }: PropsWithChildren<{}>) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
