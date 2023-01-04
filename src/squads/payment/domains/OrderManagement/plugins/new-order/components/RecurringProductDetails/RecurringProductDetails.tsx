import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";

import { Grid } from "@mui/material";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import DiscountAutoCompleteHF from "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF";

import { getDatePickerMinMaxDates } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface RecurringProductDetailsProps {
    productFieldArrayItem: ArrayElement<
        ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
    >;
    productFieldItemIndex: number;
    studentIndex: number;
}

const RecurringProductDetails = ({
    productFieldArrayItem,
    productFieldItemIndex,
    studentIndex,
}: RecurringProductDetailsProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { validationRules } = useOrderValidationRules();

    const { recurringDetails } = productFieldArrayItem;
    const billingSchedulePeriods: BillingSchedulePeriod[] =
        recurringDetails?.billingSchedulePeriods || [];

    const { calendarMinDate, calendarMaxDate } = getDatePickerMinMaxDates(billingSchedulePeriods);

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
                <DatePickerHF
                    InputProps={{
                        "data-testid": "RecurringProductDetail__startDate",
                    }}
                    name={`students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.recurringDetails.startDate`}
                    label={tOrder("label.startDate")}
                    rules={validationRules.startDate}
                    minDate={calendarMinDate}
                    maxDate={calendarMaxDate}
                />
            </Grid>
        </Grid>
    );
};

export default RecurringProductDetails;
