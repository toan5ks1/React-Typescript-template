import { OrderCurrency } from "src/squads/payment/constants/enum";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingRecurringProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import RecurringProductBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductBilledAtOrder";
import RecurringProductDetails from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductDetails";
import RecurringProductUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductUpcomingBilling";

import { getNewOrderRecurringMaterialOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import {
    generateRecurringBillingSectionItem,
    getRecurringBillingItems,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const generateProductMaterialRecurringPlugin = (currency: OrderCurrency): OrderPluginFunctions => ({
    ProductChild: ({ productFieldArrayItem, productFieldItemIndex, studentIndex }) => {
        return (
            <RecurringProductDetails
                productFieldArrayItem={productFieldArrayItem}
                productFieldItemIndex={productFieldItemIndex}
                studentIndex={studentIndex}
            />
        );
    },

    generateBilledAtOrderBillingItems: (productFieldArrayItem): BilledAtOrderItemType[] => {
        const billingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency,
            section: "billedAtOrder",
            orderDate: new Date().toISOString(),
        });

        return billingItems;
    },
    generateUpcomingBillingBillingItems: (
        productFieldArrayItem
    ): UpcomingBillingRecurringProduct[] => {
        const billingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency,
            section: "upcomingBilling",
            orderDate: new Date().toISOString(),
        });

        return billingItems;
    },
    BilledAtOrderChild: ({ billedAtOrderItem }) => {
        return <RecurringProductBilledAtOrder billedAtOrderItem={billedAtOrderItem} />;
    },
    UpcomingBillingChild: ({ upcomingBillingProduct }) => {
        return <RecurringProductUpcomingBilling upcomingBillingItem={upcomingBillingProduct} />;
    },
    getBillingItems: (productFieldArrayItem) => {
        return getRecurringBillingItems({
            productFieldArrayItem,
            section: "billedAtOrder",
            orderDate: new Date().toISOString(),
        });
    },
    getUpcomingBillingItems: (productFieldArrayItem) => {
        return getRecurringBillingItems({
            productFieldArrayItem,
            section: "upcomingBilling",
            orderDate: new Date().toISOString(),
        });
    },
    getOrderItem: (productFieldArrayItem) => {
        return getNewOrderRecurringMaterialOrderItem(productFieldArrayItem);
    },
});

export default generateProductMaterialRecurringPlugin;
