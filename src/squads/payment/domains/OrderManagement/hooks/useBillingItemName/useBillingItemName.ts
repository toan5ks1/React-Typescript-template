import { Entities } from "src/common/constants/enum";

import { BilledAtOrderRecurringProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export type UseBillingItemNameProps = Pick<
    BilledAtOrderRecurringProduct,
    | "productName"
    | "billingSchedulePeriodName"
    | "billingRatioNumerator"
    | "billingRatioDenominator"
>;

const useBillingItemName = ({
    productName,
    billingSchedulePeriodName,
    billingRatioNumerator,
    billingRatioDenominator,
}: UseBillingItemNameProps) => {
    const t = useResourceTranslate(Entities.ORDERS);
    const billingRatioLabel = t("label.billingRatio");

    if (billingSchedulePeriodName === undefined) return productName;

    let itemName = `${productName} - ${billingSchedulePeriodName}`;

    if (billingRatioNumerator === undefined || billingRatioDenominator === undefined)
        return itemName;

    return `${itemName} (${billingRatioLabel}: ${billingRatioNumerator}/${billingRatioDenominator})`;
};

export default useBillingItemName;
