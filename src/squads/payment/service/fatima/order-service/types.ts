import {
    CreateOrderRequest,
    CreateOrderResponse as CreateOrderResponsePb,
    RetrieveListOfOrdersRequest,
    RetrieveListOfOrdersResponse,
} from "manabuf/payment/v1/order_pb";

export interface CreateOrder extends CreateOrderRequest.AsObject {}

export interface CreateOrderResponse extends CreateOrderResponsePb.AsObject {}
export declare namespace NsFatimaOrderService {
    export interface RetrieveListOfOrdersRequest extends RetrieveListOfOrdersRequest.AsObject {}
    export interface RetrieveListOfOrdersResponse extends RetrieveListOfOrdersResponse.AsObject {}
    export interface RetrieveListOfOrdersResponseOrder
        extends RetrieveListOfOrdersResponse.Order.AsObject {}
}
