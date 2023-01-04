import BillingItemCell from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/BillingItemCell/BillingItemCell";
import ProductListCell from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/ProductListCell";

import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName/useBillingItemName";
import { SlotType } from "src/squads/payment/domains/OrderManagement/hooks/useCourseSlotsLabel";
import { OrderDetailsFunctions } from "src/squads/payment/domains/OrderManagement/plugins/order-details/types";

const generateRecurringOrderDetailPlugin = (
    slotType: SlotType = "slot"
): OrderDetailsFunctions => ({
    ProductsListItemCell: ({ productName, discountName, courseItemsList, startDate }) => {
        return (
            <ProductListCell
                productName={productName}
                discountName={discountName}
                courseItemsList={courseItemsList}
                typeOfSlot={slotType}
                startDate={startDate}
            />
        );
    },

    BillingItemsCell: ({ productName, courseItemsList, recurringDetails }) => {
        const itemNameWithPeriod = useBillingItemName({
            productName: productName,
            billingSchedulePeriodName: recurringDetails?.billingPeriodName,
            billingRatioNumerator: recurringDetails?.billingRatioNumerator,
            billingRatioDenominator: recurringDetails?.billingRatioDenominator,
        });

        // We don't need translate because this case rarely happens
        if (!recurringDetails) {
            return <>Something wrong with billing item</>;
        }

        return (
            <BillingItemCell
                productName={itemNameWithPeriod}
                courseItemsList={courseItemsList}
                typeOfSlot={slotType}
            />
        );
    },
});

export default generateRecurringOrderDetailPlugin;
