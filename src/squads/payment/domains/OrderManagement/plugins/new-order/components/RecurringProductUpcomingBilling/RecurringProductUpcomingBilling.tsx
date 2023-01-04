import { getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { getFormattedDate } from "src/squads/payment/utils/date";

import { Box, Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { UpcomingBillingRecurringProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName";

export interface RecurringProductUpcomingBillingProps {
    upcomingBillingItem: UpcomingBillingRecurringProduct;
}

const RecurringProductUpcomingBilling = ({
    upcomingBillingItem,
}: RecurringProductUpcomingBillingProps) => {
    const {
        productName,
        productPrice,
        discountName,
        discountPrice,
        currency,
        billingDate,
        billingSchedulePeriodName,
        billingRatioNumerator,
        billingRatioDenominator,
    } = upcomingBillingItem;

    const formattedBillingDate = getFormattedDate(billingDate);

    const totalPrice = productPrice - discountPrice;

    const billingItemName = useBillingItemName({
        productName,
        billingSchedulePeriodName,
        billingRatioNumerator,
        billingRatioDenominator,
    });

    return (
        <Grid container spacing={1} data-testid="UpcomingBillingProduct__root">
            <Grid item xs={9}>
                <TypographyBase
                    variant="body2"
                    color="textPrimary"
                    data-testid="UpcomingBillingProduct__name"
                >
                    {billingItemName}
                </TypographyBase>
            </Grid>
            <Grid item xs={3}>
                <Box textAlign="end">
                    <TypographyBase
                        variant="body2"
                        color="textPrimary"
                        data-testid="UpcomingBillingProduct__price"
                    >
                        {getFormattedItemPrice(currency, false, totalPrice)}
                    </TypographyBase>
                </Box>
            </Grid>
            {discountName && (
                <Grid item xs={12}>
                    <TypographyBase
                        variant="caption"
                        color="textSecondary"
                        data-testid="UpcomingBillingProduct__discount"
                    >
                        {discountName}
                    </TypographyBase>
                </Grid>
            )}
            <Grid item xs={12}>
                <TypographyBase
                    variant="caption"
                    color="textSecondary"
                    data-testid="UpcomingBillingProduct__billingDate"
                >
                    {formattedBillingDate}
                </TypographyBase>
            </Grid>
        </Grid>
    );
};

export default RecurringProductUpcomingBilling;
