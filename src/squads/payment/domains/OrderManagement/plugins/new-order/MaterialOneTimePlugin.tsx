import { OrderCurrency } from "src/squads/payment/constants/enum";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingItemType } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import OneTimeProductBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/common/components/OneTimeProductBilledAtOrder";
import ProductUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/common/components/ProductUpcomingBilling";
import OneTimeProductDetails from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/OneTimeProductDetails";

import { generateOneTimeMaterialOrFeeBillingSectionItem } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import { getOneTimeMaterialBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingItem";
import { getNewOrderOneTimeMaterialAndFeeOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const generateProductMaterialOneTimePlugin = (currency: OrderCurrency): OrderPluginFunctions => ({
    ProductChild: ({ productFieldArrayItem, productFieldItemIndex, studentIndex }) => {
        return (
            <OneTimeProductDetails
                productFieldArrayItem={productFieldArrayItem}
                productFieldItemIndex={productFieldItemIndex}
                studentIndex={studentIndex}
            />
        );
    },

    generateBilledAtOrderBillingItems: (productFieldArrayItem) => {
        const billingSectionItems: BilledAtOrderItemType[] = [];

        const billingSectionItem = generateOneTimeMaterialOrFeeBillingSectionItem({
            productFieldArrayItem,
            currency,
            hasDateValidation: true,
            section: "billedAtOrder",
        });

        if (billingSectionItem) billingSectionItems.push(billingSectionItem);

        return billingSectionItems;
    },

    generateUpcomingBillingBillingItems: (productFieldArrayItem) => {
        const billingSectionItems: UpcomingBillingItemType[] = [];

        const billingSectionItem = generateOneTimeMaterialOrFeeBillingSectionItem({
            productFieldArrayItem,
            currency,
            hasDateValidation: true,
            section: "upcomingBilling",
        });

        if (billingSectionItem) billingSectionItems.push(billingSectionItem);

        return billingSectionItems;
    },

    BilledAtOrderChild: ({ billedAtOrderItem }) => (
        <OneTimeProductBilledAtOrder billedAtOrderItem={billedAtOrderItem} />
    ),

    UpcomingBillingChild: ({ upcomingBillingProduct }) => (
        <ProductUpcomingBilling upcomingBillingProduct={upcomingBillingProduct} />
    ),

    getBillingItems: (productFieldArrayItem) =>
        getOneTimeMaterialBillingItems(productFieldArrayItem, "billedAtOrder"),

    getUpcomingBillingItems: (productFieldArrayItem) =>
        getOneTimeMaterialBillingItems(productFieldArrayItem, "upcomingBilling"),

    getOrderItem: (productFieldArrayItem) =>
        getNewOrderOneTimeMaterialAndFeeOrderItem(productFieldArrayItem),
});

export default generateProductMaterialOneTimePlugin;
