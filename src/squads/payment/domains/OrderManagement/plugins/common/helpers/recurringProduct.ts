import { DateTime } from "luxon";
import { arrayHasItem } from "src/common/utils/other";
import {
    calculatePriceWithBillingRatio,
    getDiscountPriceByType,
} from "src/squads/payment/helpers/price";
import { OrderFormProductSection } from "src/squads/payment/types/form/order-form-types";
import { BillingRatio } from "src/squads/payment/types/service/bill-ratio-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { dateIsAfter, dateIsSameOrAfter } from "src/squads/payment/utils/date";

interface GetBillingPeriodProps {
    billingPeriods: BillingSchedulePeriod[];
    startDate: string;
    orderDate: string;
}

export const getDatePickerMinMaxDates = (
    billingSchedulePeriods: BillingSchedulePeriod[]
): {
    calendarMinDate: DateTime | undefined;
    calendarMaxDate: DateTime | undefined;
} => {
    const scheduleStartDate = arrayHasItem(billingSchedulePeriods)
        ? billingSchedulePeriods[0].start_date
        : undefined;
    const scheduleEndDate = arrayHasItem(billingSchedulePeriods)
        ? billingSchedulePeriods[billingSchedulePeriods.length - 1].end_date
        : undefined;

    const calendarMinDate = scheduleStartDate
        ? DateTime.fromJSDate(new Date(scheduleStartDate))
        : undefined;
    const calendarMaxDate = scheduleEndDate
        ? DateTime.fromJSDate(new Date(scheduleEndDate))
        : undefined;

    return { calendarMinDate, calendarMaxDate };
};

export const getBilledAtOrderBillingPeriods = ({
    billingPeriods,
    startDate,
    orderDate,
}: GetBillingPeriodProps): BillingSchedulePeriod[] => {
    const billingPeriodsBeforeOrderDate = billingPeriods.filter((period) => {
        return dateIsSameOrAfter(new Date(orderDate), new Date(period.billing_date));
    });

    if (billingPeriodsBeforeOrderDate.length === 0) return [];

    return billingPeriodsBeforeOrderDate.filter((period) => {
        return dateIsSameOrAfter(new Date(period.end_date), new Date(startDate));
    });
};

export const getUpcomingBillingPeriods = ({
    billingPeriods,
    startDate,
    orderDate,
}: GetBillingPeriodProps): BillingSchedulePeriod[] => {
    const upcomingBillingPeriods = billingPeriods.filter((period) => {
        return dateIsAfter(new Date(period.billing_date), new Date(orderDate));
    });

    if (upcomingBillingPeriods.length === 0) return [];

    const upcomingBillingPeriod = upcomingBillingPeriods.find((period) => {
        return dateIsSameOrAfter(new Date(period.end_date), new Date(startDate));
    });

    if (!upcomingBillingPeriod) return [];

    return [upcomingBillingPeriod];
};

export const getBillingPeriods = ({
    billingPeriods,
    startDate,
    orderDate,
    billingSection,
}: {
    billingPeriods: BillingSchedulePeriod[];
    startDate: string;
    orderDate: string;
    billingSection: OrderFormProductSection;
}): BillingSchedulePeriod[] => {
    const billingPeriodsProps: GetBillingPeriodProps = {
        billingPeriods,
        startDate,
        orderDate,
    };

    const availableBillingPeriods =
        billingSection === "billedAtOrder"
            ? getBilledAtOrderBillingPeriods(billingPeriodsProps)
            : getUpcomingBillingPeriods(billingPeriodsProps);

    return availableBillingPeriods;
};

export const getPeriodWithBillingRatio = (
    billingPeriods: BillingSchedulePeriod[],
    startDate: string
): BillingSchedulePeriod | undefined => {
    return billingPeriods.find((period) =>
        dateIsSameOrAfter(new Date(period.end_date), new Date(startDate))
    );
};

export const getDiscountApplicablePeriodIds = (
    billingPeriods: BillingSchedulePeriod[],
    startDate: string,
    discount?: ProductDiscountType | null
): Array<BillingSchedulePeriod["billing_schedule_period_id"]> => {
    if (!discount) return [];

    const discountApplicableBillingPeriods = billingPeriods.filter((period) =>
        dateIsSameOrAfter(new Date(period.end_date), new Date(startDate))
    );

    const discountDuration = discount?.recurring_valid_duration ?? null;

    return discountApplicableBillingPeriods
        .filter((_, index) => {
            return discountDuration === null || discountDuration >= index + 1;
        })
        .map((period) => period.billing_schedule_period_id);
};

export const canPeriodApplyRatio = (
    billingPeriod: BillingSchedulePeriod,
    periodWithBillingRatio?: BillingSchedulePeriod,
    proRatingFlagDisabled?: boolean
): boolean => {
    return (
        billingPeriod.billing_schedule_period_id ===
            periodWithBillingRatio?.billing_schedule_period_id && !proRatingFlagDisabled
    );
};

export const getBillingRatioBasedOnStartDate = (
    billingRatios: BillingRatio[],
    startDate: string
): BillingRatio | undefined => {
    // Find the ratio which has billing ratio start date <= startDate <= billing ratio end date
    return billingRatios.find(
        (ratio) =>
            dateIsSameOrAfter(new Date(startDate), new Date(ratio.start_date)) &&
            dateIsSameOrAfter(new Date(ratio.end_date), new Date(startDate))
    );
};

export const getPeriodRatioDetails = ({
    billingPeriod,
    periodWithBillingRatio,
    proRatingFlagDisabled,
    startDate,
}: {
    billingPeriod: BillingSchedulePeriod;
    periodWithBillingRatio?: BillingSchedulePeriod;
    proRatingFlagDisabled?: boolean;
    startDate: string;
}): {
    billingRatioNumerator: number | undefined;
    billingRatioDenominator: number | undefined;
} => {
    const noneBillingRatio = {
        billingRatioNumerator: undefined,
        billingRatioDenominator: undefined,
    };

    const hasRatio = canPeriodApplyRatio(
        billingPeriod,
        periodWithBillingRatio,
        proRatingFlagDisabled
    );

    if (!hasRatio) return noneBillingRatio;

    const billingRatio: BillingRatio | undefined = getBillingRatioBasedOnStartDate(
        billingPeriod.billing_ratios,
        startDate
    );

    if (!billingRatio) return noneBillingRatio;
    return {
        billingRatioNumerator: billingRatio.billing_ratio_numerator,
        billingRatioDenominator: billingRatio.billing_ratio_denominator,
    };
};

export const getBillingItemPrice = ({
    productPrices,
    billingPeriodId,
    billingRatioNumerator,
    billingRatioDenominator,
}: {
    productPrices: ProductPriceType[];
    billingPeriodId: BillingSchedulePeriod["billing_schedule_period_id"];
    billingRatioNumerator: number | undefined;
    billingRatioDenominator: number | undefined;
}): number => {
    const productPrice = productPrices?.find(
        (price) => price.billing_schedule_period_id === billingPeriodId
    );

    return calculatePriceWithBillingRatio({
        productPrice: productPrice?.price!,
        billingRatioNumerator,
        billingRatioDenominator,
    });
};

export const getBillingDiscountDetails = (
    productPrice: number,
    discount?: ProductDiscountType | null,
    discountAbility?: boolean
): { discountName: string; discountAmount: number } => {
    if (!discount || !discountAbility)
        return {
            discountName: "",
            discountAmount: 0,
        };

    return {
        discountName: discount.name,
        discountAmount: getDiscountPriceByType(discount, productPrice),
    };
};
