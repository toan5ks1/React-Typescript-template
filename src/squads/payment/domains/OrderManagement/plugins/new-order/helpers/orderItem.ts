import { productType } from "src/squads/payment/service/payment/master-import-payment-service/types";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";

import { OrderItem } from "manabuf/payment/v1/order_pb";

import {
    mapPackageCourseWithSlot,
    mapPackageCourseWithWeight,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/course";

export const getNewOrderOneTimeMaterialAndFeeOrderItem = (
    productFieldArrayItem: ProductsFormValues
): OrderItem.AsObject => {
    const { product, discount } = productFieldArrayItem;

    return {
        productId: product?.product_id!,
        discountId: discount?.discount_id,
        productAssociationsList: [],
        courseItemsList: [],
    };
};

export const getNewOrderPackageOrderItem = (
    productFieldArrayItem: ProductsFormValues
): OrderItem.AsObject => {
    const { associatedProducts, packageCourses, product, discount, packageEntity } =
        productFieldArrayItem;

    const productAssociationsList =
        associatedProducts?.map(({ courseId, product }) => {
            return {
                packageId: productFieldArrayItem.product?.product_id!,
                courseId: courseId!,
                productId: product.product_id,
                productType: productType[product.product_type],
            };
        }) || [];

    const courseItemsList =
        packageCourses?.map(({ course, slot, packageCourse }) => {
            return {
                courseId: course.course_id,
                courseName: course.name!,
                slot: packageEntity?.package_type === "PACKAGE_TYPE_SLOT_BASED" ? slot : undefined,
                weight:
                    packageEntity?.package_type === "PACKAGE_TYPE_ONE_TIME"
                        ? packageCourse.course_weight
                        : undefined,
            };
        }) || [];

    return {
        productId: product?.product_id!,
        discountId: discount?.discount_id,
        productAssociationsList: productAssociationsList,
        courseItemsList: courseItemsList,
    };
};

export const getNewOrderRecurringMaterialOrderItem = (
    productFieldArrayItem: ProductsFormValues
): OrderItem.AsObject => {
    const { product, discount, recurringDetails } = productFieldArrayItem;

    const startDate = recurringDetails?.startDate;

    return {
        productId: product?.product_id!,
        discountId: discount?.discount_id,
        productAssociationsList: [],
        courseItemsList: [],
        startDate,
    };
};

export const getNewOrderFrequencyBasedPackageOrderItem = (
    productFieldArrayItem: ProductsFormValues
): OrderItem.AsObject => {
    const { product, discount, recurringDetails, packageCourses, associatedProducts } =
        productFieldArrayItem;

    const startDate = recurringDetails?.startDate;

    const productAssociationsList =
        associatedProducts?.map(({ courseId, product }) => {
            return {
                packageId: productFieldArrayItem.product?.product_id!,
                courseId: courseId!,
                productId: product.product_id,
                productType: productType[product.product_type],
            };
        }) || [];

    const courseItemsList = packageCourses?.map(mapPackageCourseWithSlot) || [];

    return {
        productId: product?.product_id!,
        discountId: discount?.discount_id,
        productAssociationsList: productAssociationsList,
        courseItemsList: courseItemsList,
        startDate,
    };
};

export const getNewOrderScheduleBasedPackageOrderItem = (
    productFieldArrayItem: ProductsFormValues
): OrderItem.AsObject => {
    const { product, discount, recurringDetails, packageCourses, associatedProducts } =
        productFieldArrayItem;

    const startDate = recurringDetails?.startDate;

    const courseItemsList = packageCourses?.map(mapPackageCourseWithWeight) || [];

    const productAssociationsList =
        associatedProducts?.map(({ courseId, product }) => {
            return {
                packageId: productFieldArrayItem.product?.product_id!,
                courseId: courseId!,
                productId: product.product_id,
                productType: productType[product.product_type],
            };
        }) || [];

    return {
        productId: product?.product_id!,
        discountId: discount?.discount_id,
        productAssociationsList: productAssociationsList ?? [],
        courseItemsList: courseItemsList,
        startDate,
    };
};
