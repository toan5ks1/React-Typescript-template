import { PropsWithChildren } from "react";

import TestApp from "./TestApp";
import { TestQueryWrapper } from "./react-hooks";

const TestAppWithQueryClient = ({ children }: PropsWithChildren<{}>) => (
    <TestApp>
        <TestQueryWrapper>{children}</TestQueryWrapper>
    </TestApp>
);

export default TestAppWithQueryClient;
