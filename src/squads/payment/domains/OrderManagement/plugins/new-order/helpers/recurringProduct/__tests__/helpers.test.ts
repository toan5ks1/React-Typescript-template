import {
    createMockProductFieldArrayItems,
    createMockRecurringMaterialProductPrices,
} from "src/squads/payment/test-utils/mocks/recurring-products";
import {
    ProductsFormValues,
    RecurringDetails,
} from "src/squads/payment/types/form/order-form-types";

import {
    getBilledAtOrderBillingPeriods,
    getUpcomingBillingPeriods,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import { getRecurringBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";

const addStartDateToProductFieldArrayItem = (
    productFieldArrayItem: ProductsFormValues,
    startDate: string
): ProductsFormValues => {
    const recurringDetails: RecurringDetails = {
        ...productFieldArrayItem.recurringDetails,
        startDate,
    };

    return {
        ...productFieldArrayItem,
        recurringDetails,
    };
};

describe("getRecurringMaterialBillingItems", () => {
    const productFieldArrayItems = createMockProductFieldArrayItems();
    const firstProductItem = productFieldArrayItems[0];
    const billingPeriods = firstProductItem.recurringDetails?.billingSchedulePeriods!;
    const billingPeriod1 = billingPeriods[0];
    const billingPeriod2 = billingPeriods[1];
    const productPrices = createMockRecurringMaterialProductPrices();

    it("should return correct number of billedAtOrder items and correct fields in each item when input type BilledAtOrder", () => {
        const orderDate = billingPeriod2.billing_date;
        const startDate = billingPeriod1.start_date;

        expect(orderDate).toBeTruthy();
        expect(startDate).toBeTruthy();

        const productItem = addStartDateToProductFieldArrayItem(firstProductItem, startDate);

        const billingItems = getRecurringBillingItems({
            productFieldArrayItem: productItem,
            orderDate,
            section: "billedAtOrder",
        });

        const selectedBillingPeriods = getBilledAtOrderBillingPeriods({
            billingPeriods,
            orderDate,
            startDate,
        });

        expect(billingItems).toHaveLength(selectedBillingPeriods.length);

        billingItems.forEach((item, index) => {
            expect(item.productId).toBe(productItem.product?.product_id);
            expect(item.billingSchedulePeriodId).toBe(
                selectedBillingPeriods[index].billing_schedule_period_id
            );

            const productPrice = productPrices?.find(
                (price) => price.billing_schedule_period_id === item.billingSchedulePeriodId
            );

            expect(item.price).toBe(productPrice?.price);
        });
    });

    it("should return correct upcoming billing items when input type upcomingBilling", () => {
        const orderDate = billingPeriod1.billing_date;
        const startDate = billingPeriod1.start_date;

        expect(orderDate).toBeTruthy();
        expect(startDate).toBeTruthy();

        const productItem = addStartDateToProductFieldArrayItem(firstProductItem, startDate);

        const billingItems = getRecurringBillingItems({
            productFieldArrayItem: productItem,
            section: "upcomingBilling",
            orderDate,
        });

        const selectedBillingPeriods = getUpcomingBillingPeriods({
            billingPeriods,
            orderDate,
            startDate,
        });

        expect(billingItems).toHaveLength(selectedBillingPeriods.length);
    });
});
