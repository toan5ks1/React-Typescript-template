import { useRouteMatch } from "react-router";
import { EurekaEntities } from "src/common/constants/enum";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import { ResourceActions } from "../../models/resource";

const DetailPageLazy = lazyWithRetry(() => import("./AssignmentDetail"));
const CreatePageLazy = lazyWithRetry(() => import("./AssignmentCreate"));
const EditPageLazy = lazyWithRetry(() => import("./AssignmentEdit"));

const AssignmentRouter = () => {
    const { path } = useRouteMatch();
    return (
        <SwitchWith404Route>
            <RouteGuard
                path={`${path}/:id/show`}
                component={DetailPageLazy}
                permissionConfigs={{
                    subject: EurekaEntities.ASSIGNMENTS,
                    action: ResourceActions.SHOW,
                }}
            />
            <RouteGuard path={`${path}/create`} component={CreatePageLazy} />
            <RouteGuard path={`${path}/:id`} component={EditPageLazy} />
        </SwitchWith404Route>
    );
};

export default AssignmentRouter;
