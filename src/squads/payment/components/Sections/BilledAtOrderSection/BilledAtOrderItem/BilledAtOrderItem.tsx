import { OrderCurrency } from "src/squads/payment/constants/enum";
import { getFormattedItemPrice } from "src/squads/payment/helpers/price";

import { Box, Grid, TypographyVariant } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface BilledAtOrderItemProps {
    itemName: string;
    itemPrice: number;
    variant?: TypographyVariant;
    currency: OrderCurrency;
    isDiscount?: boolean;
    children?: React.ReactNode;
}

const BilledAtOrderItem = ({
    itemName,
    itemPrice,
    currency,
    variant = "body2",
    isDiscount = false,
    children,
}: BilledAtOrderItemProps) => {
    const color = variant === "caption" ? "textSecondary" : "textPrimary";

    return (
        <Grid container data-testid="BilledAtOrderItem__container">
            <Grid item xs={9}>
                <TypographyBase
                    variant={variant}
                    color={color}
                    data-testid="BilledAtOrderItem__name"
                >
                    {itemName}
                </TypographyBase>
                {children}
            </Grid>
            <Grid item xs={3}>
                <Box textAlign="end">
                    <TypographyBase
                        variant={variant}
                        color={color}
                        data-testid="BilledAtOrderItem__price"
                    >
                        {getFormattedItemPrice(currency, isDiscount, itemPrice)}
                    </TypographyBase>
                </Box>
            </Grid>
        </Grid>
    );
};

export default BilledAtOrderItem;
