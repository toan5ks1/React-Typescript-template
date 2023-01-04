import { useRouteMatch, Route } from "react-router-dom";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import useInitModules from "./useInitModules";

const MicroRouting = () => {
    const { routes } = useInitModules();
    let { path: rootPath } = useRouteMatch();

    return (
        <SwitchWith404Route>
            {routes.map((route) => {
                const { path } = route;

                return <Route key={path} {...route} path={`${rootPath}${path}`} />;
            })}
        </SwitchWith404Route>
    );
};

export default MicroRouting;
