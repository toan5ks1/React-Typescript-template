import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const ShowPageLazy = lazyWithRetry(() => import("./Show"));
const ListPageLazy = lazyWithRetry(() => import("./CourseList"));

const CourseRouter = () => {
    const { path } = useRouteMatch();
    return (
        <SwitchWith404Route>
            <RouteGuard path={path} component={ListPageLazy} exact />
            <RouteGuard path={`${path}/:id/show`} component={ShowPageLazy} />
        </SwitchWith404Route>
    );
};

export default CourseRouter;
