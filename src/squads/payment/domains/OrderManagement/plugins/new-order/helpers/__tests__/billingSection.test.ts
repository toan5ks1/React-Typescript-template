import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockProductFieldArrayItems } from "src/squads/payment/test-utils/mocks/recurring-products";

import { BilledAtOrderPackageProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingPackageProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

import {
    getBillingItemPrice,
    getBillingPeriods,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import { generateFrequencyBasedPackageSectionItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingSection";
import {
    getProductPricesBySlotOrWeight,
    getTotalCoursesSlot,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/price";
import { getRecurringProductInfo } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";

describe("generateFrequencyBasedPackageSectionItem", () => {
    const mockOrderDate = new Date("7/20/22").toISOString();
    const mockStartDate = new Date("7/25/22").toISOString();

    let productFieldArrayItem = createMockProductFieldArrayItems()[1];
    productFieldArrayItem = {
        ...productFieldArrayItem,
        recurringDetails: { ...productFieldArrayItem.recurringDetails, startDate: mockStartDate },
    };
    const { currentCurrency } = getCurrentCurrency();
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

        const billedAtOrderBillingItems: BilledAtOrderPackageProduct[] =
            generateFrequencyBasedPackageSectionItem({
                productFieldArrayItem,
                currency: currentCurrency,
                section: "billedAtOrder",
                orderDate: mockOrderDate,
            });

        it("should return correct price of billedAtOrder items", () => {
            billedAtOrderBillingItems.forEach((billingItem, index) => {
                const { billingRatioNumerator, billingRatioDenominator } = billingItem;

                const productPrice = getBillingItemPrice({
                    productPrices: productPricesWithSlot,
                    billingPeriodId: billingPeriodsOfBillAtOrder[index].billing_schedule_period_id,
                    billingRatioNumerator,
                    billingRatioDenominator,
                });

                expect(billingItem.productPrice).toBe(productPrice);
            });
        });

        it("should return correct number of billedAtOrder items", () => {
            expect(billedAtOrderBillingItems).toHaveLength(billingPeriodsOfBillAtOrder.length);
        });

        it("should return correct package courses of billedAtOrder items", () => {
            billedAtOrderBillingItems.forEach(({ packageCourses }) => {
                expect(packageCourses).toHaveLength(productFieldArrayItem.packageCourses!.length);
            });
        });

        it("should return empty array billedAtOrder items when ProductPrice is empty array", () => {
            const billedAtOrderBillingItems: BilledAtOrderPackageProduct[] =
                generateFrequencyBasedPackageSectionItem({
                    productFieldArrayItem: { ...productFieldArrayItem, productPrices: [] },
                    currency: currentCurrency,
                    section: "billedAtOrder",
                    orderDate: mockOrderDate,
                });

            expect(billedAtOrderBillingItems).toEqual([]);
        });

        it("should return empty array billedAtOrder items when packageCourses is undefined", () => {
            const billedAtOrderBillingItems: BilledAtOrderPackageProduct[] =
                generateFrequencyBasedPackageSectionItem({
                    productFieldArrayItem: { ...productFieldArrayItem, packageCourses: undefined },
                    currency: currentCurrency,
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

        const upcomingBillingItems: UpcomingBillingPackageProduct[] =
            generateFrequencyBasedPackageSectionItem({
                productFieldArrayItem,
                currency: currentCurrency,
                section: "upcomingBilling",
                orderDate: mockOrderDate,
            });

        it("should return correct price upcoming billing items", () => {
            upcomingBillingItems.forEach((billingItem, index) => {
                const { billingRatioNumerator, billingRatioDenominator } = billingItem;

                const productPrice = getBillingItemPrice({
                    productPrices: productPricesWithSlot,
                    billingPeriodId: billingPeriodsOfUpcoming[index].billing_schedule_period_id,
                    billingRatioNumerator,
                    billingRatioDenominator,
                });

                expect(billingItem.productPrice).toBe(productPrice);
            });
        });

        it("should return correct number of upcoming billing items", () => {
            expect(upcomingBillingItems).toHaveLength(billingPeriodsOfUpcoming.length);
        });

        it("should return correct package courses of upcoming billing items", () => {
            upcomingBillingItems.forEach(({ packageCourses }) => {
                expect(packageCourses).toHaveLength(productFieldArrayItem.packageCourses!.length);
            });
        });

        it("should return empty array upcoming billing items when ProductPrice is empty array", () => {
            const upcomingBillingItems: UpcomingBillingPackageProduct[] =
                generateFrequencyBasedPackageSectionItem({
                    productFieldArrayItem: { ...productFieldArrayItem, productPrices: [] },
                    currency: currentCurrency,
                    section: "upcomingBilling",
                    orderDate: mockOrderDate,
                });

            expect(upcomingBillingItems).toEqual([]);
        });

        it("should return empty array upcoming billing items when packageCourses is undefined", () => {
            const upcomingBillingItems: UpcomingBillingPackageProduct[] =
                generateFrequencyBasedPackageSectionItem({
                    productFieldArrayItem: { ...productFieldArrayItem, packageCourses: undefined },
                    currency: currentCurrency,
                    section: "upcomingBilling",
                    orderDate: mockOrderDate,
                });

            expect(upcomingBillingItems).toEqual([]);
        });
    });
});
