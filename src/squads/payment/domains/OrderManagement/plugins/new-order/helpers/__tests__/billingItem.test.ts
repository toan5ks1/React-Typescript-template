import { calculatePriceWithBillingRatio } from "src/squads/payment/helpers/price";
import { createMockProductFieldArrayItems } from "src/squads/payment/test-utils/mocks/recurring-products";
import { BillingRatio } from "src/squads/payment/types/service/bill-ratio-types";

import { BillingItem } from "manabuf/payment/v1/order_pb";

import {
    getBillingPeriods,
    getBillingRatioBasedOnStartDate,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import { getFrequencyBasedPackageBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingItem";
import {
    getProductPricesBySlotOrWeight,
    getTotalCoursesSlot,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/price";
import { getRecurringProductInfo } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";

describe("getFrequencyBasedPackageBillingItems", () => {
    const mockOrderDate = new Date("7/20/22").toISOString();
    const mockStartDate = new Date("7/25/22").toISOString();

    let productFieldArrayItem = createMockProductFieldArrayItems()[1];
    productFieldArrayItem = {
        ...productFieldArrayItem,
        recurringDetails: { ...productFieldArrayItem.recurringDetails, startDate: mockStartDate },
    };

    const { productPrices, billingPeriods, packageCourses } =
        getRecurringProductInfo(productFieldArrayItem);

    const productPricesWithSlot = getProductPricesBySlotOrWeight({
        getTotalCoursesQuantity: getTotalCoursesSlot,
        productPrices: productPrices || [],
        packageCourses: packageCourses,
    });

    describe("type is billedAtOrder", () => {
        const billingPeriodsOfBillAtOrder = getBillingPeriods({
            billingPeriods,
            startDate: mockStartDate,
            orderDate: mockOrderDate,
            billingSection: "billedAtOrder",
        });

        const billedAtOrderBillingItems: BillingItem.AsObject[] =
            getFrequencyBasedPackageBillingItems({
                productFieldArrayItem,
                section: "billedAtOrder",
                orderDate: mockOrderDate,
            });

        it("should return correct price of billedAtOrder items ", () => {
            billedAtOrderBillingItems.forEach((billingItem) => {
                const { billingSchedulePeriodId } = billingItem;
                const productPriceWithPeriod = productPricesWithSlot.find(
                    (productPrice) =>
                        productPrice.billing_schedule_period_id === billingSchedulePeriodId
                );
                const billingPeriod = billingPeriodsOfBillAtOrder.find(
                    (billingPeriod) =>
                        billingPeriod.billing_schedule_period_id === billingSchedulePeriodId
                );
                const billingRatio: BillingRatio | undefined = getBillingRatioBasedOnStartDate(
                    billingPeriod?.billing_ratios || [],
                    mockStartDate
                );

                const billingItemPriceWithRatio = calculatePriceWithBillingRatio({
                    productPrice: productPriceWithPeriod?.price!,
                    billingRatioNumerator: billingRatio?.billing_ratio_numerator,
                    billingRatioDenominator: billingRatio?.billing_ratio_denominator,
                });

                expect(billingItem.price).toEqual(billingItemPriceWithRatio);
            });
        });

        it("should return correct number of billedAtOrder items", () => {
            expect(billedAtOrderBillingItems).toHaveLength(billingPeriodsOfBillAtOrder.length);
        });

        it("should return correct package courses of billedAtOrder items ", () => {
            billedAtOrderBillingItems.forEach(({ courseItemsList }) => {
                expect(courseItemsList).toHaveLength(productFieldArrayItem.packageCourses!.length);
            });
        });

        it("should return empty array billedAtOrder items when ProductPrice is empty array", () => {
            const billedAtOrderBillingItems: BillingItem.AsObject[] =
                getFrequencyBasedPackageBillingItems({
                    productFieldArrayItem: { ...productFieldArrayItem, productPrices: [] },
                    section: "billedAtOrder",
                    orderDate: mockOrderDate,
                });

            expect(billedAtOrderBillingItems).toEqual([]);
        });

        it("should return empty array billedAtOrder items when packageCourses is undefined", () => {
            const billedAtOrderBillingItems: BillingItem.AsObject[] =
                getFrequencyBasedPackageBillingItems({
                    productFieldArrayItem: { ...productFieldArrayItem, packageCourses: undefined },
                    section: "billedAtOrder",
                    orderDate: mockOrderDate,
                });

            expect(billedAtOrderBillingItems).toEqual([]);
        });
    });

    describe("type is upcomingBilling", () => {
        const billingPeriodsOfUpcoming = getBillingPeriods({
            billingPeriods,
            startDate: mockStartDate,
            orderDate: mockOrderDate,
            billingSection: "upcomingBilling",
        });

        const upcomingBillingItems: BillingItem.AsObject[] = getFrequencyBasedPackageBillingItems({
            productFieldArrayItem,
            section: "upcomingBilling",
            orderDate: mockOrderDate,
        });

        it("should return correct price upcoming billing items", () => {
            upcomingBillingItems.forEach((billingItem) => {
                const { billingSchedulePeriodId } = billingItem;
                const productPriceWithPeriod = productPricesWithSlot.find(
                    (productPrice) =>
                        productPrice.billing_schedule_period_id === billingSchedulePeriodId
                );
                const billingPeriod = billingPeriodsOfUpcoming.find(
                    (billingPeriod) =>
                        billingPeriod.billing_schedule_period_id === billingSchedulePeriodId
                );
                const billingRatio: BillingRatio | undefined = getBillingRatioBasedOnStartDate(
                    billingPeriod?.billing_ratios || [],
                    mockStartDate
                );

                const billingItemPriceWithRatio = calculatePriceWithBillingRatio({
                    productPrice: productPriceWithPeriod?.price!,
                    billingRatioNumerator: billingRatio?.billing_ratio_numerator,
                    billingRatioDenominator: billingRatio?.billing_ratio_denominator,
                });

                expect(billingItem.price).toEqual(billingItemPriceWithRatio);
            });
        });

        it("should return correct number of upcoming billing items", () => {
            expect(upcomingBillingItems).toHaveLength(billingPeriodsOfUpcoming.length);
        });

        it("should return correct package courses of upcoming billing items", () => {
            upcomingBillingItems.forEach(({ courseItemsList }) => {
                expect(courseItemsList).toHaveLength(productFieldArrayItem.packageCourses!.length);
            });
        });

        it("should return empty array upcoming billing items when ProductPrice is empty array", () => {
            const upcomingBillingItems: BillingItem.AsObject[] =
                getFrequencyBasedPackageBillingItems({
                    productFieldArrayItem: { ...productFieldArrayItem, productPrices: [] },
                    section: "upcomingBilling",
                    orderDate: mockOrderDate,
                });

            expect(upcomingBillingItems).toEqual([]);
        });

        it("should return empty array upcoming billing items when packageCourses is undefined", () => {
            const upcomingBillingItems: BillingItem.AsObject[] =
                getFrequencyBasedPackageBillingItems({
                    productFieldArrayItem: { ...productFieldArrayItem, packageCourses: undefined },
                    section: "upcomingBilling",
                    orderDate: mockOrderDate,
                });

            expect(upcomingBillingItems).toEqual([]);
        });
    });
});
