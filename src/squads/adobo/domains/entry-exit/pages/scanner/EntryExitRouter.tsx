import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import ErrorBoundaryLayout from "src/squads/adobo/domains/entry-exit/components/ErrorBoundary/ErrorBoundaryLayout";
import TranslationProvider from "src/squads/adobo/domains/entry-exit/providers/TranslationProvider";

const QrCodeScannerPageLazy = lazyWithRetry(() => import("./QrCodeScannerPage"));

const EntryExitRouter = () => {
    const { path } = useRouteMatch();
    return (
        <TranslationProvider>
            <ErrorBoundaryLayout>
                <SwitchWith404Route>
                    <RouteGuard path={path} component={QrCodeScannerPageLazy} />
                </SwitchWith404Route>
            </ErrorBoundaryLayout>
        </TranslationProvider>
    );
};

export default EntryExitRouter;
