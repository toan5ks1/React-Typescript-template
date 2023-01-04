import { Switch, useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";

import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";

const MasterPage = lazyWithRetry(() => import("./MasterDataView"));

const MasterDataRouter = () => {
    const { path } = useRouteMatch();
    return (
        <TranslationProvider>
            <Switch>
                <RouteGuard path={path} component={MasterPage} />
            </Switch>
        </TranslationProvider>
    );
};

export default MasterDataRouter;
