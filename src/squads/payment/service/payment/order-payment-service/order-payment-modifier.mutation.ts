import { arrayHasItem } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import {
    CustomBillingOrderRequest,
    CustomBillingOrderResponse,
    CreateOrder,
    CreateOrderResponse,
    VoidOrderReq,
    VoidOrderResp,
    BulkOrderRequest,
    BulkOrderResponse,
} from "src/squads/payment/service/payment/order-payment-service/types";
import { InheritedGrpcServiceClient } from "src/squads/payment/service/service-types";

import { Timestamp } from "manabuf/google/protobuf/timestamp_pb";
import {
    Int32Value,
    StringValue,
    FloatValue,
    BoolValue,
} from "manabuf/google/protobuf/wrappers_pb";
import { OrderServicePromiseClient } from "manabuf/payment/v1/order_grpc_web_pb";
import {
    BillingItem,
    CourseItem,
    CreateBulkOrderRequest,
    CreateCustomBillingRequest,
    CreateOrderRequest,
    CustomBillingItem,
    DiscountBillItem,
    OrderItem,
    ProductAssociation,
    TaxBillItem,
    VoidOrderRequest,
} from "manabuf/payment/v1/order_pb";

import { MutationParams } from "@manabie-com/react-utils";

export function validateCreateOrder(order?: CreateOrder) {
    if (!(order && order.studentId && order.locationId && arrayHasItem(order.orderItemsList))) {
        throw formInvalidErr;
    }

    if (order.billingItemsList.some((billingItem) => billingItem.price !== 0 && !billingItem.price))
        throw formInvalidErr;
    if (
        order.upcomingBillingItemsList.some(
            (upcomingBillingItem) => upcomingBillingItem.price !== 0 && !upcomingBillingItem.price
        )
    )
        throw formInvalidErr;
}

function getCourseItemList(courseItemsList: CourseItem.AsObject[]) {
    const courseItemList = courseItemsList.map(({ courseId, courseName, weight, slot }) => {
        const courseItem = new CourseItem();

        courseItem.setCourseId(courseId);
        courseItem.setCourseName(courseName);

        if (weight) {
            const I32Weight = new Int32Value();
            I32Weight.setValue(weight);
            courseItem.setWeight(I32Weight);
        }

        if (slot) {
            const I32Slot = new Int32Value();
            I32Slot.setValue(slot);
            courseItem.setSlot(I32Slot);
        }

        return courseItem;
    });

    return courseItemList;
}

function getProductAssociationsList(productAssociationsList: ProductAssociation.AsObject[]) {
    return productAssociationsList.map(({ packageId, productId, productType, courseId }) => {
        const productAssociationItem = new ProductAssociation();
        productAssociationItem.setPackageId(packageId);
        productAssociationItem.setProductId(productId);
        productAssociationItem.setProductType(productType);
        productAssociationItem.setCourseId(courseId);
        return productAssociationItem;
    });
}

function getItemList(itemList: BillingItem.AsObject[]): BillingItem[] {
    return itemList.map((item) => {
        const billingItem = new BillingItem();
        billingItem.setProductId(item.productId);

        if (item.billingSchedulePeriodId) {
            const billingSchedulePeriodId = new Int32Value();
            billingSchedulePeriodId.setValue(item.billingSchedulePeriodId);

            billingItem.setBillingSchedulePeriodId(billingSchedulePeriodId);
        }

        billingItem.setPrice(item.price);

        if (item.taxItem) {
            const taxBillingItem = new TaxBillItem();

            taxBillingItem.setTaxId(item.taxItem.taxId);
            taxBillingItem.setTaxPercentage(item.taxItem.taxPercentage);
            taxBillingItem.setTaxAmount(item.taxItem.taxAmount);
            taxBillingItem.setTaxCategory(item.taxItem.taxCategory);

            billingItem.setTaxItem(taxBillingItem);
        }

        if (item.discountItem) {
            const discountBillingItem = new DiscountBillItem();

            discountBillingItem.setDiscountId(item.discountItem.discountId);
            discountBillingItem.setDiscountType(item.discountItem.discountType);
            discountBillingItem.setDiscountAmountType(item.discountItem.discountAmountType);
            discountBillingItem.setDiscountAmount(item.discountItem.discountAmount);
            discountBillingItem.setDiscountAmountValue(item.discountItem.discountAmountValue);

            billingItem.setDiscountItem(discountBillingItem);
        }

        billingItem.setFinalPrice(item.finalPrice);

        if (item.quantity) {
            const itemQuantity = new Int32Value();
            itemQuantity.setValue(item.quantity);

            billingItem.setQuantity(itemQuantity);
        }

        if (item.courseItemsList) {
            const courseItemList = getCourseItemList(item.courseItemsList);

            billingItem.setCourseItemsList(courseItemList);
        }

        if (item.studentProductId) {
            const studentProductId = new StringValue();
            studentProductId.setValue(item.studentProductId);

            billingItem.setStudentProductId(studentProductId);
        }

        if (item.adjustmentPrice !== undefined) {
            const adjustmentPrice = new FloatValue();
            adjustmentPrice.setValue(item.adjustmentPrice);

            billingItem.setAdjustmentPrice(adjustmentPrice);
        }

        if (item.isCancelBillItem) {
            const isCancelBillingItem = new BoolValue();
            isCancelBillingItem.setValue(item.isCancelBillItem);

            billingItem.setIsCancelBillItem(isCancelBillingItem);
        }

        return billingItem;
    });
}

