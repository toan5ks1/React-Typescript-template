import { formatDate } from "src/common/utils/time";
import { getMockBillingRatios } from "src/squads/payment/test-utils/mocks/billing-ratio";
import { getMockBillingSchedulePeriods } from "src/squads/payment/test-utils/mocks/billing-schedule-period";
import { createMockDiscountList } from "src/squads/payment/test-utils/mocks/discount";
import { getDateWithDuration } from "src/squads/payment/utils/date";

import {
    getDatePickerMinMaxDates,
    getBilledAtOrderBillingPeriods,
    getUpcomingBillingPeriods,
    getPeriodWithBillingRatio,
    getDiscountApplicablePeriodIds,
    getBillingRatioBasedOnStartDate,
    canPeriodApplyRatio,
    getPeriodRatioDetails,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";

describe("getDatePickerMinMaxDates", () => {
    const billingPeriods = getMockBillingSchedulePeriods();

    it("should return min and max date of billing schedule", () => {
        const { calendarMinDate, calendarMaxDate } = getDatePickerMinMaxDates(billingPeriods);
        const minDate = billingPeriods[0].start_date;
        const maxDate = billingPeriods[billingPeriods.length - 1].end_date;
        const dateFormat = "yyyy/LL/dd";

        expect(calendarMinDate?.toFormat(dateFormat)).toEqual(
            formatDate(new Date(minDate), dateFormat)
        );
        expect(calendarMaxDate?.toFormat(dateFormat)).toEqual(
            formatDate(new Date(maxDate), dateFormat)
        );
    });

    it("should return min and max date with undefined value if there is no billing period in billing schedule", () => {
        const { calendarMinDate, calendarMaxDate } = getDatePickerMinMaxDates([]);

        expect(calendarMinDate).toEqual(undefined);
        expect(calendarMaxDate).toEqual(undefined);
    });
});

describe("getBilledAtOrderBillingPeriods with 4 billing periods (BP1 -> BP4) which have 4 billing dates BD1 -> BD4, order date (OD) and start date (SD)", () => {
    const billingSchedulePeriods = getMockBillingSchedulePeriods();
    const indexBP1 = 0;
    const indexBP2 = 1;
    const billingPeriod1 = billingSchedulePeriods[indexBP1];
    const billingPeriod2 = billingSchedulePeriods[indexBP2];

    it("should return no billed at order items when OD < BD1 and SD in BP1", () => {
        const startDate = billingPeriod1.start_date;
        const orderDate = getDateWithDuration(billingPeriod1.billing_date, -1);

        const billedAtOrderBillingItems = getBilledAtOrderBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toEqual([]);
    });

    it("should return no billed at order items when OD < BD1 and SD in BP2", () => {
        const startDate = billingPeriod2.start_date;
        const orderDate = getDateWithDuration(billingPeriod1.billing_date, -1);

        const billedAtOrderBillingItems = getBilledAtOrderBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toEqual([]);
    });

    it("should return no billed at order items when OD = BD1 and SD in BP2", () => {
        const startDate = billingPeriod2.start_date;
        const orderDate = billingPeriod1.billing_date;

        const billedAtOrderBillingItems = getBilledAtOrderBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate,
        });

        expect(billedAtOrderBillingItems).toEqual([]);
    });

    it("should return no billed at order items when BD1 < OD < BD2 and SD in BP2", () => {
        const startDate = billingPeriod2.start_date;
        const orderDate = getDateWithDuration(billingPeriod2.billing_date, -1);

        const billedAtOrderBillingItems = getBilledAtOrderBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toEqual([]);
    });

    it("should return BD1 for billed at order items when OD = BD1 and SD in BP1", () => {
        const startDate = billingPeriod1.start_date;
        const orderDate = billingPeriod1.billing_date;

        const billedAtOrderBillingItems = getBilledAtOrderBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate,
        });

        expect(billedAtOrderBillingItems).toEqual([billingPeriod1]);
    });

    it("should return BD1 and BD2 for billed at order items when OD = BD2 and SD in BP1", () => {
        const startDate = billingPeriod1.start_date;
        const orderDate = billingPeriod2.billing_date;

        const billedAtOrderBillingItems = getBilledAtOrderBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate,
        });

        expect(billedAtOrderBillingItems).toEqual([billingPeriod1, billingPeriod2]);
    });
});

