import { useRouteMatch } from "react-router";
import { lazyWithRetry } from "src/common/utils/other";

import RouteGuard from "src/components/Route/RouteGuard";
import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";

const OrdersPage = lazyWithRetry(() => import("./pages/OrdersPage"));
const NewOrderPage = lazyWithRetry(() => import("./pages/NewOrderPage"));
const EnrollmentOrderPage = lazyWithRetry(() => import("./pages/EnrollmentOrderPage"));
const BulkOrderPage = lazyWithRetry(() => import("./pages/BulkOrderPage"));
const OrderDetailPage = lazyWithRetry(() => import("./pages/OrderDetailPage"));
const UpdateOrderPage = lazyWithRetry(() => import("./pages/UpdateOrderPage"));
const CustomBillingOrderPage = lazyWithRetry(() => import("./pages/CustomBillingOrderPage"));

const OrderManagementRouter = () => {
    const { path } = useRouteMatch();
    return (
        <TranslationProvider>
            <SwitchWith404Route>
                <RouteGuard path={`${path}/create`} component={NewOrderPage} />
                <RouteGuard path={`${path}/create_enrollment`} component={EnrollmentOrderPage} />
                <RouteGuard path={`${path}/create_bulk`} component={BulkOrderPage} />
                <RouteGuard path={`${path}/:id/show`} component={OrderDetailPage} />
                <RouteGuard path={`${path}/update`} component={UpdateOrderPage} />
                <RouteGuard
                    path={`${path}/create_custom_billing`}
                    component={CustomBillingOrderPage}
                />
                <RouteGuard path={path} component={OrdersPage} />
            </SwitchWith404Route>
        </TranslationProvider>
    );
};

export default OrderManagementRouter;
