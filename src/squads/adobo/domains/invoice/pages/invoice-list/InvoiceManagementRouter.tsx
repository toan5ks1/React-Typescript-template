import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";
import ErrorBoundaryLayout from "src/squads/adobo/domains/invoice/components/ErrorBoundary/ErrorBoundaryLayout";
import TranslationProvider from "src/squads/adobo/domains/invoice/providers/TranslationProvider";

const InvoiceListPage = lazyWithRetry(() => import("./InvoiceListPage"));
const InvoiceDetail = lazyWithRetry(() => import("./components/InvoiceDetail"));

const InvoiceManagementRouter = () => {
    const { path } = useRouteMatch();
    return (
        <TranslationProvider>
            <ErrorBoundaryLayout>
                <SwitchWith404Route>
                    <RouteGuard path={path} component={InvoiceListPage} exact />
                    <RouteGuard path={`${path}/:id/show`} component={InvoiceDetail} />
                </SwitchWith404Route>
            </ErrorBoundaryLayout>
        </TranslationProvider>
    );
};

export default InvoiceManagementRouter;
