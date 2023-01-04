/* eslint-disable import/no-unresolved */
import { Suspense } from "react";

import { Route } from "react-router";

import Loading from "src/components/Loading";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import routes from "./routes";
// import routes from "./micro-applications";
import { Routing } from "./type";

const RootRouting = () => {
    return (
        <Suspense fallback={<Loading />}>
            <SwitchWith404Route>
                {(routes as Routing[]).map((route) => {
                    return (
                        <Route
                            key={route.name}
                            path={`/${route.name}`}
                            component={route.component}
                        />
                    );
                })}
            </SwitchWith404Route>
        </Suspense>
    );
};

export default RootRouting;
