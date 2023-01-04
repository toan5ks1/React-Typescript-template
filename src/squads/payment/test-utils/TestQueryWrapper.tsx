import { PropsWithChildren } from "react";

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

const TestQueryWrapper = ({ children }: PropsWithChildren<{}>) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TestQueryWrapper;
