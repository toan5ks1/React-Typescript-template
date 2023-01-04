import {
    Payment_GetManyOrderItemsByStudentProductIdsQueryVariables,
    Payment_GetOrderItemsByOrderIdQuery,
    Payment_GetOrderItemsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { orderItemService } from "src/squads/payment/service/fatima/order-item-service/order-item-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockOrderItemsListByStudentProductIds } from "src/squads/payment/test-utils/mocks/order-items";

import orderItemsQueriesFatima from "src/squads/payment/service/fatima/order-item-service/order-item-fatima.query";

const mockOrderItemListByStudentProductIds = createMockOrderItemsListByStudentProductIds();

jest.mock("src/squads/payment/service/fatima/order-item-service/order-item-fatima.query", () => {
    return {
        __esModule: true,
        default: {
            getManyByOrderId: jest.fn(),
            getManyOrderItemsByStudentProductIds: jest.fn(),
        },
    };
});

describe("order-item-service", () => {
    it("should return order items when calling paymentGetOrderItemsByOrderId", async () => {
        const mockOrderId = "order_id_1";
        const queryVariable: Payment_GetOrderItemsByOrderIdQueryVariables = {
            orderId: mockOrderId,
        };

        const mockQueryReturn: Payment_GetOrderItemsByOrderIdQuery["order_item"] = [
            {
                discount_id: "discount_id_1",
                product_id: "product_id_1",
            },
        ];

        (orderItemsQueriesFatima.getManyByOrderId as jest.Mock).mockResolvedValue(mockQueryReturn);

        const response = await orderItemService.query.paymentGetOrderItemsByOrderId(queryVariable);

        expect(orderItemsQueriesFatima.getManyByOrderId).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockQueryReturn);
    });

    it("should throw an error if orderId is empty when calling paymentGetOrderItemsByOrderId", async () => {
        const queryVariable: Payment_GetOrderItemsByOrderIdQueryVariables = {
            orderId: "",
        };

        await expect(async () => {
            await orderItemService.query.paymentGetOrderItemsByOrderId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetOrderItemsByOrderId",
                errors: [{ field: "orderId", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(orderItemsQueriesFatima.getManyByOrderId).not.toBeCalled();
    });

    it("should return order items when calling paymentGetManyOrderItemsByStudentProductIds", async () => {
        const queryVariable: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables = {
            student_product_ids: ["student_product_id_1", "student_product_id_2"],
        };

        (
            orderItemsQueriesFatima.getManyOrderItemsByStudentProductIds as jest.Mock
        ).mockResolvedValue(mockOrderItemListByStudentProductIds);

        const response = await orderItemService.query.paymentGetManyOrderItemsByStudentProductIds(
            queryVariable
        );

        expect(orderItemsQueriesFatima.getManyOrderItemsByStudentProductIds).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(mockOrderItemListByStudentProductIds);
    });

    it("should throw an error if student_product_ids is empty when calling paymentGetManyOrderItemsByStudentProductIds", async () => {
        const queryVariable: Payment_GetManyOrderItemsByStudentProductIdsQueryVariables = {
            student_product_ids: [],
        };

        await expect(async () => {
            await orderItemService.query.paymentGetManyOrderItemsByStudentProductIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyOrderItemsByStudentProductIds",
                errors: [{ field: "student_product_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(orderItemsQueriesFatima.getManyOrderItemsByStudentProductIds).not.toBeCalled();
    });
});
