import { useRouteMatch } from "react-router";
import { ERPModules } from "src/common/constants/enum";
import { lazyWithRetry } from "src/common/utils/other";
import { ResourceActions } from "src/squads/lesson/models/resource";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

const ShowPageLazy = lazyWithRetry(() => import("./LessonDetail"));
const ListPageLazy = lazyWithRetry(() => import("./LessonList"));

const LessonManagementRouter = () => {
    const { path } = useRouteMatch();
    return (
        <TranslationProvider>
            <SwitchWith404Route>
                <RouteGuard
                    path={`${path}/:lessonId/show`}
                    component={ShowPageLazy}
                    permissionConfigs={{
                        subject: ERPModules.LESSON_MANAGEMENT,
                        action: ResourceActions.SHOW,
                    }}
                />
                <RouteGuard
                    exact
                    path={path}
                    component={ListPageLazy}
                    permissionConfigs={{
                        subject: ERPModules.LESSON_MANAGEMENT,
                        action: ResourceActions.LIST,
                    }}
                />
            </SwitchWith404Route>
        </TranslationProvider>
    );
};

export default LessonManagementRouter;
