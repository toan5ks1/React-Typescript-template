import { OrderCurrency } from "src/squads/payment/constants/enum";
import {
    OrderFormProductSection,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";

import { BilledAtOrderPackageProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { UpcomingBillingPackageProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import ProductUpcomingBilling from "src/squads/payment/domains/OrderManagement/plugins/common/components/ProductUpcomingBilling";
import PackageBilledAtOrder from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageBilledAtOrder";
import PackageProductChild from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageProductChild";

import { PackageType } from "manabuf/payment/v1/enums_pb";
import { BillingItem } from "manabuf/payment/v1/order_pb";

import {
    getBillingItemProperties,
    mapProductDetailsToBillingItem,
} from "src/squads/payment/domains/OrderManagement/plugins/common/helpers/billingItem";
import { getAssociatedProductBillingItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingItem";
import {
    getAssociatedProductsBillingSectionItems,
    getPackageBilledAtOrderItem,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/billingSection";
import { getNewOrderPackageOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const getOneTimePackageBillingItems = (
    productFieldArrayItem: ProductsFormValues,
    section: OrderFormProductSection
) => {
    const { product, productPrices, discount, productTax, packageCourses, associatedProducts } =
        productFieldArrayItem;
    let billingItems: Array<BillingItem.AsObject> = [];

    const productCourses = productFieldArrayItem.packageCourses;

    const totalCoursesWeight = productCourses?.reduce(
        (totalWeight, currentProduct) =>
            (totalWeight = totalWeight + currentProduct.packageCourse.course_weight),
        0
    );

    const productPriceByWeight = productPrices?.find(
        (productPrice) => productPrice.quantity === totalCoursesWeight
    );

    if (!packageCourses || !productPriceByWeight || !product) {
        return billingItems;
    }

    const courseItemsList =
        packageCourses?.map((courseItem) => {
            return {
                courseId: courseItem.course.course_id,
                courseName: courseItem.course.name!,
                weight: courseItem.packageCourse.course_weight,
            };
        }) || [];

    const { discountItem, taxItem, finalPrice } = getBillingItemProperties(
        discount,
        product.tax_id,
        productTax,
        productPriceByWeight?.price
    );

    if (section === "billedAtOrder") {
        const billItemDetails = mapProductDetailsToBillingItem({
            product,
            taxItem,
            discountItem,
            finalPrice,
            productPrice: productPriceByWeight,
            courseItemsList: courseItemsList,
        });

        billingItems.push(billItemDetails);
    }

    for (const associatedProduct of associatedProducts ?? []) {
        const associatedProductBillingItem = getAssociatedProductBillingItem(
            associatedProduct,
            section
        );

        associatedProductBillingItem && billingItems.push(associatedProductBillingItem);
    }

    return billingItems;
};

const generateProductPackageOneTimePlugin = (currency: OrderCurrency): OrderPluginFunctions => ({
    ProductChild: (props) => {
        return <PackageProductChild packageType={PackageType.PACKAGE_TYPE_ONE_TIME} {...props} />;
    },

    generateBilledAtOrderBillingItems: (productFieldArrayItem): BilledAtOrderPackageProduct[] => {
        const { packageCourses, productPrices, associatedProducts, product } =
            productFieldArrayItem;

        let billingItems: BilledAtOrderPackageProduct[] = [];

        const totalCoursesWeight = packageCourses?.reduce(
            (totalWeight, currentProduct) =>
                (totalWeight = totalWeight + currentProduct.packageCourse.course_weight),
            0
        );

        const productPriceWithWeight = productPrices?.find(
            ({ quantity }) => quantity === totalCoursesWeight
        );

        if (!packageCourses || !productPriceWithWeight || !product) return billingItems;

        billingItems.push(
            getPackageBilledAtOrderItem(
                productFieldArrayItem,
                productPriceWithWeight.price,
                currency
            )
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

    BilledAtOrderChild: ({ billedAtOrderItem }) => {
        return <PackageBilledAtOrder billedAtOrderItem={billedAtOrderItem} />;
    },

    UpcomingBillingChild: ({ upcomingBillingProduct }) => {
        return <ProductUpcomingBilling upcomingBillingProduct={upcomingBillingProduct} />;
    },

    getBillingItems: (productFieldArrayItem) => {
        return getOneTimePackageBillingItems(productFieldArrayItem, "billedAtOrder");
    },

    getUpcomingBillingItems: (productFieldArrayItem) => {
        return getOneTimePackageBillingItems(productFieldArrayItem, "upcomingBilling");
    },

    getOrderItem: (productFieldArrayItem) => {
        return getNewOrderPackageOrderItem(productFieldArrayItem);
    },
});

export default generateProductPackageOneTimePlugin;
