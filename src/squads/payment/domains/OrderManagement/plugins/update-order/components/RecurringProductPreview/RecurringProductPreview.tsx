import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { getFormattedDate } from "src/squads/payment/utils/date";

import { Grid, Stack } from "@mui/material";
import DoubleDash from "src/components/DoubleDash";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface RecurringProductPreviewProps {
    productFieldArrayItem: ArrayElement<
        ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
    >;
    hasEffectiveDate?: boolean;
}

const RecurringProductPreview = ({
    productFieldArrayItem,
    hasEffectiveDate,
}: RecurringProductPreviewProps) => {
    const effectiveDate =
        productFieldArrayItem.updateOrderDetails?.effectiveDate.toISOString() ?? null;
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { discount } = productFieldArrayItem;

    return (
        <Grid container>
            <Grid item xs={8} pr={3}>
                <Stack>
                    <TypographyBase variant="caption" color="textSecondary">
                        {tOrder("label.discount")}
                    </TypographyBase>
                    <TypographyBase
                        variant="body2"
                        data-testid="RecurringProductPreview__discountName"
                    >
                        {discount ? <>{discount.name}</> : <DoubleDash />}
                    </TypographyBase>
                </Stack>
            </Grid>
            {hasEffectiveDate && (
                <Grid item xs={4}>
                    <Stack>
                        <TypographyBase variant="caption" color="textSecondary">
                            {tOrder("label.effectiveDate")}
                        </TypographyBase>
                        <TypographyBase
                            variant="body2"
                            data-testid="RecurringProductPreview__effectiveDate"
                        >
                            {getFormattedDate(effectiveDate)}
                        </TypographyBase>
                    </Stack>
                </Grid>
            )}
        </Grid>
    );
};

export default RecurringProductPreview;
