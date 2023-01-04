import { productType } from "src/squads/payment/service/payment/master-import-payment-service/types";
import { createMockProductFieldArrayItems } from "src/squads/payment/test-utils/mocks/recurring-products";

import { OrderItem } from "manabuf/payment/v1/order_pb";

import { mapPackageCourseWithSlot } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/course";
import { getNewOrderFrequencyBasedPackageOrderItem } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/orderItem";
import { getRecurringProductInfo } from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/recurringProduct/helper";

describe("getNewOrderFrequencyBasedPackageOrderItem", () => {
    const productFieldArrayItem = createMockProductFieldArrayItems()[1];
    const { packageCourses, product, discount, startDate } =
        getRecurringProductInfo(productFieldArrayItem);
    const orderItems: OrderItem.AsObject =
        getNewOrderFrequencyBasedPackageOrderItem(productFieldArrayItem);

    it("should return correct fields in order Items", () => {
        expect(orderItems.productId).toBe(product?.product_id);
        expect(orderItems.startDate).toBe(startDate);
        expect(orderItems.discountId).toBe(discount?.discount_id);
    });

    it("should return correct fields of courseItemsList in order Items", () => {
        const courseItemsList = packageCourses?.map(mapPackageCourseWithSlot) || [];

        orderItems.courseItemsList.forEach(({ courseId, courseName, slot }, index) => {
            expect(courseId).toBe(courseItemsList[index].courseId);
            expect(courseName).toBe(courseItemsList[index].courseName);
            expect(slot).toBe(courseItemsList[index].slot);
        });
    });

    it("should return correct fields of productAssociationsList in order Items", () => {
        const productAssociationsList =
            productFieldArrayItem.associatedProducts?.map(({ courseId, product }) => {
                return {
                    packageId: productFieldArrayItem.product?.product_id!,
                    courseId: courseId!,
                    productId: product.product_id,
                    productType: productType[product.product_type],
                };
            }) || [];

        orderItems.productAssociationsList.forEach(
            ({ packageId, courseId, productId, productType }, index) => {
                expect(courseId).toBe(productAssociationsList[index].courseId);
                expect(packageId).toBe(productAssociationsList[index].packageId);
                expect(productId).toBe(productAssociationsList[index].productId);
                expect(productType).toBe(productAssociationsList[index].productType);
            }
        );
    });

    it("should return productAssociationsList is empty array in order items when not have associatedProducts", () => {
        const orderItems: OrderItem.AsObject = getNewOrderFrequencyBasedPackageOrderItem({
            ...productFieldArrayItem,
            associatedProducts: undefined,
        });

        expect(orderItems.productAssociationsList).toEqual(new Array());
    });

    it("should return discount is undefined in order items when not have discount", () => {
        const orderItems: OrderItem.AsObject = getNewOrderFrequencyBasedPackageOrderItem({
            ...productFieldArrayItem,
            discount: undefined,
        });

        expect(orderItems.discountId).toBe(undefined);
    });
});
