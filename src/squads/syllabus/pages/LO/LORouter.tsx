import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const ShowPageLazy = lazyWithRetry(() => import("./ShowV2"));

const LORouter = () => {
    const { path } = useRouteMatch();
    return (
        <SwitchWith404Route>
            <RouteGuard path={`${path}/:id/show`} component={ShowPageLazy} />
        </SwitchWith404Route>
    );
};

export default LORouter;
