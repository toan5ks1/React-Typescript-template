import { OrderCurrency } from "src/squads/payment/constants/enum";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingOneTimeMaterialProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import OneTimeProductBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/common/components/OneTimeProductBilledAtOrder";
import OneTimeProductDetails from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/OneTimeProductDetails";

import { generateOneTimeMaterialOrFeeBillingSectionItem } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import { getOneTimeFeeBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingItem";
import { getNewOrderOneTimeMaterialAndFeeOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const generateProductFeeOneTimePlugin = (currency: OrderCurrency): OrderPluginFunctions => ({
    ProductChild: ({ productFieldArrayItem, productFieldItemIndex, studentIndex }) => (
        <OneTimeProductDetails
            productFieldArrayItem={productFieldArrayItem}
            productFieldItemIndex={productFieldItemIndex}
            studentIndex={studentIndex}
        />
    ),

    generateBilledAtOrderBillingItems: (productFieldArrayItem): BilledAtOrderItemType[] => {
        const billingSectionItems: BilledAtOrderItemType[] = [];

        const billingSectionItem = generateOneTimeMaterialOrFeeBillingSectionItem({
            productFieldArrayItem,
            currency,
            section: "billedAtOrder",
        });

        if (billingSectionItem) billingSectionItems.push(billingSectionItem);

        return billingSectionItems;
    },

    generateUpcomingBillingBillingItems: (): UpcomingBillingOneTimeMaterialProduct[] => [],

    BilledAtOrderChild: ({ billedAtOrderItem }) => (
        <OneTimeProductBilledAtOrder billedAtOrderItem={billedAtOrderItem} />
    ),

    UpcomingBillingChild: () => null,

    getBillingItems: (productFieldArrayItem) => getOneTimeFeeBillingItems(productFieldArrayItem),

    getUpcomingBillingItems: () => [],

    getOrderItem: (productFieldArrayItem) =>
        getNewOrderOneTimeMaterialAndFeeOrderItem(productFieldArrayItem),
});

export default generateProductFeeOneTimePlugin;
