import { DateTime } from "luxon";
import { Entities } from "src/common/constants/enum";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { Grid } from "@mui/material";
import { CalendarPickerProps } from "@mui/x-date-pickers";
import DatePickerHF from "src/components/DatePickers/DatePickerHF";
import DividerDashed from "src/components/Divider/DividerDashed";
import DiscountAutoCompleteHF from "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF";
import { PackageCourseDetailsProps } from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails";

import { PackageType } from "manabuf/payment/v1/enums_pb";

import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface PackageProductDetailsProps {
    productFieldItemIndex: number;
    studentIndex: number;
    isDatePickerDisabled: boolean;
    children: React.ReactNode;
    calendarMinDate?: CalendarPickerProps<DateTime>["minDate"];
    calendarMaxDate?: CalendarPickerProps<DateTime>["maxDate"];
    packageType: PackageCourseDetailsProps["packageType"];
}

const getStartDateFieldPath = (packageType: PackageCourseDetailsProps["packageType"]) => {
    switch (packageType) {
        case PackageType.PACKAGE_TYPE_SCHEDULED:
        case PackageType.PACKAGE_TYPE_FREQUENCY:
            return "recurringDetails.startDate";

        default:
            return "packageEntity.package_start_date";
    }
};

const PackageProductDetails = ({
    productFieldItemIndex,
    studentIndex,
    isDatePickerDisabled,
    children,
    calendarMinDate,
    calendarMaxDate,
    packageType,
}: PackageProductDetailsProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const startDateFieldPath = getStartDateFieldPath(packageType);
    const { validationRules } = useOrderValidationRules();

    return (
        <Grid container spacing={2} data-testid="PackageProductDetails__packageInfo" mt={-2}>
            <Grid item xs={6}>
                <DiscountAutoCompleteHF<OrderFormValues>
                    controllerProps={{
                        name: `students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.discount`,
                    }}
                />
            </Grid>
            <Grid item xs={6}>
                <DatePickerHF
                    // TODO: https://manabie.atlassian.net/browse/LT-20003
                    name={`students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.${startDateFieldPath}`}
                    readOnly={isDatePickerDisabled}
                    label={tOrder("label.startDate")}
                    minDate={calendarMinDate}
                    maxDate={calendarMaxDate}
                    rules={validationRules.startDate}
                    InputProps={{
                        "data-testid": "RecurringProductDetail__startDate",
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <DividerDashed />
            </Grid>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
};

export default PackageProductDetails;
