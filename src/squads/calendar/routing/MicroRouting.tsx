import { useRouteMatch, Route } from "react-router-dom";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import ErrorBoundaryLayout from "src/squads/calendar/components/ErrorBoundary/ErrorBoundaryLayout";
import TranslationProvider from "src/squads/calendar/providers/TranslationProvider";

import useInitModules from "./useInitModules";

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

export default MicroRouting;
