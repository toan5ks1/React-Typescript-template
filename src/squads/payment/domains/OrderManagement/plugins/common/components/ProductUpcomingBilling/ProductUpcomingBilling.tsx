import { getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { getFormattedDate } from "src/squads/payment/utils/date";

import { Box, Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { UpcomingBillingItemType } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

export interface ProductUpcomingBillingProps {
    upcomingBillingProduct: UpcomingBillingItemType;
    children?: React.ReactNode;
}

const ProductUpcomingBilling = ({
    upcomingBillingProduct,
    children,
}: ProductUpcomingBillingProps) => {
    const { productName, productPrice, discountName, discountPrice, currency, billingDate } =
        upcomingBillingProduct;

    const formattedBillingDate = getFormattedDate(billingDate);

    const totalPrice = productPrice - discountPrice;

    return (
        <Grid container spacing={1} data-testid="UpcomingBillingProduct__root">
            <Grid item xs={9}>
                <TypographyBase
                    variant="body2"
                    color="textPrimary"
                    data-testid="UpcomingBillingProduct__name"
                >
                    {productName}
                </TypographyBase>
                {children}
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

export default ProductUpcomingBilling;
