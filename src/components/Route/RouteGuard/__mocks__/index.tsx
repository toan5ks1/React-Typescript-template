import { Route } from "react-router";

import { RouteGuardProps } from "..";

export const MockRouteGuardRenderConfig = (props: RouteGuardProps) => {
    const {
        permissionConfigs: _permissionConfigs,
        component: _component,
        render: _render,
        featureConfigs,
        ...routeProps
    } = props;

    return (
        <Route {...routeProps}>
            <span data-testid={props.featureConfigs?.feature} />
        </Route>
    );
};
