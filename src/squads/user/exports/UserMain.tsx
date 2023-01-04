import type { ErrorInfo } from "react";

import type { History } from "history";
import { enableMapSet } from "immer";
import { Router, Route, Switch } from "react-router-dom";
import { enableReport } from "src/internals/stackdriver";
import { enableLogger } from "src/internals/warner";

import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";
import Loading from "src/components/Loading";

import { useInitializeUnleashWithoutIdentification } from "../hooks/useUserFeatureFlag";
import MicroRouting from "../routing/MicroRouting";

import AppProvider from "src/app/AppProvider";
import useUpdatePermissionMicroApplication from "src/app/useUpdatePermissionMicroApplication";
import "src/index.css";

// In production, we produce a script with vite library mode, and use that in the root micro

enableMapSet();
enableReport();
enableLogger();

ClassNameGenerator.configure((componentName) => `ManaUser-${componentName}`);
function Component({ basename, routeHistory }: { basename: string; routeHistory: History }) {
    const isInitialized = useUpdatePermissionMicroApplication();
    const unleashInitialized = useInitializeUnleashWithoutIdentification();
    if (!isInitialized || !unleashInitialized) return <Loading fullscreen />;

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
