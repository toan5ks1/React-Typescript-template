import { useRouteMatch } from "react-router";
import { Features } from "src/common/constants/enum";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const CreatePageLazy = lazyWithRetry(() => import("./Create"));
const EditPageLazy = lazyWithRetry(() => import("./Edit"));
const CreatePageV2Lazy = lazyWithRetry(() => import("../QuizV2/QuizCreate"));
const EditPageV2Lazy = lazyWithRetry(() => import("../QuizV2/QuizEdit"));

const QuizRouter = () => {
    const { path } = useRouteMatch();
    const featureConfigs = { feature: Features.SYLLABUS_QUIZ_OPTIMIZATION };

    return (
        <SwitchWith404Route>
            <RouteGuard path={`${path}/create`} component={CreatePageLazy} />
            <RouteGuard path={[`${path}/:id/edit`]} component={EditPageLazy} />
            <RouteGuard
                path={`${path}/create-v2`}
                component={CreatePageV2Lazy}
                featureConfigs={featureConfigs}
            />
            <RouteGuard
                path={[`${path}/:id/edit-v2`]}
                component={EditPageV2Lazy}
                featureConfigs={featureConfigs}
            />
        </SwitchWith404Route>
    );
};

export default QuizRouter;
