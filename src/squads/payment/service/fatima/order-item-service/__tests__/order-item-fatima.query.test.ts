import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyOrderItemsByStudentProductIdsQuery,
    Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
    Payment_GetOrderItemsByOrderIdQuery,
    Payment_GetOrderItemsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockOrderItemsListByStudentProductIds,
    createMockOrderItemsList,
} from "src/squads/payment/test-utils/mocks/order-items";

import orderItemsQueriesFatima from "src/squads/payment/service/fatima/order-item-service/order-item-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockOrderItemlist = createMockOrderItemsList();
const mockOrderItemListByStudentProductIds = createMockOrderItemsListByStudentProductIds();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetOrderItemsByOrderIdQuery> = {
    data: {
        order_item: mockOrderItemlist,
        order_item_aggregate: {
            aggregate: {
                count: 10,
            },
        },
    },
};

describe("Query order item", () => {
    it("Get many order by id", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetOrderItemsByOrderIdQueryVariables = {
            orderId: "order_id_1",
        };

        const result = await orderItemsQueriesFatima.getManyByOrderId(variables);

        expect(result).toEqual({
            total: mockDoQueryReturnValue.data?.order_item_aggregate.aggregate?.count,
            data: mockDoQueryReturnValue.data?.order_item,
        });
    });

    it("Get many order item by student product ids", async () => {
        const mockOrderItemDoQuery: HasuraAndDefaultResponse<Payment_GetManyOrderItemsByStudentProductIdsQuery> =
            {
                data: {
                    order_item: mockOrderItemListByStudentProductIds,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockOrderItemDoQuery);

        const variables: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables = {
            student_product_ids: ["student_product_id_1", "student_product_id_2"],
        };

        const result = await orderItemsQueriesFatima.getManyOrderItemsByStudentProductIds(
            variables
        );

        expect(result).toEqual(mockOrderItemListByStudentProductIds);
    });
});
