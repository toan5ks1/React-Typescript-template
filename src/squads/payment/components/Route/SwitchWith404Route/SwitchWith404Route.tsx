import { ReactNode } from "react";

import { Redirect, Route, Switch, SwitchProps, useLocation } from "react-router";

interface SwitchWith404RouteProps extends SwitchProps {
    catchAllMode?: "404" | "component";
    component?: ReactNode;
    basename?: string;
}
const SwitchWith404Route = (props: SwitchWith404RouteProps) => {
    const { children, catchAllMode = "404", component } = props;
    const { pathname } = useLocation();
    const shouldRedirect = pathname !== "/";

    return (
        <Switch>
            {children}
            <Route
                render={() => {
                    if (catchAllMode === "404") {
                        if (shouldRedirect) {
                            return <Redirect to="/page-not-found" />;
                        }
                    }

                    if (catchAllMode === "component") return component;
                }}
            />
        </Switch>
    );
};

export default SwitchWith404Route;
