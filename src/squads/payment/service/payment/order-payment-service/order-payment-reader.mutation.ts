import { toTimestampEndDate, toTimestampStartDate } from "src/common/utils/timezone";
import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";
import { InheritedGrpcServiceClient } from "src/squads/payment/service/service-types";
import { toBasicPagingProto } from "src/squads/payment/service/utils/utils";

import { OrderServicePromiseClient } from "manabuf/payment/v1/order_grpc_web_pb";
import {
    RetrieveBillingOfOrderDetailsRequest,
    RetrieveListOfBillItemsRequest,
    RetrieveListOfOrderDetailProductsRequest,
    RetrieveListOfOrderItemsRequest,
    RetrieveListOfOrderProductsRequest,
    RetrieveListOfOrdersFilter,
    RetrieveListOfOrdersRequest,
} from "manabuf/payment/v1/order_pb";

export function newRetrieveListOfOrders(
    data: RetrieveListOfOrdersRequest.AsObject
): RetrieveListOfOrdersRequest {
    const { paging, currentTime, keyword, orderStatus, filter } = data;

    if (!paging) throw formInvalidErr;

    const req = new RetrieveListOfOrdersRequest();
    const pagingObj = toBasicPagingProto(paging);
    const currentTimestamp = toTimestampStartDate(currentTime);
    req.setPaging(pagingObj);
    req.setCurrentTime(currentTimestamp);
    req.setKeyword(keyword);
    req.setOrderStatus(orderStatus);

    if (!filter) return req;

    const {
        createdFrom: createdFromFilter,
        createdTo: createdToFilter,
        orderTypesList,
        productIdsList,
    } = filter;

    const filterObj = new RetrieveListOfOrdersFilter();

    const createdFrom = createdFromFilter ? toTimestampStartDate(createdFromFilter) : null;
    filterObj.setCreatedFrom(createdFrom);
    const createdTo = createdToFilter ? toTimestampEndDate(createdToFilter) : null;
    filterObj.setCreatedTo(createdTo);
    filterObj.setOrderTypesList(orderTypesList);
    filterObj.setProductIdsList(productIdsList);

    req.setFilter(filterObj);
    return req;
}

export function newRetrieveListOfOrderProducts(
    data: NsFatimaOrderService.RetrieveListOfOrderProductsRequest
): RetrieveListOfOrderProductsRequest {
    const { studentId, paging } = data;

    if (!paging) throw formInvalidErr;

    const req = new RetrieveListOfOrderProductsRequest();

    const pagingObj = toBasicPagingProto(paging);
    req.setPaging(pagingObj);
    req.setStudentId(studentId);

    return req;
}

export function newRetrieveListOfBillItems(
    data: NsFatimaOrderService.RetrieveListOfBillItemsRequest
): RetrieveListOfBillItemsRequest {
    const { studentId, paging } = data;

    if (!paging) throw formInvalidErr;

    const req = new RetrieveListOfBillItemsRequest();

    const pagingObj = toBasicPagingProto(paging);
    req.setPaging(pagingObj);
    req.setStudentId(studentId);

    return req;
}

export function newRetrieveListOfOrderItems(
    data: NsFatimaOrderService.RetrieveListOfOrderItemsRequest
): RetrieveListOfOrderItemsRequest {
    const { studentId, paging } = data;

    if (!paging) throw formInvalidErr;

    const req = new RetrieveListOfOrderItemsRequest();

    const pagingObj = toBasicPagingProto(paging);
    req.setPaging(pagingObj);
    req.setStudentId(studentId);

    return req;
}

export function newRetrieveListOfOderDetailProducts(
    data: NsFatimaOrderService.RetrieveListOfOrderDetailProductsRequest
): RetrieveListOfOrderDetailProductsRequest {
    const { orderId, paging } = data;

    if (!paging) throw formInvalidErr;

    const req = new RetrieveListOfOrderDetailProductsRequest();

    const pagingObj = toBasicPagingProto(paging);
    req.setPaging(pagingObj);
    req.setOrderId(orderId);

    return req;
}

export function newRetrieveBillingOfOrderDetailsProducts(
    data: NsFatimaOrderService.RetrieveBillingOfOrderDetailsRequest
): RetrieveBillingOfOrderDetailsRequest {
    const { orderId, paging } = data;

    if (!paging) throw formInvalidErr;

    const req = new RetrieveBillingOfOrderDetailsRequest();

    const pagingObj = toBasicPagingProto(paging);
    req.setPaging(pagingObj);
    req.setOrderId(orderId);

    return req;
}

class orderPaymentService extends InheritedGrpcServiceClient<OrderServicePromiseClient> {
    async retrieveListOfOrders(params: RetrieveListOfOrdersRequest.AsObject) {
        const request = newRetrieveListOfOrders(params);
        const response = await this._call("retrieveListOfOrders", request);

        return response.toObject();
    }

    async retrieveListOfOrderProducts(
        params: NsFatimaOrderService.RetrieveListOfOrderProductsRequest
    ) {
        const request = newRetrieveListOfOrderProducts(params);
        const response = await this._call("retrieveListOfOrderProducts", request);

        return response.toObject();
    }

    async retrieveListOfBillItems(params: NsFatimaOrderService.RetrieveListOfBillItemsRequest) {
        const request = newRetrieveListOfBillItems(params);
        const response = await this._call("retrieveListOfBillItems", request);

        return response.toObject();
    }

    async retrieveListOfOrderItems(params: NsFatimaOrderService.RetrieveListOfOrderItemsRequest) {
        const request = newRetrieveListOfOrderItems(params);
        const response = await this._call("retrieveListOfOrderItems", request);

        return response.toObject();
    }
    async retrieveListOfOrderDetailProducts(
        params: NsFatimaOrderService.RetrieveListOfOrderDetailProductsRequest
    ) {
        const request = newRetrieveListOfOderDetailProducts(params);
        const response = await this._call("retrieveListOfOrderDetailProducts", request);

        return response.toObject();
    }
    async retrieveBillingOfOrderDetailsProducts(
        params: NsFatimaOrderService.RetrieveBillingOfOrderDetailsRequest
    ) {
        const request = newRetrieveBillingOfOrderDetailsProducts(params);
        const response = await this._call("retrieveBillingOfOrderDetails", request);

        return response.toObject();
    }
}

const orderReaderMutationService = new orderPaymentService(
    OrderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default orderReaderMutationService;
