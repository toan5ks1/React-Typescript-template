import { OrderCurrency } from "src/squads/payment/constants/enum";
import {
    OrderFormProductSection,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingPackageProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import ProductUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/common/components/ProductUpcomingBilling";
import PackageBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageBilledAtOrder";
import PackageProductChild from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageProductChild";

import { PackageType } from "manabuf/payment/v1/enums_pb";
import { BillingItem, CourseItem } from "manabuf/payment/v1/order_pb";

import { getBillingItemProperties } from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import { getAssociatedProductBillingItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingItem";
import {
    getAssociatedProductsBillingSectionItems,
    getPackageBilledAtOrderItem,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingSection";
import { getNewOrderPackageOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import { getProductPriceWithSlot } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/price";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const getSlotBasedBillingItem = (
    productFieldArrayItem: ProductsFormValues,
    section: OrderFormProductSection
): Array<BillingItem.AsObject> => {
    const { product, productPrices, discount, productTax, packageCourses, associatedProducts } =
        productFieldArrayItem;
    let billingItems: Array<BillingItem.AsObject> = [];

    const productPriceWithSlot = getProductPriceWithSlot(packageCourses, productPrices);

    if (!product || !productPriceWithSlot || !packageCourses) return billingItems;

    const courseItemsList: CourseItem.AsObject[] = packageCourses.map(({ course, slot }) => ({
        courseId: course.course_id,
        courseName: course.name || "",
        slot,
    }));

    const { discountItem, taxItem, finalPrice } = getBillingItemProperties(
        discount,
        product.tax_id,
        productTax,
        productPriceWithSlot.price
    );

    section === "billedAtOrder" &&
        billingItems.push({
            productId: product.product_id!,
            billingSchedulePeriodId: productPriceWithSlot.billing_schedule_period_id,
            price: Number(productPriceWithSlot.price),
            taxItem,
            discountItem,
            finalPrice,
            quantity: Number(productPriceWithSlot.quantity),
            courseItemsList,
        });

    for (const associatedProduct of associatedProducts ?? []) {
        const associatedProductBillingItem = getAssociatedProductBillingItem(
            associatedProduct,
            section
        );

        associatedProductBillingItem && billingItems.push(associatedProductBillingItem);
    }

    return billingItems;
};

const generateProductPackageSlotBasedPlugin = (currency: OrderCurrency): OrderPluginFunctions => ({
    ProductChild: (props) => {
        return <PackageProductChild packageType={PackageType.PACKAGE_TYPE_SLOT_BASED} {...props} />;
    },

    generateBilledAtOrderBillingItems: (productFieldArrayItem): BilledAtOrderItemType[] => {
        const { packageCourses, productPrices, associatedProducts, product } =
            productFieldArrayItem;

        let billingItems: BilledAtOrderItemType[] = [];

        const productPriceWithSlot = getProductPriceWithSlot(packageCourses, productPrices);

        if (!productPriceWithSlot || !product) return billingItems;

        billingItems.push(
            getPackageBilledAtOrderItem(productFieldArrayItem, productPriceWithSlot.price, currency)
        );

        for (const associatedProduct of associatedProducts ?? []) {
            const associatedProductBillingItem = getAssociatedProductsBillingSectionItems(
                associatedProduct,
                productFieldArrayItem,
                currency
            );

            associatedProductBillingItem && billingItems.push(associatedProductBillingItem);
        }

        return billingItems;
    },

    generateUpcomingBillingBillingItems: (
        productFieldArrayItem: ProductsFormValues
    ): UpcomingBillingPackageProduct[] => {
        const { associatedProducts } = productFieldArrayItem;
        let billingItems: UpcomingBillingPackageProduct[] = [];

        for (const associatedProduct of associatedProducts ?? []) {
            const associatedProductBillingItem = getAssociatedProductsBillingSectionItems(
                associatedProduct,
                productFieldArrayItem,
                currency,
                "upcomingBilling"
            );

            associatedProductBillingItem && billingItems.push(associatedProductBillingItem);
        }

        return billingItems;
    },

    BilledAtOrderChild: ({ billedAtOrderItem }) => (
        <PackageBilledAtOrder billedAtOrderItem={billedAtOrderItem} />
    ),

    UpcomingBillingChild: ({ upcomingBillingProduct }) => (
        <ProductUpcomingBilling upcomingBillingProduct={upcomingBillingProduct} />
    ),

    getBillingItems: (productFieldArrayItem) =>
        getSlotBasedBillingItem(productFieldArrayItem, "billedAtOrder"),

    getUpcomingBillingItems: (productFieldArrayItem) =>
        getSlotBasedBillingItem(productFieldArrayItem, "upcomingBilling"),

    getOrderItem: (productFieldArrayItem) => getNewOrderPackageOrderItem(productFieldArrayItem),
});

export default generateProductPackageSlotBasedPlugin;
