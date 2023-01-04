import { OrderCurrency } from "src/squads/payment/constants/enum";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";

import { BilledAtOrderRecurringProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingOneTimeMaterialProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import RecurringProductBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductBilledAtOrder";
import RecurringProductUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductUpcomingBilling";
import RecurringProductDetails from "src/squads/payment/domains/OrderManagement/plugins/update-order/components/RecurringProductDetails";
import RecurringProductPreview from "src/squads/payment/domains/OrderManagement/plugins/update-order/components/RecurringProductPreview";

import { OrderItem } from "manabuf/payment/v1/order_pb";

import { UpdateOrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";
import { getUpdateOrderRecurringMaterialBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingItem";
import {
    generateRecurringMaterialAdjustmentBilledAtOrderItem,
    generateRecurringMaterialAdjustmentUpcomingBillingItem,
} from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingSection";

const getUpdateOrderRecurringMaterialOrderItem = ({
    product,
    discount,
    updateOrderDetails,
}: ProductsFormValues): OrderItem.AsObject => ({
    productId: product?.product_id!,
    discountId: discount?.discount_id,
    productAssociationsList: [],
    courseItemsList: [],
    studentProductId: updateOrderDetails?.billItems[0].student_product_id,
    effectiveDate: updateOrderDetails?.effectiveDate,
});

const generateUpdateProductReccuringMaterialPlugin = (
    currency: OrderCurrency,
    adjustmentTag: string
): UpdateOrderPluginFunctions => ({
    ProductChild: ({ productFieldArrayItem, productFieldItemIndex, studentIndex }) => {
        return (
            <RecurringProductDetails
                productFieldArrayItem={productFieldArrayItem}
                productFieldItemIndex={productFieldItemIndex}
                studentIndex={studentIndex}
            />
        );
    },

    generateBilledAtOrderBillingItems: (productFieldArrayItem): BilledAtOrderRecurringProduct[] => {
        const { updateOrderDetails } = productFieldArrayItem;
        if (!updateOrderDetails || !updateOrderDetails.hasUpdate) return [];

        return generateRecurringMaterialAdjustmentBilledAtOrderItem({
            productFieldArrayItem,
            currency,
            orderStatus: updateOrderDetails.orderStatus,
            adjustmentTag,
        });
    },

    generateUpcomingBillingBillingItems: (
        productFieldArrayItem
    ): UpcomingBillingOneTimeMaterialProduct[] => {
        const upcomingBillingBillItems: UpcomingBillingOneTimeMaterialProduct[] = [];
        const { updateOrderDetails } = productFieldArrayItem;
        if (!updateOrderDetails || !updateOrderDetails.hasUpdate) return upcomingBillingBillItems;

        return generateRecurringMaterialAdjustmentUpcomingBillingItem({
            productFieldArrayItem,
            currency,
            orderStatus: updateOrderDetails.orderStatus,
            adjustmentTag,
        });
    },

    BilledAtOrderChild: ({ billedAtOrderItem }) => {
        return <RecurringProductBilledAtOrder billedAtOrderItem={billedAtOrderItem} />;
    },

    UpcomingBillingChild: ({ upcomingBillingProduct }) => {
        return <RecurringProductUpcomingBilling upcomingBillingItem={upcomingBillingProduct} />;
    },
    getBillingItems: (productFieldArrayItem) => {
        return getUpdateOrderRecurringMaterialBillingItems(productFieldArrayItem, "billedAtOrder");
    },

    getUpcomingBillingItems: (productFieldArrayItem) => {
        return getUpdateOrderRecurringMaterialBillingItems(
            productFieldArrayItem,
            "upcomingBilling"
        );
    },
    getOrderItem: (productFieldArrayItem) => {
        return getUpdateOrderRecurringMaterialOrderItem(productFieldArrayItem);
    },
    ProductPreviewItemChild: ({ productFieldItem, hasEffectiveDate }) => (
        <RecurringProductPreview
            productFieldArrayItem={productFieldItem}
            hasEffectiveDate={hasEffectiveDate}
        />
    ),
});

export default generateUpdateProductReccuringMaterialPlugin;
