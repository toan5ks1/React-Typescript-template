import "src/squads/timesheet/styles/mui-classname-setup";

import type { ErrorInfo } from "react";

import type { History } from "history";
import { enableMapSet } from "immer";
import { Router, Route, Switch } from "react-router-dom";
import { enableReport } from "src/internals/stackdriver";
import { enableLogger } from "src/internals/warner";
import permission from "src/squads/timesheet/internals/permission";

import Loading from "src/components/Loading";

import AppProvider from "src/app/AppProvider";
import "src/index.css";
import PermissionProvider from "src/squads/timesheet/contexts/PermissonProvider";
import useTimesheetUpdatePermissionMicroApplication from "src/squads/timesheet/hooks/useTimesheetUpdatePermissionMicroApplication";
import MicroRouting from "src/squads/timesheet/routing/MicroRouting";

// In production, we produce a script with vite library mode, and use that in the root micro

enableMapSet();
enableReport();
enableLogger();

function Component({ basename, routeHistory }: { basename: string; routeHistory: History }) {
    const role = useTimesheetUpdatePermissionMicroApplication();
    if (!role) return <Loading fullscreen />;

    return (
        <Router history={routeHistory}>
            <AppProvider>
                <PermissionProvider value={permission}>
                    <Switch>
                        <Route path={basename} component={MicroRouting} />
                    </Switch>
                </PermissionProvider>
            </AppProvider>
        </Router>
    );
}

Component.ErrorBoundary = (_err: Error, _info: ErrorInfo, _props: any) => {
    // https://reactjs.org/docs/error-boundaries.html
    return <div>This renders when a catastrophic error occurs</div>;
};

export default Component;
