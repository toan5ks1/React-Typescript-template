import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetOrderByOrderIdQuery,
    Payment_GetOrderByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockOrderData } from "src/squads/payment/test-utils/mocks/order";

import orderQueriesFatima from "src/squads/payment/service/fatima/order-service/order-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockOrderItem = createMockOrderData();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetOrderByOrderIdQuery> = {
    data: {
        order: [mockOrderItem],
    },
};

describe("Order Item Query", () => {
    it("should return order item when calling paymentGetOneOrderByOrderId", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetOrderByOrderIdQueryVariables = {
            order_id: "order_id_1",
        };

        const result = await orderQueriesFatima.getOne(variables);

        expect(result).toEqual(mockOrderItem);
    });
});
