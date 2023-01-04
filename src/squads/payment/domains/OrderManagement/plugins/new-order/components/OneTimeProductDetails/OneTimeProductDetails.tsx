import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { getFormattedDate } from "src/squads/payment/utils/date";

import { Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import DiscountAutoCompleteHF from "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface OneTimeProductDetailsProps {
    productFieldArrayItem: ArrayElement<
        ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
    >;
    productFieldItemIndex: number;
    studentIndex: number;
}

const OneTimeProductDetails = ({
    productFieldArrayItem,
    productFieldItemIndex,
    studentIndex,
}: OneTimeProductDetailsProps) => {
    const billingDate = productFieldArrayItem.material?.custom_billing_date;
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <Grid container spacing={2} data-testid="ProductListItemDetails__productInfo">
            <Grid item xs={6}>
                <DiscountAutoCompleteHF<OrderFormValues>
                    controllerProps={{
                        name: `students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.discount`,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <Grid container>
                    <Grid item xs={12}>
                        <TypographyBase variant="caption" color="textSecondary">
                            {tOrder("label.billingDate")}
                        </TypographyBase>
                    </Grid>
                    <Grid item xs={12}>
                        <TypographyBase
                            variant="body2"
                            data-testid="ProductListItemDetails__billingDate"
                        >
                            {getFormattedDate(billingDate)}
                        </TypographyBase>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default OneTimeProductDetails;
