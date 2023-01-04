import { useRouteMatch, Route } from "react-router-dom";

import Loading from "src/components/Loading";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import ErrorBoundaryLayout from "src/squads/payment/components/ErrorBoundary/ErrorBoundaryLayout";

import useInitModules from "./useInitModules";

import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import usePaymentUpdatePermissionMicroApplication from "src/squads/payment/hooks/usePaymentUpdatePermissionMicroApplication";

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
    const role = usePaymentUpdatePermissionMicroApplication();
    if (!role) return <Loading fullscreen />;

    return <MicroRouting />;
};
export default MicroRoutingWithPermission;
