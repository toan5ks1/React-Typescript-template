import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { CreateOrder } from "src/squads/payment/service/fatima/order-service/types";
import {
    BulkOrderRequest,
    CustomBillingOrderRequest,
    NsFatimaOrderService,
    VoidOrderReq,
} from "src/squads/payment/service/payment/order-payment-service/types";

import { RetrieveListOfOrdersRequest } from "manabuf/payment/v1/order_pb";

import { defineService, MutationParams } from "@manabie-com/react-utils";
import locationServiceBob from "src/squads/payment/service/bob/locations-service-bob/locations-service-bob.mutation";
import orderModifierMutationService from "src/squads/payment/service/payment/order-payment-service/order-payment-modifier.mutation";
import orderReaderMutationService from "src/squads/payment/service/payment/order-payment-service/order-payment-reader.mutation";

export const orderPaymentService = defineService({
    query: {
        paymentGetListWithFilter: (params: RetrieveListOfOrdersRequest.AsObject) => {
            return Promise.resolve(orderReaderMutationService.retrieveListOfOrders(params));
        },

        paymentGetRetrieveListOfOrderProducts: (
            params: NsFatimaOrderService.RetrieveListOfOrderProductsRequest
        ) => {
            return Promise.resolve(orderReaderMutationService.retrieveListOfOrderProducts(params));
        },

        paymentGetRetrieveListOfBillItems: (
            params: NsFatimaOrderService.RetrieveListOfBillItemsRequest
        ) => {
            return Promise.resolve(orderReaderMutationService.retrieveListOfBillItems(params));
        },

        paymentGetRetrieveListOfOrderItems: (
            params: NsFatimaOrderService.RetrieveListOfOrderItemsRequest
        ) => {
            return Promise.resolve(orderReaderMutationService.retrieveListOfOrderItems(params));
        },

        paymentGetRetrieveListOfProductsDetail: (
            params: NsFatimaOrderService.RetrieveListOfOrderDetailProductsRequest
        ) => {
            return Promise.resolve(
                orderReaderMutationService.retrieveListOfOrderDetailProducts(params)
            );
        },

        paymentGetRetrieveBillingOfProductsDetail: (
            params: NsFatimaOrderService.RetrieveBillingOfOrderDetailsRequest
        ) => {
            return Promise.resolve(
                orderReaderMutationService.retrieveBillingOfOrderDetailsProducts(params)
            );
        },

        paymentGetLowestLevelLocations: (
            params: NsBobLocationService.RetrieveLowestLocationsRequest
        ) => {
            return Promise.resolve(locationServiceBob.retrieveLowestLevelLocations(params));
        },
    },
    mutation: {
        paymentCreateOrder: ({ data }: MutationParams<CreateOrder>) => {
            return orderModifierMutationService.createOrder({ data });
        },
        paymentBulkOrder: ({ data }: MutationParams<BulkOrderRequest>) => {
            return orderModifierMutationService.createBulkOrder({ data });
        },
        paymentCustomBillingOrder: ({ data }: MutationParams<CustomBillingOrderRequest>) => {
            return orderModifierMutationService.createCustomBillingOrder({ data });
        },
        paymentVoidOrder: ({ data }: MutationParams<VoidOrderReq>) => {
            return orderModifierMutationService.voidOrder({ data });
        },
    },
});
