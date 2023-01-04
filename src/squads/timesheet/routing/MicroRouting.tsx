import { useRouteMatch, Route } from "react-router-dom";

import Loading from "src/components/Loading";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import ErrorBoundaryLayout from "src/squads/timesheet/components/ErrorBoundary/ErrorBoundaryLayout";
import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import useInitModules from "./useInitModules";

import useTimesheetUpdatePermissionMicroApplication from "src/squads/timesheet/hooks/useTimesheetUpdatePermissionMicroApplication";

const MicroRouting = () => {
    const { routes } = useInitModules();
    let { path: rootPath } = useRouteMatch();

    return (
        <TranslationProvider>
            <ErrorBoundaryLayout>
                <SwitchWith404Route>
                    {routes.map((route) => {
                        const { path } = route;

                        return <Route key={path} {...route} path={`${rootPath}${path}`} />;
                    })}
                </SwitchWith404Route>
            </ErrorBoundaryLayout>
        </TranslationProvider>
    );
};

const MicroRoutingWithPermission = () => {
    const role = useTimesheetUpdatePermissionMicroApplication();
    if (!role) return <Loading fullscreen />;

    return <MicroRouting />;
};
export default MicroRoutingWithPermission;
