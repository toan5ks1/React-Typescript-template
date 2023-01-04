import { useRouteMatch, Route } from "react-router-dom";

import Loading from "src/components/Loading";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import ErrorBoundaryLayout from "src/squads/communication/components/ErrorBoundary/ErrorBoundaryLayout";
import CommunicationProvider from "src/squads/communication/providers/CommunicationProvider";

import { rawRoutes } from "./routings";

import useCommunicationAppInit from "src/squads/communication/hooks/useCommunicationAppInit";

const MicroRouting = () => {
    let { path: rootPath } = useRouteMatch();

    const { ready, routes } = useCommunicationAppInit(rawRoutes);

    if (!ready) return <Loading fullscreen />;

    return (
        <CommunicationProvider>
            <ErrorBoundaryLayout>
                <SwitchWith404Route>
                    {routes.map((route) => {
                        const { path } = route;
                        return <Route key={path} {...route} path={`${rootPath}${path}`} />;
                    })}
                </SwitchWith404Route>
            </ErrorBoundaryLayout>
        </CommunicationProvider>
    );
};

export default MicroRouting;
