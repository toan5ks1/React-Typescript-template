import { DateTime } from "luxon";
import { Entities } from "src/common/constants/enum";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";

import { Grid } from "@mui/material";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import DiscountAutocompleteHF from "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF";

import { getDatePickerMinMaxDates } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import { getEffectiveDateByStartDate } from "src/squads/payment/domains/OrderManagement/plugins/update-order/helpers/recurringProducts";
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

    const { updateOrderDetails } = productFieldArrayItem;

    const billingSchedulePeriods: BillingSchedulePeriod[] =
        updateOrderDetails?.reccuringDetails?.billingSchedulePeriods || [];

    const { calendarMaxDate } = getDatePickerMinMaxDates(billingSchedulePeriods);
    const startDate = updateOrderDetails?.reccuringDetails?.startDate;

    if (!startDate) return <></>;

    const minimumStartDate = getEffectiveDateByStartDate(startDate);
    const formattedMinimumStartDate = DateTime.fromJSDate(new Date(minimumStartDate));

    const isDiscountAutoCompleteReadOnly =
        updateOrderDetails.orderStatus === ProductListItemStatus.CANCELLED;

    return (
        <Grid container spacing={2} data-testid="ProductListItemDetails__productInfo">
            <Grid item xs={6}>
                <DiscountAutocompleteHF<OrderFormValues>
                    controllerProps={{
                        name: `students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.discount`,
                    }}
                    readOnly={isDiscountAutoCompleteReadOnly}
                />
            </Grid>
            <Grid item xs={6}>
                <DatePickerHF
                    name={`students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.updateOrderDetails.effectiveDate`}
                    label={tOrder("label.effectiveDate")}
                    minDate={formattedMinimumStartDate}
                    maxDate={calendarMaxDate}
                />
            </Grid>
        </Grid>
    );
};

export default RecurringProductDetails;
