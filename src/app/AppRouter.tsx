import { useEffect, useMemo } from "react";

import { ConnectedRouter } from "connected-react-router/immutable";
import { Route, Switch, RouteProps } from "react-router-dom";
import appConfigs from "src/internals/configuration";
import {
    FORGOT_PASSWORD_ROUTE,
    LOGIN_ROUTE,
    LOGIN_TENANT,
    FORGOT_PASSWORD_ROUTE_TENANT,
} from "src/squads/user/common/constants/routers";
import { PjOwner } from "src/typings/configuration";

import Loading from "../components/Loading";

import AppMain from "./AppMain";
import PageNotFound from "./PageNotFound";
import { history } from "./essentials";

import useUserFeatureToggle, {
    useInitializeUnleashWithoutIdentification,
} from "src/squads/user/hooks/useUserFeatureFlag";
import ForgotPage from "src/squads/user/pages/auth/Forgot";
import ForgotTenantPage from "src/squads/user/pages/auth/ForgotTenant";
import Login from "src/squads/user/pages/auth/Login";
import LoginTenant from "src/squads/user/pages/auth/LoginTenant";
import { SignOutCallback, SignInCallback, SilentCallback } from "src/squads/user/pages/auth/SSO";

declare global {
    interface Window {
        historyRoute: typeof history;
    }
}

interface RouteWithFeatureToggleProps extends RouteProps {
    isAvailable: boolean;
}

type ListAuthRoute = RouteWithFeatureToggleProps[];

function extraHistoryRoute() {
    window.historyRoute = history;
}

const AppRouter = () => {
    const owner = appConfigs.getCurrentPjOwner();

    const initialized = useInitializeUnleashWithoutIdentification();
    const isEnabledMultiTenant = useUserFeatureToggle("USER_MULTI_TENANT_LOGIN");

    const listAuthRoute: ListAuthRoute = useMemo(
        () => [
            {
                path: LOGIN_TENANT,
                component: LoginTenant,
                isAvailable: isEnabledMultiTenant,
            },
            {
                path: FORGOT_PASSWORD_ROUTE_TENANT,
                component: ForgotTenantPage,
                isAvailable: isEnabledMultiTenant,
            },
            {
                path: LOGIN_ROUTE,
                component: Login,
                isAvailable: !isEnabledMultiTenant,
            },
            {
                path: FORGOT_PASSWORD_ROUTE,
                component: ForgotPage,
                isAvailable: !isEnabledMultiTenant && owner !== PjOwner.JPREP, //TODO: use casl for this.
            },
        ],
        [isEnabledMultiTenant, owner]
    );

    useEffect(() => {
        extraHistoryRoute();
    }, []);

    const renderAuthRoute = ({ component, path, isAvailable }: RouteWithFeatureToggleProps) => {
        if (isAvailable) {
            return <Route exact key={path?.toString()} path={`/${path}`} component={component} />;
        }
    };

    if (!initialized) return <Loading fullscreen />;

    return (
        <ConnectedRouter history={history}>
            <Switch>
                {listAuthRoute.map((route) => renderAuthRoute(route))}

                <Route exact path="/_auth/_callback" component={SignInCallback} />
                <Route exact path="/_auth/_signout" component={SignOutCallback} />
                <Route exact path="/_auth/_silent" component={SilentCallback} />

                <Route path="/page-not-found" component={PageNotFound} />
                <Route path="/" component={AppMain} />
            </Switch>
        </ConnectedRouter>
    );
};

export default AppRouter;
