import { Entities } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { BillItemDescription } from "manabuf/payment/v1/order_pb";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface RecurringBillItemDescriptionCellProps {
    productName: BillItemDescription.AsObject["productName"];
    billingPeriodName?: BillItemDescription.AsObject["billingPeriodName"];
    billingRatioNumerator?: BillItemDescription.AsObject["billingRatioNumerator"];
    billingRatioDenominator?: BillItemDescription.AsObject["billingRatioDenominator"];
}

const RecurringBillItemDescriptionCell = ({
    productName,
    billingPeriodName,
    billingRatioNumerator,
    billingRatioDenominator,
}: RecurringBillItemDescriptionCellProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TypographyBase variant="body2">
                    {/* TODO: useBillingItemName once order detail PR with new response got merged */}
                    {`${productName} - ${billingPeriodName.value} (${tOrder(
                        "label.billingRatio"
                    )}: ${billingRatioNumerator.value}/${billingRatioDenominator.value})`}
                </TypographyBase>
            </Grid>
        </Grid>
    );
};

export default RecurringBillItemDescriptionCell;
