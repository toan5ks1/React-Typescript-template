import { ProviderTypes } from "src/common/constants/enum";

import { getEmptyResponse } from "../utils";

import orderModifierMutationService from "src/squads/payment/service/payment/order-payment-service/order-payment-modifier.mutation";
import orderReaderMutationService from "src/squads/payment/service/payment/order-payment-service/order-payment-reader.mutation";

type OrderParams =
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: Parameters<typeof orderReaderMutationService.retrieveListOfOrders>[0];
      }
    | {
          type: ProviderTypes.CREATE;
          payload: Parameters<typeof orderModifierMutationService.createOrder>[0];
      };

const hasuraOrders = (params: OrderParams) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER:
            return orderReaderMutationService.retrieveListOfOrders(params.payload);

        case ProviderTypes.CREATE:
            return orderModifierMutationService.createOrder(params.payload);

        default:
            return getEmptyResponse();
    }
};

export default hasuraOrders;
