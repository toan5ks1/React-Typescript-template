import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";

import { UpcomingBillingPackageProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import ProductUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/common/components/ProductUpcomingBilling";
import PackageCourseBilledAtOrderDetail from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseBilledDetail";

import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface PackageUpcomingBillingProps {
    upcomingBillingItem: UpcomingBillingPackageProduct;
}

const PackageUpcomingBilling = ({ upcomingBillingItem }: PackageUpcomingBillingProps) => {
    const {
        packageCourses,
        productAndProductExtension,
        productName,
        billingRatioDenominator,
        billingRatioNumerator,
        billingSchedulePeriodName,
    } = upcomingBillingItem;

    const tOrder = useResourceTranslate(Entities.ORDERS);

    const packageCourseDetail = useMemo(() => {
        switch (productAndProductExtension.productExtensionType) {
            case "PACKAGE_TYPE_SCHEDULED":
                return <PackageCourseBilledAtOrderDetail packageCourses={packageCourses} />;
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
        <ProductUpcomingBilling
            upcomingBillingProduct={{
                ...upcomingBillingItem,
                productName: itemName,
            }}
        >
            {packageCourseDetail}
        </ProductUpcomingBilling>
    );
};

export default PackageUpcomingBilling;
