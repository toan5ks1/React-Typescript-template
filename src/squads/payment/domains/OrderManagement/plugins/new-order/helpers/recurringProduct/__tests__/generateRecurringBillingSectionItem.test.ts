import {
    calculatePriceWithBillingRatio,
    getCurrentCurrency,
    getDiscountPriceByType,
} from "src/squads/payment/helpers/price";
import { getMockBillingSchedulePeriods } from "src/squads/payment/test-utils/mocks/billing-schedule-period";
import { createMockDiscountList } from "src/squads/payment/test-utils/mocks/discount";
import {
    createMockRecurringMaterialList,
    createMockRecurringMaterialProductPrices,
} from "src/squads/payment/test-utils/mocks/recurring-products";
import {
    OrderFormProductSection,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { getDateWithDuration } from "src/squads/payment/utils/date";

import {
    GeneratedRecurringBillingSectionItem,
    generateRecurringBillingSectionItem,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";

describe("generateRecurringBillingSectionItem, product with 4 billing periods (BP1 -> BP4) which have 4 billing dates BD1 -> BD4, order date (OD) and start date (SD)", () => {
    const { currentCurrency } = getCurrentCurrency();
    const discounts = createMockDiscountList();
    const product = createMockRecurringMaterialList()[0];
    const billingPeriods = getMockBillingSchedulePeriods();
    const productPrices = createMockRecurringMaterialProductPrices();
    const indexBP1 = 0;
    const indexBP2 = 1;
    const indexBP4 = 3;
    const firstRatioIndex = 0;
    const secondRatioIndex = 1;

    const getProductFieldArrayItem = ({
        startDate,
        proRatingFlagDisabled = false,
        discount = null,
    }: {
        startDate: string;
        proRatingFlagDisabled?: boolean;
        discount?: ProductDiscountType | null;
    }): ProductsFormValues => {
        return {
            product: {
                ...product,
                disable_pro_rating_flag: proRatingFlagDisabled,
            },
            recurringDetails: {
                startDate,
                billingSchedulePeriods: billingPeriods,
            },
            productPrices,
            discount,
        };
    };

    const verifyBillingItem = ({
        billingItem,
        billingPeriodIndex,
        billingRatioIndex,
        section,
        discount,
    }: {
        billingItem: GeneratedRecurringBillingSectionItem;
        billingPeriodIndex: number;
        billingRatioIndex?: number;
        section: OrderFormProductSection;
        discount?: ProductDiscountType;
    }) => {
        const {
            productName,
            billingSchedulePeriodName,
            billingRatioNumerator,
            billingRatioDenominator,
            productPrice,
            billingDate,
            discountName,
            discountPrice,
        } = billingItem;

        const expectedBillingPeriod = billingPeriods[billingPeriodIndex];
        const expectedProductPrice = productPrices[billingPeriodIndex];
        const expectedRatioNumerator =
            billingRatioIndex !== undefined
                ? expectedBillingPeriod.billing_ratios[billingRatioIndex].billing_ratio_numerator
                : undefined;
        const expectedRatioDenominator =
            billingRatioIndex !== undefined
                ? expectedBillingPeriod.billing_ratios[billingRatioIndex].billing_ratio_denominator
                : undefined;

        const expectFinalPrice = calculatePriceWithBillingRatio({
            productPrice: expectedProductPrice.price,
            billingRatioNumerator,
            billingRatioDenominator,
        });

        expect(productName).toBe(product.name);
        expect(billingSchedulePeriodName).toBe(expectedBillingPeriod.name);
        expect(billingRatioNumerator).toBe(expectedRatioNumerator);
        expect(billingRatioDenominator).toBe(expectedRatioDenominator);
        expect(productPrice).toBe(expectFinalPrice);

        if (discount) {
            expect(discountName).toBe(discount.name);
            expect(discountPrice).toBe(getDiscountPriceByType(discount, expectFinalPrice));
        } else {
            expect(discountName).toBe("");
            expect(discountPrice).toBe(0);
        }

        if (section === "upcomingBilling") {
            expect(billingDate).toBe(expectedBillingPeriod.billing_date);
        }
    };

    it("should return BP1 as billed at order with billing ratio 4/4 and BP2 as upcoming billing with no ratio when OD = BD1 and SD in BP1 - first ratio (pro-rating flag is enabled)", () => {
        const startDate = billingPeriods[0].start_date;
        const orderDate = billingPeriods[0].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: firstRatioIndex,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with billing ratio 3/4 and BP2 as upcoming billing with no ratio when OD = BD1 and SD in BP1 - second ratio (pro-rating flag is enabled)", () => {
        const startDate = billingPeriods[0].billing_ratios[1].start_date;
        const orderDate = billingPeriods[0].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: secondRatioIndex,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with no billing ratio and BP2 as upcoming billing with no ratio when OD = BD1 and SD in BP1 - first ratio (pro-rating flag is disabled)", () => {
        const startDate = billingPeriods[0].start_date;
        const orderDate = billingPeriods[0].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({
            startDate,
            proRatingFlagDisabled: true,
        });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with no billing ratio and BP2 as upcoming billing with no billing ratio when OD = BD1 and SD in BP1 - second ratio (pro-rating flag is disabled)", () => {
        const startDate = billingPeriods[indexBP1].billing_ratios[secondRatioIndex].start_date;
        const orderDate = billingPeriods[indexBP1].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({
            startDate,
            proRatingFlagDisabled: true,
        });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with billing ratio 4/4 and BP2 as upcoming billing with no ratio when BD1 < OD < BD2 and SD in BP1 - first ratio", () => {
        const startDate = billingPeriods[0].start_date;
        const orderDate = getDateWithDuration(billingPeriods[0].billing_date, 1);
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: firstRatioIndex,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate.toISOString(),
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            billingRatioIndex: undefined,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with billing ratio 3/4 and BP2 as upcoming billing with no ratio when BD1 < OD < BD2 and SD in BP1 - second ratio", () => {
        const startDate = billingPeriods[0].billing_ratios[1].start_date;
        const orderDate = getDateWithDuration(billingPeriods[0].billing_date, 1);
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: secondRatioIndex,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate.toISOString(),
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
        });
    });

    it("should return BP4 as billed at order with billing ratio 4/4 and no upcoming billing when OD = BD4 and SD in BP4 - first ratio", () => {
        const startDate = billingPeriods[indexBP4].start_date;
        const orderDate = billingPeriods[indexBP4].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP4,
            billingRatioIndex: firstRatioIndex,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(0);
    });

    it("should return BP4 as billed at order with billing ratio 3/4 and no upcoming billing when OD = BD4 and SD in BP4 - second ratio", () => {
        const startDate = billingPeriods[indexBP4].billing_ratios[1].start_date;
        const orderDate = billingPeriods[indexBP4].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP4,
            billingRatioIndex: 1,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(0);
    });

    it("should return no billed at order and BP1 as upcoming billing item when OD < BD1 and SD in BP1 - first ratio", () => {
        const startDate = billingPeriods[indexBP1].start_date;
        const orderDate = getDateWithDuration(billingPeriods[indexBP1].billing_date, -1);
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toHaveLength(0);

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate.toISOString(),
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: firstRatioIndex,
            section: "upcomingBilling",
        });
    });

    it("should return no billed at order and BP1 with billing ratio 3/4 as upcoming billing item when OD < BD1 and SD in BP1 - second ratio", () => {
        const startDate = billingPeriods[indexBP1].billing_ratios[secondRatioIndex].start_date;
        const orderDate = getDateWithDuration(billingPeriods[indexBP1].billing_date, -1);
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toHaveLength(0);

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate.toISOString(),
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: secondRatioIndex,
            section: "upcomingBilling",
        });
    });

    it("should return no billed at order and BP1 with billing ratio 3/4 as upcoming billing item when OD < BD1 and SD in BP1 - second ratio", () => {
        const startDate = billingPeriods[indexBP1].billing_ratios[secondRatioIndex].start_date;
        const orderDate = getDateWithDuration(billingPeriods[indexBP1].billing_date, -1);
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toHaveLength(0);

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate.toISOString(),
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: secondRatioIndex,
            section: "upcomingBilling",
        });
    });

    it("should return no billed at order and BP2 with billing ratio 4/4 as upcoming billing item when OD < BD1 and SD in BP2 - first ratio", () => {
        const startDate = billingPeriods[indexBP2].billing_ratios[firstRatioIndex].start_date;
        const orderDate = getDateWithDuration(billingPeriods[indexBP1].billing_date, -1);
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toHaveLength(0);

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate.toISOString(),
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            billingRatioIndex: firstRatioIndex,
            section: "upcomingBilling",
        });
    });

    it("should return no billed at order and BP2 with billing ratio 4/4 as upcoming billing item when OD = BD1 and SD in BP2 - first ratio", () => {
        const startDate = billingPeriods[indexBP2].billing_ratios[firstRatioIndex].start_date;
        const orderDate = billingPeriods[indexBP1].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(0);

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            billingRatioIndex: firstRatioIndex,
            section: "upcomingBilling",
        });
    });

    it("should return no billed at order and BP2 with billing ratio 3/4 as upcoming billing item when OD = BD1 and SD in BP2 - second ratio", () => {
        const startDate = billingPeriods[indexBP2].billing_ratios[secondRatioIndex].start_date;
        const orderDate = billingPeriods[indexBP1].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate: orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(0);

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem,
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate: orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            billingRatioIndex: secondRatioIndex,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with billing ratio 4/4 and BP2 as upcoming billing with no ratio when OD = BD1 and SD in BP1 - first ratio, with correct discount name and discount amount (recurring_valid_duration === null)", () => {
        const startDate = billingPeriods[0].start_date;
        const orderDate = billingPeriods[0].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const discount = discounts.find((discount) => discount.recurring_valid_duration === null);

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: firstRatioIndex,
            section: "billedAtOrder",
            discount,
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
            discount,
        });
    });

    it("should return BP1 as billed at order with billing ratio 4/4 and BP2 as upcoming billing with no ratio when OD = BD1 and SD in BP1 - first ratio, with no discount (recurring_valid_duration === 0)", () => {
        const startDate = billingPeriods[0].start_date;
        const orderDate = billingPeriods[0].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const discount = discounts.find((discount) => discount.recurring_valid_duration === 0);

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: firstRatioIndex,
            section: "billedAtOrder",
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with billing ratio 4/4 and BP2 as upcoming billing with no ratio when OD = BD1 and SD in BP1 - first ratio, with correct discount name and discount amount for billed at order and no discount for upcoming billing (recurring_valid_duration === 1)", () => {
        const startDate = billingPeriods[0].start_date;
        const orderDate = billingPeriods[0].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const discount = discounts.find((discount) => discount.recurring_valid_duration === 1);

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: firstRatioIndex,
            section: "billedAtOrder",
            discount,
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
        });
    });

    it("should return BP1 as billed at order with billing ratio 4/4 and BP2 as upcoming billing with no ratio when OD = BD1 and SD in BP1 - first ratio, with no discount (recurring_valid_duration === 2)", () => {
        const startDate = billingPeriods[0].start_date;
        const orderDate = billingPeriods[0].billing_date;
        const productFieldArrayItem = getProductFieldArrayItem({ startDate });

        const discount = discounts.find((discount) => discount.recurring_valid_duration === 2);

        const billedAtOrderBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "billedAtOrder",
            orderDate,
        });

        expect(billedAtOrderBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: billedAtOrderBillingItems[0],
            billingPeriodIndex: indexBP1,
            billingRatioIndex: firstRatioIndex,
            section: "billedAtOrder",
            discount,
        });

        const upcomingBillingItems = generateRecurringBillingSectionItem({
            productFieldArrayItem: {
                ...productFieldArrayItem,
                discount,
            },
            currency: currentCurrency,
            section: "upcomingBilling",
            orderDate,
        });

        expect(upcomingBillingItems).toHaveLength(1);

        verifyBillingItem({
            billingItem: upcomingBillingItems[0],
            billingPeriodIndex: indexBP2,
            section: "upcomingBilling",
            discount,
        });
    });
});
