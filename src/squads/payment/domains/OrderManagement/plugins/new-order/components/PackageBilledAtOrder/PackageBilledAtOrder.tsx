import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import BilledAtOrderItem from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderItem";
import { BilledAtOrderPackageProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import PackageCourseBilledAtOrderDetail from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseBilledDetail";

import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface PackageBilledAtOrderProps {
    billedAtOrderItem: BilledAtOrderPackageProduct;
}

const PackageBilledAtOrder = ({ billedAtOrderItem }: PackageBilledAtOrderProps) => {
    const {
        productName,
        productPrice,
        discountName,
        discountPrice,
        currency,
        packageCourses,
        productAndProductExtension,
        billingRatioDenominator,
        billingRatioNumerator,
        billingSchedulePeriodName,
    } = billedAtOrderItem;

    const tOrder = useResourceTranslate(Entities.ORDERS);

    const packageCourseDetail = useMemo(() => {
        switch (productAndProductExtension.productExtensionType) {
            case "PACKAGE_TYPE_ONE_TIME":
            case "PACKAGE_TYPE_SCHEDULED":
                return <PackageCourseBilledAtOrderDetail packageCourses={packageCourses} />;
            case "PACKAGE_TYPE_SLOT_BASED":
                return (
                    <PackageCourseBilledAtOrderDetail
                        packageCourses={packageCourses}
                        renderCourseSlot={(slot) => ` (${slot})`}
                    />
                );
            case "PACKAGE_TYPE_FREQUENCY":
                return (
                    <PackageCourseBilledAtOrderDetail
                        packageCourses={packageCourses}
                        renderCourseSlot={(slot) => ` (${slot}/${tOrder("label.wk")})`}
                    />
                );
            case "PACKAGE_TYPE_NONE":
                return <></>;
        }
    }, [packageCourses, productAndProductExtension.productExtensionType, tOrder]);

    const itemNameWithPeriod = useBillingItemName({
        productName: productName,
        billingSchedulePeriodName,
        billingRatioNumerator,
        billingRatioDenominator,
    });

    const itemName = useMemo((): string => {
        switch (productAndProductExtension.productExtensionType) {
            case "PACKAGE_TYPE_SCHEDULED":
                return itemNameWithPeriod;
            case "PACKAGE_TYPE_FREQUENCY":
                return itemNameWithPeriod;
            case "PACKAGE_TYPE_NONE":
                return "";
            default:
                return productName;
        }
    }, [itemNameWithPeriod, productAndProductExtension.productExtensionType, productName]);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} data-testid="PackageBilledAtOrder__productContainer">
                <BilledAtOrderItem itemName={itemName} itemPrice={productPrice} currency={currency}>
                    {packageCourseDetail}
                </BilledAtOrderItem>
            </Grid>
            {discountName && (
                <Grid item xs={12} data-testid="PackageBilledAtOrder__discountContainer">
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

export default PackageBilledAtOrder;
