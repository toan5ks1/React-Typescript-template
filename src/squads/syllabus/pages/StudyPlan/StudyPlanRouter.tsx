import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const StudyPlanDetailsPageLazy = lazyWithRetry(() => import("./Show"));

const StudyPlanRouter = () => {
    const { path } = useRouteMatch();
    return (
        <SwitchWith404Route>
            <RouteGuard path={`${path}/:id/show`} component={StudyPlanDetailsPageLazy} />
        </SwitchWith404Route>
    );
};

export default StudyPlanRouter;
