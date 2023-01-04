import { OrderCurrency } from "src/squads/payment/constants/enum";
import { BillingSchedulePeriod } from "src/squads/payment/types/service/billing-schedule-period-types";

import { BilledAtOrderPackageProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingPackageProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import PackageBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageBilledAtOrder";
import PackageProductChild from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageProductChild";
import PackageUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageUpcomingBilling/PackageUpcomingBilling";

import { PackageType } from "manabuf/payment/v1/enums_pb";
import { BillingItem, OrderItem } from "manabuf/payment/v1/order_pb";

import { getDatePickerMinMaxDates } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/recurringProduct";
import { getScheduleBasedPackageBillingItems } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingItem";
import {
    generateScheduleBasedPackageSectionItem,
    getAssociatedProductsBillingSectionItems,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingSection";
import { getNewOrderScheduleBasedPackageOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const generateProductScheduleBasedPackagePlugin = (
    currency: OrderCurrency
): OrderPluginFunctions => {
    const productPackageScheduleBasedPlugin: OrderPluginFunctions = {
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
                <PackageProductChild
                    packageType={PackageType.PACKAGE_TYPE_SCHEDULED}
                    {...finalProps}
                />
            );
        },

        generateBilledAtOrderBillingItems: (
            productFieldArrayItem
        ): BilledAtOrderPackageProduct[] => {
            const billingItems: BilledAtOrderPackageProduct[] =
                generateScheduleBasedPackageSectionItem({
                    productFieldArrayItem,
                    currency,
                    orderDate: new Date().toISOString(),
                    section: "billedAtOrder",
                });

            for (const associatedProduct of productFieldArrayItem.associatedProducts ?? []) {
                const associatedProductBillAtOrderBillingItem =
                    getAssociatedProductsBillingSectionItems(
                        associatedProduct,
                        productFieldArrayItem,
                        currency
                    );

                associatedProductBillAtOrderBillingItem &&
                    billingItems.push(associatedProductBillAtOrderBillingItem);
            }

            return billingItems;
        },

        generateUpcomingBillingBillingItems: (
            productFieldArrayItem
        ): UpcomingBillingPackageProduct[] => {
            const billingItems: UpcomingBillingPackageProduct[] =
                generateScheduleBasedPackageSectionItem({
                    productFieldArrayItem,
                    currency,
                    orderDate: new Date().toISOString(),
                    section: "upcomingBilling",
                });

            for (const associatedProduct of productFieldArrayItem.associatedProducts ?? []) {
                const associatedProductUpcomingBillingBillingItem =
                    getAssociatedProductsBillingSectionItems(
                        associatedProduct,
                        productFieldArrayItem,
                        currency,
                        "upcomingBilling"
                    );

                associatedProductUpcomingBillingBillingItem &&
                    billingItems.push(associatedProductUpcomingBillingBillingItem);
            }

            return billingItems;
        },

        BilledAtOrderChild: ({ billedAtOrderItem }) => {
            return <PackageBilledAtOrder billedAtOrderItem={billedAtOrderItem} />;
        },

        UpcomingBillingChild: ({ upcomingBillingProduct }) => {
            return <PackageUpcomingBilling upcomingBillingItem={upcomingBillingProduct} />;
        },

        getBillingItems: (productFieldArrayItem): Array<BillingItem.AsObject> => {
            return getScheduleBasedPackageBillingItems({
                productFieldArrayItem,
                section: "billedAtOrder",
                orderDate: new Date().toISOString(),
            });
        },

        getUpcomingBillingItems: (productFieldArrayItem): Array<BillingItem.AsObject> => {
            return getScheduleBasedPackageBillingItems({
                productFieldArrayItem,
                section: "upcomingBilling",
                orderDate: new Date().toISOString(),
            });
        },

        getOrderItem: (productFieldArrayItem): OrderItem.AsObject => {
            return getNewOrderScheduleBasedPackageOrderItem(productFieldArrayItem);
        },
    };
    return productPackageScheduleBasedPlugin;
};

export default generateProductScheduleBasedPackagePlugin;
