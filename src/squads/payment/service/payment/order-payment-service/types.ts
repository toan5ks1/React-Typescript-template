import {
    CreateOrderRequest,
    CreateOrderResponse as CreateOrderResponsePb,
    RetrieveListOfBillItemsRequest,
    RetrieveListOfBillItemsResponse,
    RetrieveListOfOrderItemsRequest,
    RetrieveListOfOrderProductsRequest,
    RetrieveListOfOrderProductsResponse,
    RetrieveListOfOrderItemsResponse,
    CreateCustomBillingRequest,
    CreateCustomBillingResponse,
    RetrieveListOfOrderDetailProductsRequest,
    RetrieveListOfOrderDetailProductsResponse,
    RetrieveBillingOfOrderDetailsResponse,
    RetrieveBillingOfOrderDetailsRequest,
    VoidOrderRequest,
    VoidOrderResponse,
    CreateBulkOrderRequest,
    CreateBulkOrderResponse,
} from "manabuf/payment/v1/order_pb";

export interface CreateOrder extends CreateOrderRequest.AsObject {}

export interface CreateOrderResponse extends CreateOrderResponsePb.AsObject {}

export interface CustomBillingOrderRequest extends CreateCustomBillingRequest.AsObject {}

export interface CustomBillingOrderResponse extends CreateCustomBillingResponse.AsObject {}

export interface VoidOrderReq extends VoidOrderRequest.AsObject {}

export interface VoidOrderResp extends VoidOrderResponse.AsObject {}

export interface BulkOrderRequest extends CreateBulkOrderRequest.AsObject {}

export interface BulkOrderResponse extends CreateBulkOrderResponse.AsObject {}

export declare namespace NsFatimaOrderService {
    export interface RetrieveListOfOrderProductsRequest
        extends RetrieveListOfOrderProductsRequest.AsObject {}

    export interface RetrieveListOfOrderProductsResponse
        extends RetrieveListOfOrderProductsResponse.AsObject {}

    export interface RetrieveListOfBillItemsRequest
        extends RetrieveListOfBillItemsRequest.AsObject {}

    export interface RetrieveListOfBillItemsResponse
        extends RetrieveListOfBillItemsResponse.AsObject {}

    export interface RetrieveListOfOrderItemsRequest
        extends RetrieveListOfOrderItemsRequest.AsObject {}

    export interface RetrieveListOfOrderItemsResponse
        extends RetrieveListOfOrderItemsResponse.AsObject {}

    export interface RetrieveListOfOrderDetailProductsRequest
        extends RetrieveListOfOrderDetailProductsRequest.AsObject {}

    export interface RetrieveListOfOrderDetailProductsResponse
        extends RetrieveListOfOrderDetailProductsResponse.AsObject {}

    export interface RetrieveBillingOfOrderDetailsRequest
        extends RetrieveBillingOfOrderDetailsRequest.AsObject {}

    export interface RetrieveBillingOfOrderDetailsResponse
        extends RetrieveBillingOfOrderDetailsResponse.AsObject {}
}
