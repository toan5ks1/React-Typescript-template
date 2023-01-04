import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

const ListPageLazy = lazyWithRetry(() => import("./AssignedStudentList"));

const AssignedStudentListRouter = () => {
    const { path } = useRouteMatch();
    return (
        <TranslationProvider>
            <SwitchWith404Route>
                <RouteGuard path={path} component={ListPageLazy} />
            </SwitchWith404Route>
        </TranslationProvider>
    );
};

export default AssignedStudentListRouter;
