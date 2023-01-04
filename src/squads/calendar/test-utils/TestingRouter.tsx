import { ReactNode } from "react";

import { createMemoryHistory } from "history";
import { Router, Route } from "react-router-dom";

const history = createMemoryHistory({
    initialEntries: ["/"],
});

const TestingRouter = ({
    children,
    redirectUrl,
}: {
    children: ReactNode;
    redirectUrl?: string;
}) => {
    return (
        <Router history={history}>
            <Route path="/" exact={true} render={() => <>{children}</>} />
            {redirectUrl && (
                <Route
                    path={redirectUrl}
                    render={() => <div data-testid="TestingRouter__redirectUrl">{redirectUrl}</div>}
                />
            )}
        </Router>
    );
};

export default TestingRouter;
