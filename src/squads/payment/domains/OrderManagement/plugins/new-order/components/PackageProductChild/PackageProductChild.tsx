import { useRef } from "react";

import { DateTime } from "luxon";

import { Grid } from "@mui/material";
import { CalendarPickerProps } from "@mui/x-date-pickers";
import DividerDashed from "src/components/Divider/DividerDashed";
import AssociatedProducts, {
    AssociatedProductsRef,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/AssociateProducts";
import PackageCourseDetails, {
    PackageCourseDetailsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseDetails";
import PackageProductDetails from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageProductDetails";

import { ProductChildProps } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

interface PackageProductChildProps extends ProductChildProps {
    packageType: PackageCourseDetailsProps["packageType"];
    calendarMinDate?: CalendarPickerProps<DateTime>["minDate"];
    calendarMaxDate?: CalendarPickerProps<DateTime>["maxDate"];
    isDatePickerDisabled?: boolean;
}

const PackageProductChild = ({
    productFieldArrayItem,
    productFieldItemIndex,
    studentIndex,
    packageType,
    calendarMinDate,
    calendarMaxDate,
    isDatePickerDisabled = true,
}: PackageProductChildProps) => {
    const associatedProductsListRef = useRef<AssociatedProductsRef>(null);

    return (
        <PackageProductDetails
            productFieldItemIndex={productFieldItemIndex}
            isDatePickerDisabled={isDatePickerDisabled}
            studentIndex={studentIndex}
            calendarMinDate={calendarMinDate}
            calendarMaxDate={calendarMaxDate}
            packageType={packageType}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <PackageCourseDetails
                        packageType={packageType}
                        productFieldArrayItem={productFieldArrayItem}
                        productFieldItemIndex={productFieldItemIndex}
                        studentIndex={studentIndex}
                        onPackageCoursesChange={() =>
                            associatedProductsListRef.current?.removeAllAssociatedProducts()
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <DividerDashed />
                </Grid>
                <Grid item xs={12}>
                    <AssociatedProducts
                        productFieldArrayItem={productFieldArrayItem}
                        productFieldItemIndex={productFieldItemIndex}
                        studentIndex={studentIndex}
                        ref={associatedProductsListRef}
                    />
                </Grid>
            </Grid>
        </PackageProductDetails>
    );
};

export default PackageProductChild;
