import NotImplementYet from "src/squads/payment/components/NotImplementYet";

import {
    OrderPluginFunctions,
    UpdateOrderPluginFunctions,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

export const defaultNotImplementedYetPlugins: OrderPluginFunctions = {
    ProductChild: () => {
        return <NotImplementYet isImplemented={false} mt={2} textAlign="center" />;
    },
    generateBilledAtOrderBillingItems: () => [],
    generateUpcomingBillingBillingItems: () => [],
    BilledAtOrderChild: () => null,
    UpcomingBillingChild: () => null,
    getBillingItems: () => [],
    getUpcomingBillingItems: () => [],
    getOrderItem: () => null,
};

export const updateOrderNotImplementedYetPlugins: UpdateOrderPluginFunctions = {
    ProductChild: () => {
        return <NotImplementYet isImplemented={false} mt={2} textAlign="center" />;
    },
    generateBilledAtOrderBillingItems: () => [],
    generateUpcomingBillingBillingItems: () => [],
    BilledAtOrderChild: () => null,
    UpcomingBillingChild: () => null,
    getBillingItems: () => [],
    getUpcomingBillingItems: () => [],
    getOrderItem: () => null,
    ProductPreviewItemChild: () => {
        return <NotImplementYet isImplemented={false} mt={2} textAlign="center" />;
    },
};
