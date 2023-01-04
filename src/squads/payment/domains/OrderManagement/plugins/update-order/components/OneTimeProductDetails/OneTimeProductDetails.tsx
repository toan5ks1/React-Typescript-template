import { Entities } from "src/common/constants/enum";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { Grid } from "@mui/material";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
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
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { updateOrderDetails } = productFieldArrayItem;

    if (!updateOrderDetails) {
        return <></>;
    }

    const isDiscountAutoCompleteReadOnly =
        updateOrderDetails.orderStatus === ProductListItemStatus.CANCELLED;
    return (
        <Grid container spacing={2} data-testid="ProductListItemDetails__productInfo">
            <Grid item xs={6}>
                <DiscountAutoCompleteHF<OrderFormValues>
                    controllerProps={{
                        name: `students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.discount`,
                    }}
                    readOnly={isDiscountAutoCompleteReadOnly}
                />
            </Grid>
            <Grid item xs={6}>
                <DatePickerHF
                    // TODO: https://manabie.atlassian.net/browse/LT-17667
                    name={`students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.updateOrderDetails.effectiveDate`}
                    readOnly
                    label={tOrder("label.effectiveDate")}
                />
            </Grid>
        </Grid>
    );
};

export default OneTimeProductDetails;