describe("getUpcomingBillingPeriod with 4 billing periods (BP1 -> BP4) which have 4 billing dates BD1 -> BD4, order date (OD) and start date (SD)", () => {
    const billingSchedulePeriods = getMockBillingSchedulePeriods();
    const indexBP4 = 3;
    const billingPeriod4 = billingSchedulePeriods[indexBP4];

    it("should return no upcoming billing item when OD = BD4 and SD in BP4", () => {
        const startDate = billingPeriod4.start_date;
        const orderDate = billingPeriod4.billing_date;

        const billedAtOrderBillingItems = getUpcomingBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate,
        });

        expect(billedAtOrderBillingItems).toEqual([]);
    });

    it("should return BD4 for upcoming billing item when OD < BD4 and SD in BP4", () => {
        const startDate = billingPeriod4.start_date;
        const orderDate = getDateWithDuration(billingPeriod4.billing_date, -1);

        const billedAtOrderBillingItems = getUpcomingBillingPeriods({
            billingPeriods: billingSchedulePeriods,
            startDate,
            orderDate: orderDate.toISOString(),
        });

        expect(billedAtOrderBillingItems).toEqual([billingPeriod4]);
    });
});

describe("getPeriodWithBillingRatio", () => {
    const billingSchedulePeriods = getMockBillingSchedulePeriods();
    const firstBillingPeriodIndex = 0;
    const firstBillingPeriod = billingSchedulePeriods[firstBillingPeriodIndex];

    it("should return a billing period which has period start date = student start date", () => {
        const startDate = firstBillingPeriod.start_date;

        const selectedBillingPeriod = getPeriodWithBillingRatio(billingSchedulePeriods, startDate);
        expect(selectedBillingPeriod).toEqual(firstBillingPeriod);
    });

    it("should return a billing period which has period start date < student start date < period end date", () => {
        const startDate = getDateWithDuration(firstBillingPeriod.start_date, 1);

        const selectedBillingPeriod = getPeriodWithBillingRatio(
            billingSchedulePeriods,
            startDate.toISOString()
        );
        expect(selectedBillingPeriod).toEqual(firstBillingPeriod);
    });

    it("should return a billing period which has student start date = period end date", () => {
        const startDate = firstBillingPeriod.end_date;

        const selectedBillingPeriod = getPeriodWithBillingRatio(billingSchedulePeriods, startDate);
        expect(selectedBillingPeriod).toEqual(firstBillingPeriod);
    });
});

describe("getDiscountApplicablePeriodIds", () => {
    const discounts = createMockDiscountList();
    const billingPeriods = getMockBillingSchedulePeriods();
    const firstBillingPeriodIndex = 0;

    it("should return all billing period ids if the discount has recurring_valid_duration = null", () => {
        const selectedDiscount = discounts.find(
            (discount) => discount.recurring_valid_duration === null
        );

        expect(selectedDiscount).toBeTruthy();

        const startDate = billingPeriods[firstBillingPeriodIndex].start_date;
        const discountApplicablePeriodIds = getDiscountApplicablePeriodIds(
            billingPeriods,
            startDate,
            selectedDiscount
        );

        expect(discountApplicablePeriodIds).toHaveLength(billingPeriods.length);
        discountApplicablePeriodIds.forEach((periodId, index) => {
            expect(periodId).toBe(billingPeriods[index].billing_schedule_period_id);
        });
    });

    it("should return no billing period id if the discount has recurring_valid_duration = 0", () => {
        const selectedDiscount = discounts.find(
            (discount) => discount.recurring_valid_duration === 0
        );

        expect(selectedDiscount).toBeTruthy();

        const startDate = billingPeriods[firstBillingPeriodIndex].start_date;
        const discountApplicablePeriodIds = getDiscountApplicablePeriodIds(
            billingPeriods,
            startDate,
            selectedDiscount
        );

        expect(discountApplicablePeriodIds).toHaveLength(0);
    });

    it("should return 1 first paid billing period id if the discount has recurring_valid_duration = 1", () => {
        const selectedDiscount = discounts.find(
            (discount) => discount.recurring_valid_duration === 1
        );

        expect(selectedDiscount).toBeTruthy();

        const startDate = billingPeriods[firstBillingPeriodIndex].start_date;
        const discountApplicablePeriodIds = getDiscountApplicablePeriodIds(
            billingPeriods,
            startDate,
            selectedDiscount
        );

        expect(discountApplicablePeriodIds).toHaveLength(1);
        expect(discountApplicablePeriodIds[0]).toBe(billingPeriods[0].billing_schedule_period_id);
    });
});

describe("getBillingRatioBasedOnStartDate", () => {
    const billingRatios = getMockBillingRatios();
    const firstBillingRatioIndex = 0;

    it("should return a billing ratio which has billing ratio start date = student start date", () => {
        const firstBillingRatio = billingRatios[firstBillingRatioIndex];
        const startDate = firstBillingRatio.start_date;

        const selectedRatio = getBillingRatioBasedOnStartDate(billingRatios, startDate);
        expect(selectedRatio).toEqual(firstBillingRatio);
    });

    it("should return a billing ratio which has billing ratio start date < student start date < ratio end date", () => {
        const firstBillingRatio = billingRatios[firstBillingRatioIndex];
        const startDate = getDateWithDuration(firstBillingRatio.start_date, 1);

        const selectedRatio = getBillingRatioBasedOnStartDate(
            billingRatios,
            startDate.toISOString()
        );
        expect(selectedRatio).toEqual(firstBillingRatio);
    });

    it("should return a billing ratio which has ratio student start date = billing ratio end date", () => {
        const firstBillingRatio = billingRatios[firstBillingRatioIndex];
        const startDate = firstBillingRatio.end_date;

        const selectedRatio = getBillingRatioBasedOnStartDate(billingRatios, startDate);
        expect(selectedRatio).toEqual(firstBillingRatio);
    });
});

