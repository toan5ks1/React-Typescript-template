import { Grid } from "@mui/material";
import BilledAtOrderItem from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderItem";
import { BilledAtOrderRecurringProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName";

export interface RecurringProductBilledAtOrderProps {
    billedAtOrderItem: BilledAtOrderRecurringProduct;
}

const RecurringProductBilledAtOrder = ({
    billedAtOrderItem,
}: RecurringProductBilledAtOrderProps) => {
    const {
        productName,
        productPrice,
        discountName,
        discountPrice,
        currency,
        billingSchedulePeriodName,
        billingRatioNumerator,
        billingRatioDenominator,
    } = billedAtOrderItem;

    const itemName = useBillingItemName({
        productName,
        billingSchedulePeriodName,
        billingRatioNumerator,
        billingRatioDenominator,
    });

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} data-testid="BilledAtOrderProduct__productContainer">
                <BilledAtOrderItem
                    itemName={itemName}
                    itemPrice={productPrice}
                    currency={currency}
                />
            </Grid>
            {discountName && (
                <Grid item xs={12} data-testid="BilledAtOrderProduct__discountContainer">
                    <BilledAtOrderItem
                        itemName={discountName}
                        itemPrice={discountPrice}
                        variant="caption"
                        currency={currency}
                        isDiscount={true}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default RecurringProductBilledAtOrder;
