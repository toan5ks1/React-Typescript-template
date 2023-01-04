import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const CreateExamLOLazy = lazyWithRetry(() => import("./ExamCreate"));

const ExamRouter = () => {
    const { path } = useRouteMatch();

    return (
        <SwitchWith404Route>
            <RouteGuard path={`${path}/create`} component={CreateExamLOLazy} />
        </SwitchWith404Route>
    );
};

export default ExamRouter;
