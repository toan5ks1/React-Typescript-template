import { Grid } from "@mui/material";
import BilledAtOrderItem from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderItem";
import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

export interface OneTimeProductBilledAtOrderProps {
    billedAtOrderItem: BilledAtOrderItemType;
}

const OneTimeProductBilledAtOrder = ({ billedAtOrderItem }: OneTimeProductBilledAtOrderProps) => {
    const { productName, productPrice, discountName, discountPrice, currency } = billedAtOrderItem;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} data-testid="BilledAtOrderProduct__productContainer">
                <BilledAtOrderItem
                    itemName={productName}
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

export default OneTimeProductBilledAtOrder;
