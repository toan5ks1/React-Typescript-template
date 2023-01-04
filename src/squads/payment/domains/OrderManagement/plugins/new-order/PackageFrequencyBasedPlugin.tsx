import { OrderCurrency } from "src/squads/payment/constants/enum";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";

import { BilledAtOrderPackageProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingPackageProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import PackageBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageBilledAtOrder";
import PackageProductChild from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageProductChild";
import PackageUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageUpcomingBilling";

import { PackageType } from "manabuf/payment/v1/enums_pb";

import { getDatePickerMinMaxDates } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import {
    getAssociatedProductBillingItem,
    getFrequencyBasedPackageBillingItems,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingItem";
import {
    generateFrequencyBasedPackageSectionItem,
    getAssociatedProductsBillingSectionItems,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingSection";
import { getNewOrderFrequencyBasedPackageOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const generateProductPackageFrequencyBasedPlugin = (
    currency: OrderCurrency
): OrderPluginFunctions => ({
    ProductChild: (props) => {
        const { productFieldArrayItem } = props;
        const { recurringDetails } = productFieldArrayItem;
        let billingSchedulePeriods: BillingSchedulePeriod[] = [];

        if (recurringDetails) {
            billingSchedulePeriods = recurringDetails.billingSchedulePeriods || [];
        }

        const { calendarMinDate, calendarMaxDate } =
            getDatePickerMinMaxDates(billingSchedulePeriods);

        const finalProps = {
            ...props,
            calendarMinDate,
            calendarMaxDate,
            isDatePickerDisabled: false,
        };

        return (
            <PackageProductChild packageType={PackageType.PACKAGE_TYPE_FREQUENCY} {...finalProps} />
        );
    },

    generateBilledAtOrderBillingItems: (productFieldArrayItem): BilledAtOrderPackageProduct[] => {
        const billedAtOrderBillingItems: BilledAtOrderPackageProduct[] =
            generateFrequencyBasedPackageSectionItem({
                productFieldArrayItem,
                currency,
                section: "billedAtOrder",
                orderDate: new Date().toISOString(),
            });

        for (const associatedProduct of productFieldArrayItem.associatedProducts ?? []) {
            const associatedProductBillAtOrderBillingItem =
                getAssociatedProductsBillingSectionItems(
                    associatedProduct,
                    productFieldArrayItem,
                    currency,
                    "billedAtOrder"
                );

            associatedProductBillAtOrderBillingItem &&
                billedAtOrderBillingItems.push(associatedProductBillAtOrderBillingItem);
        }

        return billedAtOrderBillingItems;
    },

    generateUpcomingBillingBillingItems: (
        productFieldArrayItem
    ): UpcomingBillingPackageProduct[] => {
        const upcomingBillingItem: UpcomingBillingPackageProduct[] =
            generateFrequencyBasedPackageSectionItem({
                productFieldArrayItem,
                currency,
                section: "upcomingBilling",
                orderDate: new Date().toISOString(),
            });

        for (const associatedProduct of productFieldArrayItem.associatedProducts ?? []) {
            const associatedProductUpcomingBillingItem = getAssociatedProductsBillingSectionItems(
                associatedProduct,
                productFieldArrayItem,
                currency,
                "upcomingBilling"
            );

            associatedProductUpcomingBillingItem &&
                upcomingBillingItem.push(associatedProductUpcomingBillingItem);
        }

        return upcomingBillingItem;
    },

    BilledAtOrderChild: ({ billedAtOrderItem }) => {
        return <PackageBilledAtOrder billedAtOrderItem={billedAtOrderItem} />;
    },

    UpcomingBillingChild: ({ upcomingBillingProduct }) => {
        return <PackageUpcomingBilling upcomingBillingItem={upcomingBillingProduct} />;
    },

    getBillingItems: (productFieldArrayItem) => {
        const billingItems = getFrequencyBasedPackageBillingItems({
            productFieldArrayItem,
            section: "billedAtOrder",
            orderDate: new Date().toISOString(),
        });

        for (const associatedProduct of productFieldArrayItem.associatedProducts ?? []) {
            const associatedProductBillingItem = getAssociatedProductBillingItem(
                associatedProduct,
                "billedAtOrder"
            );

            associatedProductBillingItem && billingItems.push(associatedProductBillingItem);
        }

        return billingItems;
    },

    getUpcomingBillingItems: (productFieldArrayItem) => {
        const upcomingBillingItems = getFrequencyBasedPackageBillingItems({
            productFieldArrayItem,
            section: "upcomingBilling",
            orderDate: new Date().toISOString(),
        });

        for (const associatedProduct of productFieldArrayItem.associatedProducts ?? []) {
            const associatedProductBillingItem = getAssociatedProductBillingItem(
                associatedProduct,
                "upcomingBilling"
            );

            associatedProductBillingItem && upcomingBillingItems.push(associatedProductBillingItem);
        }

        return upcomingBillingItems;
    },

    getOrderItem: (productFieldArrayItem) => {
        return getNewOrderFrequencyBasedPackageOrderItem(productFieldArrayItem);
    },
});

export default generateProductPackageFrequencyBasedPlugin;
