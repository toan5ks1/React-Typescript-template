import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const DetailPageLazy = lazyWithRetry(() => import("./TaskAssignmentDetail"));
const CreatePageLazy = lazyWithRetry(() => import("./TaskAssignmentCreate"));
const EditPageLazy = lazyWithRetry(() => import("./TaskAssignmentEdit"));

const TaskAssignmentRouter = () => {
    const { path } = useRouteMatch();
    return (
        <SwitchWith404Route>
            <RouteGuard path={`${path}/:id/show`} component={DetailPageLazy} />
            <RouteGuard path={`${path}/create`} component={CreatePageLazy} />
            <RouteGuard path={`${path}/:id`} component={EditPageLazy} />
        </SwitchWith404Route>
    );
};

export default TaskAssignmentRouter;
