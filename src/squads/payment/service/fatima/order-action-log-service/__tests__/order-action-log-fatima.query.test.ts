import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyActionLogsByOrderIdQuery,
    Payment_GetManyActionLogsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockOrderActionLogList } from "src/squads/payment/test-utils/mocks/order-action-log";

import orderActionLogsQueriesFatima from "../order-action-log-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockOrderActionLogList = createMockOrderActionLogList();

describe("Action log query", () => {
    it("should return action log list when calling getList", async () => {
        const variables: Payment_GetManyActionLogsByOrderIdQueryVariables = {
            order_id: "order_id_1",
            limit: 10,
            offset: 0,
        };

        const mockActionLogDoQuery: HasuraAndDefaultResponse<Payment_GetManyActionLogsByOrderIdQuery> =
            {
                data: {
                    order_action_log: mockOrderActionLogList,
                    order_action_log_aggregate: {
                        aggregate: {
                            count: mockOrderActionLogList.length,
                        },
                    },
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockActionLogDoQuery);

        const result = await orderActionLogsQueriesFatima.getList(variables);

        expect(result).toEqual({
            data: mockOrderActionLogList,
            total: mockOrderActionLogList.length,
        });
    });
});