export function newCreateOrderRequest(order: CreateOrder): CreateOrderRequest {
    const req = new CreateOrderRequest();

    req.setStudentId(order.studentId);
    req.setLocationId(order.locationId);
    req.setOrderComment(order.orderComment);
    req.setOrderType(order.orderType);

    const orderList = order.orderItemsList.map((item) => {
        const orderItem = new OrderItem();

        if (item.discountId) {
            const discountId = new Int32Value();
            discountId.setValue(item.discountId);

            orderItem.setDiscountId(discountId);
        } else {
            orderItem.setDiscountId(item.discountId);
        }

        if (item.courseItemsList) {
            const courseItemList = getCourseItemList(item.courseItemsList);

            orderItem.setCourseItemsList(courseItemList);
        }

        if (item.productAssociationsList) {
            const productAssociationsList = getProductAssociationsList(
                item.productAssociationsList
            );

            orderItem.setProductAssociationsList(productAssociationsList);
        }

        if (item.startDate) {
            const timeMS = new Date(item.startDate).valueOf();
            const startDate = new Timestamp();
            startDate.setSeconds(Math.floor(timeMS / 1000));
            startDate.setNanos((timeMS % 1000) * 1e6);

            orderItem.setStartDate(startDate);
        }

        orderItem.setProductId(item.productId);

        if (item.studentProductId) {
            const studentProductId = new StringValue();
            studentProductId.setValue(item.studentProductId);

            orderItem.setStudentProductId(studentProductId);
        }

        if (item.effectiveDate) {
            const timeMS = new Date(item.effectiveDate).valueOf();
            const effectiveDate = new Timestamp();
            effectiveDate.setSeconds(Math.floor(timeMS / 1000));
            effectiveDate.setNanos((timeMS % 1000) * 1e6);

            orderItem.setEffectiveDate(effectiveDate);
        }

        return orderItem;
    });

    const billingItemsList = getItemList(order.billingItemsList);
    const upcomingBillingItemList = getItemList(order.upcomingBillingItemsList);

    req.setOrderItemsList(orderList);
    req.setBillingItemsList(billingItemsList);
    req.setUpcomingBillingItemsList(upcomingBillingItemList);

    return req;
}

export const newCreateBulkOrderRequest = (bulkOrder: BulkOrderRequest): CreateBulkOrderRequest => {
    const bulkReq = new CreateBulkOrderRequest();

    const bulkOrderList = bulkOrder.newOrderRequestsList.map((order) => {
        const orderReq = newCreateOrderRequest(order!);
        return orderReq;
    });

    bulkReq.setNewOrderRequestsList(bulkOrderList);

    return bulkReq;
};

export const getTaxItemList = (taxItem: TaxBillItem.AsObject) => {
    const taxBillingItem = new TaxBillItem();

    taxBillingItem.setTaxId(taxItem.taxId);
    taxBillingItem.setTaxPercentage(taxItem.taxPercentage);
    taxBillingItem.setTaxAmount(taxItem.taxAmount);
    taxBillingItem.setTaxCategory(taxItem.taxCategory);

    return taxBillingItem;
};

export const newCreateCustomBillingOrderRequest = (
    billingItem: CustomBillingOrderRequest
): CreateCustomBillingRequest => {
    const req = new CreateCustomBillingRequest();

    req.setStudentId(billingItem.studentId);
    req.setLocationId(billingItem.locationId);
    req.setOrderComment(billingItem.orderComment);
    req.setOrderType(billingItem.orderType);

    const billingItemList = billingItem.customBillingItemsList.map((item) => {
        const billingItem = new CustomBillingItem();

        billingItem.setName(item.name);
        billingItem.setPrice(item.price);

        if (item.taxItem) {
            const taxItem = getTaxItemList(item.taxItem);
            billingItem.setTaxItem(taxItem);
        }

        return billingItem;
    });

    req.setCustomBillingItemsList(billingItemList);

    return req;
};

export const newVoidOrderRequest = (order: VoidOrderReq): VoidOrderRequest => {
    const req = new VoidOrderRequest();

    req.setOrderId(order.orderId);

    return req;
};

class orderPaymentService extends InheritedGrpcServiceClient<OrderServicePromiseClient> {
    async createOrder({ data }: MutationParams<CreateOrder>): Promise<CreateOrderResponse> {
        validateCreateOrder(data);

        const req = newCreateOrderRequest(data!);
        const result = await this._call("createOrder", req);
        return result.toObject();
    }

    async createBulkOrder({ data }: MutationParams<BulkOrderRequest>): Promise<BulkOrderResponse> {
        if (!(data && arrayHasItem(data.newOrderRequestsList))) {
            throw formInvalidErr;
        }

        const bulkReq = newCreateBulkOrderRequest(data);
        const bulkResult = await this._call("createBulkOrder", bulkReq);
        return bulkResult.toObject();
    }

    async createCustomBillingOrder({
        data,
    }: MutationParams<CustomBillingOrderRequest>): Promise<CustomBillingOrderResponse> {
        if (
            !(
                data &&
                data.studentId &&
                data.locationId &&
                arrayHasItem(data.customBillingItemsList)
            )
        ) {
            throw formInvalidErr;
        }

        const req = newCreateCustomBillingOrderRequest(data);
        const result = await this._call("createCustomBilling", req);
        return result.toObject();
    }

    async voidOrder({ data }: MutationParams<VoidOrderReq>): Promise<VoidOrderResp> {
        const req = newVoidOrderRequest(data!);
        const result = await this._call("voidOrder", req);
        return result.toObject();
    }
}

const orderModifierMutationService = new orderPaymentService(
    OrderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default orderModifierMutationService;
