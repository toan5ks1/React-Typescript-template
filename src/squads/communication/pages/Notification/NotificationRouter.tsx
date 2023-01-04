import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const DetailPageLazy = lazyWithRetry(() => import("./NotificationDetail"));
const ListPageLazy = lazyWithRetry(() => import("./NotificationList"));

const NotificationRouter = () => {
    const { path } = useRouteMatch();
    return (
        <SwitchWith404Route>
            <RouteGuard path={`${path}/:id/show`} component={DetailPageLazy} />
            <RouteGuard path={path} component={ListPageLazy} />
        </SwitchWith404Route>
    );
};

export default NotificationRouter;
