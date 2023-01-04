import { Payment_GetOrderByOrderIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { orderService } from "src/squads/payment/service/fatima/order-service/order-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockOrderData } from "src/squads/payment/test-utils/mocks/order";

import orderQueriesFatima from "src/squads/payment/service/fatima/order-service/order-fatima.query";

jest.mock("src/squads/payment/service/fatima/order-service/order-fatima.query", () => {
    return {
        __esModule: true,
        default: {
            getOne: jest.fn(),
        },
    };
});

const mockOrderItem = createMockOrderData();

describe("order-service", () => {
    it("should return order item when calling paymentGetOneOrderByOrderId", async () => {
        const mockOrderId = "order_id_1";
        const queryVariable: Payment_GetOrderByOrderIdQueryVariables = {
            order_id: mockOrderId,
        };

        (orderQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockOrderItem);

        const response = await orderService.query.paymentGetOneOrderByOrderId(queryVariable);

        expect(orderQueriesFatima.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockOrderItem);
    });

    it("should throw an error if orderId is empty when calling paymentGetOrderItemsByOrderId", async () => {
        const queryVariable: Payment_GetOrderByOrderIdQueryVariables = {
            order_id: "",
        };

        await expect(async () => {
            await orderService.query.paymentGetOneOrderByOrderId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetOneOrderByOrderId",
                errors: [{ field: "order_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(orderQueriesFatima.getOne).not.toBeCalled();
    });
});