describe("canPeriodApplyRatio", () => {
    const billingPeriods = getMockBillingSchedulePeriods();
    const billingPeriod1 = billingPeriods[0];
    const billingPeriod2 = billingPeriods[1];

    it("should return true when billing period is the period has ratio and disable_pro_rating_flag is false", () => {
        const selectedPeriod = billingPeriod1;
        const applyRatioPeriod = billingPeriod1;
        const proRatingFlagDisabled = false;

        const canApplyRatio = canPeriodApplyRatio(
            selectedPeriod,
            applyRatioPeriod,
            proRatingFlagDisabled
        );

        expect(canApplyRatio).toBe(true);
    });

    it("should return false when billing period is the period has ratio and disable_pro_rating_flag is true", () => {
        const selectedPeriod = billingPeriod1;
        const applyRatioPeriod = billingPeriod1;
        const proRatingFlagDisabled = true;

        const canApplyRatio = canPeriodApplyRatio(
            selectedPeriod,
            applyRatioPeriod,
            proRatingFlagDisabled
        );

        expect(canApplyRatio).toBe(false);
    });

    it("should return false when billing period is not the period has ratio and disable_pro_rating_flag is false", () => {
        const selectedPeriod = billingPeriod1;
        const applyRatioPeriod = billingPeriod2;
        const proRatingFlagDisabled = false;

        const canApplyRatio = canPeriodApplyRatio(
            selectedPeriod,
            applyRatioPeriod,
            proRatingFlagDisabled
        );

        expect(canApplyRatio).toBe(false);
    });

    it("should return false when billing period is not the period has ratio and disable_pro_rating_flag is true", () => {
        const selectedPeriod = billingPeriod1;
        const applyRatioPeriod = billingPeriod2;
        const proRatingFlagDisabled = true;

        const canApplyRatio = canPeriodApplyRatio(
            selectedPeriod,
            applyRatioPeriod,
            proRatingFlagDisabled
        );

        expect(canApplyRatio).toBe(false);
    });
});

describe("getPeriodRatioDetails", () => {
    const billingPeriods = getMockBillingSchedulePeriods();
    const indexBP1 = 0;
    const indexBP2 = 1;

    it("should return correct billing ratio numerator and denominator", () => {
        const billingPeriod = billingPeriods[indexBP1];
        const periodWithBillingRatio = billingPeriods[indexBP1];
        const proRatingFlagDisabled = false;
        const startDate = periodWithBillingRatio.start_date;
        const { billingRatioNumerator, billingRatioDenominator } = getPeriodRatioDetails({
            billingPeriod,
            periodWithBillingRatio,
            proRatingFlagDisabled,
            startDate,
        });

        const selectedRatio = billingPeriod.billing_ratios[0];

        expect(billingRatioNumerator).toBe(selectedRatio.billing_ratio_numerator);
        expect(billingRatioDenominator).toBe(selectedRatio.billing_ratio_denominator);
    });

    it("should return billing ratio numerator and denominator with undefined value if pro rating flag is disabled", () => {
        const billingPeriod = billingPeriods[indexBP1];
        const periodWithBillingRatio = billingPeriods[indexBP1];
        const proRatingFlagDisabled = true;
        const startDate = periodWithBillingRatio.start_date;
        const { billingRatioNumerator, billingRatioDenominator } = getPeriodRatioDetails({
            billingPeriod,
            periodWithBillingRatio,
            proRatingFlagDisabled,
            startDate,
        });

        expect(billingRatioNumerator).toBe(undefined);
        expect(billingRatioDenominator).toBe(undefined);
    });

    it("should return billing ratio numerator and denominator with undefined value if start date is not in billing period", () => {
        const billingPeriod = billingPeriods[indexBP1];
        const periodWithBillingRatio = billingPeriods[indexBP2];
        const proRatingFlagDisabled = false;
        const startDate = periodWithBillingRatio.start_date;
        const { billingRatioNumerator, billingRatioDenominator } = getPeriodRatioDetails({
            billingPeriod,
            periodWithBillingRatio,
            proRatingFlagDisabled,
            startDate,
        });

        expect(billingRatioNumerator).toBe(undefined);
        expect(billingRatioDenominator).toBe(undefined);
    });
});
