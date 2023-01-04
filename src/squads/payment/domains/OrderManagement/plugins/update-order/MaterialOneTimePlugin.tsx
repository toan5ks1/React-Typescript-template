import { OrderCurrency } from "src/squads/payment/constants/enum";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingOneTimeMaterialProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import OneTimeProductBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/common/components/OneTimeProductBilledAtOrder";
import OneTimeProductDetails from "src/squads/payment/domains/OrderManagement/plugins/update-order/components/OneTimeProductDetails";
import OneTimeProductPreview from "src/squads/payment/domains/OrderManagement/plugins/update-order/components/OneTimeProductPreview";

import { OrderItem } from "manabuf/payment/v1/order_pb";

import { UpdateOrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";
import { getUpdateOrderOneTimeBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingItem";
import { generateOneTimeProductAdjustmentBilledAtOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/billingSection";

const getUpdateOrderOneTimeMaterialOrderItem = ({
    product,
    discount,
    updateOrderDetails,
}: ProductsFormValues): OrderItem.AsObject => ({
    productId: product?.product_id!,
    discountId: discount?.discount_id,
    productAssociationsList: [],
    courseItemsList: [],
    studentProductId: updateOrderDetails?.billItems[0].student_product_id,
    startDate: updateOrderDetails?.effectiveDate,
});

const generateUpdateProductMaterialOneTimePlugin = (
    currency: OrderCurrency,
    adjustmentTag: string
): UpdateOrderPluginFunctions => ({
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
        const { updateOrderDetails } = productFieldArrayItem;
        if (!updateOrderDetails || !updateOrderDetails.hasUpdate) return [];

        const billedAtOrderItem = generateOneTimeProductAdjustmentBilledAtOrderItem({
            productFieldArrayItem,
            currency,
            orderStatus: updateOrderDetails.orderStatus,
            adjustmentTag,
        });

        if (billedAtOrderItem) billingSectionItems.push(billedAtOrderItem);

        return billingSectionItems;
    },

    generateUpcomingBillingBillingItems: (
        _productFieldArrayItem
    ): UpcomingBillingOneTimeMaterialProduct[] => {
        return [];
    },

    BilledAtOrderChild: ({ billedAtOrderItem }) => {
        return <OneTimeProductBilledAtOrder billedAtOrderItem={billedAtOrderItem} />;
    },

    UpcomingBillingChild: () => {
        return <></>;
    },

    getBillingItems: (productFieldArrayItem) => {
        return getUpdateOrderOneTimeBillingItems(productFieldArrayItem, "billedAtOrder");
    },

    getUpcomingBillingItems: () => {
        return [];
    },

    getOrderItem: (productFieldArrayItem) =>
        getUpdateOrderOneTimeMaterialOrderItem(productFieldArrayItem),

    ProductPreviewItemChild: ({ productFieldItem, hasEffectiveDate }) => (
        <OneTimeProductPreview
            productFieldArrayItem={productFieldItem}
            hasEffectiveDate={hasEffectiveDate}
        />
    ),
});

export default generateUpdateProductMaterialOneTimePlugin;
