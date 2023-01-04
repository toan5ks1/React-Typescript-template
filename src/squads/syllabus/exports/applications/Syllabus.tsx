import "src/squads/syllabus/styles/mui-classname-setup";

import type { ErrorInfo } from "react";

import { enableMapSet } from "immer";
import { Router, Route, Switch } from "react-router-dom";
import { enableReport } from "src/internals/stackdriver";
import { enableLogger } from "src/internals/warner";

import Loading from "src/components/Loading";

import MicroRouting from "../../routing/MicroRouting";

import AppProvider from "src/app/AppProvider";
import "src/index.css";
import useSyllabusUpdatePermissionMicroApplication from "src/squads/syllabus/hooks/useSyllabusUpdatePermissionMicroApplication";

// In production, we produce a script with vite library mode, and use that in the root micro

enableMapSet();
enableReport();
enableLogger();

function Component({ basename, routeHistory }: { basename: string; routeHistory: any }) {
    const role = useSyllabusUpdatePermissionMicroApplication();
    if (!role) return <Loading fullscreen />;

    return (
        <Router history={routeHistory}>
            <AppProvider>
                <Switch>
                    <Route path={basename} component={MicroRouting} />
                </Switch>
            </AppProvider>
        </Router>
    );
}

Component.ErrorBoundary = (_err: Error, _info: ErrorInfo, _props: any) => {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
};

export default Component;
