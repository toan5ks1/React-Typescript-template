import {
    Payment_GetManyActionLogsByOrderIdQuery,
    Payment_GetManyActionLogsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { orderActionLogService } from "src/squads/payment/service/fatima/order-action-log-service/order-action-log-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockOrderActionLogList } from "src/squads/payment/test-utils/mocks/order-action-log";

import { DataWithTotal } from "@manabie-com/react-utils";
import orderActionLogsQueriesFatima from "src/squads/payment/service/fatima/order-action-log-service/order-action-log-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/order-action-log-service/order-action-log-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getList: jest.fn(),
        },
    })
);

const mockOrderActionLogList = createMockOrderActionLogList();

describe("Action log service", () => {
    it("should return action log list when calling paymentGetOrderActionLogListByOrderId", async () => {
        const queryVariable: Payment_GetManyActionLogsByOrderIdQueryVariables = {
            order_id: "order_id_1",
            limit: 10,
            offset: 0,
        };

        const actionLogListReturnData: DataWithTotal<
            Payment_GetManyActionLogsByOrderIdQuery["order_action_log"]
        > = {
            data: mockOrderActionLogList,
            total: mockOrderActionLogList.length,
        };

        (orderActionLogsQueriesFatima.getList as jest.Mock).mockResolvedValue(
            actionLogListReturnData
        );

        const result = await orderActionLogService.query.paymentGetOrderActionLogListByOrderId(
            queryVariable
        );

        expect(orderActionLogsQueriesFatima.getList).toBeCalledWith(queryVariable);
        expect(orderActionLogsQueriesFatima.getList).toBeCalledTimes(1);
        expect(result).toEqual(actionLogListReturnData);
    });

    it("should throw an error if order_id is empty string when calling paymentGetOrderActionLogListByOrderId", async () => {
        const queryVariable: Payment_GetManyActionLogsByOrderIdQueryVariables = {
            order_id: "",
            limit: 10,
            offset: 0,
        };

        await expect(async () => {
            await orderActionLogService.query.paymentGetOrderActionLogListByOrderId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetOrderActionLogListByOrderId",
                errors: [{ field: "order_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(orderActionLogsQueriesFatima.getList).not.toBeCalled();
    });
});
