import { useRouteMatch, Route } from "react-router-dom";

import ErrorBoundaryLayout from "../components/ErrorBoundary/ErrorBoundaryLayout";
import Loading from "src/components/Loading";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import TranslationProvider from "src/squads/syllabus/providers/TranslationProvider";

import useInitModules from "./useInitModules";

import useSyllabusUpdatePermissionMicroApplication from "src/squads/syllabus/hooks/useSyllabusUpdatePermissionMicroApplication";

const MicroRouting = () => {
    const { routes } = useInitModules();
    let { path: rootPath } = useRouteMatch();

    return (
        <TranslationProvider>
            <ErrorBoundaryLayout>
                <SwitchWith404Route>
                    {routes.map((route, index) => {
                        const { path } = route;
                        return (
                            <Route
                                key={`${path}-${index}`}
                                {...route}
                                path={`${rootPath}${path}`}
                            />
                        );
                    })}
                </SwitchWith404Route>
            </ErrorBoundaryLayout>
        </TranslationProvider>
    );
};

const MicroRoutingWithPermission = () => {
    const role = useSyllabusUpdatePermissionMicroApplication();
    if (!role) return <Loading fullscreen />;

    return <MicroRouting />;
};
export default MicroRoutingWithPermission;
