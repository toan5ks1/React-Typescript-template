import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

const BookDetailsPageLazy = lazyWithRetry(() => import("./BookDetails"));
const BookListPageLazy = lazyWithRetry(() => import("./BookList"));

const BookRouter = () => {
    const { path } = useRouteMatch();
    return (
        <SwitchWith404Route>
            <RouteGuard path={`${path}/:id/show`} component={BookDetailsPageLazy} />
            <RouteGuard path={path} component={BookListPageLazy} />
        </SwitchWith404Route>
    );
};

export default BookRouter;
