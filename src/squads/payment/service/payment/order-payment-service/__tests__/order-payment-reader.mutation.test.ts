import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { OrderStatus, OrderType } from "manabuf/payment/v1/enums_pb";
import { OrderServicePromiseClient } from "manabuf/payment/v1/order_grpc_web_pb";
import { RetrieveListOfOrdersRequest } from "manabuf/payment/v1/order_pb";

import orderReaderMutationService, {
    newRetrieveListOfOrders,
    newRetrieveListOfOrderProducts,
    newRetrieveListOfBillItems,
} from "src/squads/payment/service/payment/order-payment-service/order-payment-reader.mutation";

jest.mock("manabuf/payment/v1/order_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/payment/v1/order_grpc_web_pb");

    actual.OrderServicePromiseClient.prototype.retrieveListOfOrders = jest.fn();
    actual.OrderServicePromiseClient.prototype.retrieveListOfOrderProducts = jest.fn();
    actual.OrderServicePromiseClient.prototype.retrieveListOfBillItems = jest.fn();
    actual.OrderServicePromiseClient.prototype.retrieveListOfOrderItems = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("retrieveListOfOrders retrieve list of orders", () => {
    it("should retrieve orders correctly with valid param", async () => {
        (OrderServicePromiseClient.prototype.retrieveListOfOrders as jest.Mock).mockImplementation(
            () => fakeReturn
        );

        const retrieveOrderParams: RetrieveListOfOrdersRequest.AsObject = {
            keyword: "keyword",
            paging: {
                limit: 5,
                offsetInteger: 0,
                offsetString: "Order_10",
            },
            orderStatus: OrderStatus.ORDER_STATUS_ALL,
        };

        retrieveOrderParams.filter = {
            orderTypesList: [OrderType.ORDER_TYPE_NEW],
            productIdsList: ["product_id_1"],
        };

        await orderReaderMutationService.retrieveListOfOrders(retrieveOrderParams);

        expect(OrderServicePromiseClient.prototype.retrieveListOfOrders).toBeCalledWith(
            newRetrieveListOfOrders(retrieveOrderParams)
        );
    });

    it("should throw error with invalid param retrieve orders", async () => {
        (OrderServicePromiseClient.prototype.retrieveListOfOrders as jest.Mock).mockImplementation(
            () => {
                return fakeReturn;
            }
        );

        const retrieveOrderParams: RetrieveListOfOrdersRequest.AsObject = {
            keyword: "keyword",
            orderStatus: OrderStatus.ORDER_STATUS_ALL,
        };

        await expect(
            orderReaderMutationService.retrieveListOfOrders(retrieveOrderParams)
        ).rejects.toThrow(Error("ra.message.invalid_form"));
    });
});

describe("retrieveListOfOrderProducts retrieve list of order product", () => {
    it("should retrieve list of order product correctly with valid param", async () => {
        (
            OrderServicePromiseClient.prototype.retrieveListOfOrderProducts as jest.Mock
        ).mockReturnValue(fakeReturn);

        const retrieveOrderProductsParams: NsFatimaOrderService.RetrieveListOfOrderProductsRequest =
            {
                studentId: "student_id_1",
                paging: {
                    limit: 10,
                    offsetInteger: 0,
                    offsetString: "",
                },
            };

        await orderReaderMutationService.retrieveListOfOrderProducts(retrieveOrderProductsParams);

        expect(OrderServicePromiseClient.prototype.retrieveListOfOrderProducts).toBeCalledWith(
            newRetrieveListOfOrderProducts(retrieveOrderProductsParams)
        );
    });

    it("should throw error with invalid param retrieve list of order product", async () => {
        (
            OrderServicePromiseClient.prototype.retrieveListOfOrderProducts as jest.Mock
        ).mockReturnValue(fakeReturn);

        const retrieveOrderProductsParams: NsFatimaOrderService.RetrieveListOfOrderProductsRequest =
            {
                studentId: "student_id_1",
                paging: undefined,
            };

        await expect(
            orderReaderMutationService.retrieveListOfOrderProducts(retrieveOrderProductsParams)
        ).rejects.toThrow(Error("ra.message.invalid_form"));
    });
});

describe("retrieveListOfBillItems retrieve list of billing items", () => {
    it("should retrieve list of billing items correctly with valid param", async () => {
        (OrderServicePromiseClient.prototype.retrieveListOfBillItems as jest.Mock).mockReturnValue(
            fakeReturn
        );

        const retrieveBillItemsParams: NsFatimaOrderService.RetrieveListOfBillItemsRequest = {
            studentId: "student_id_1",
            paging: {
                limit: 10,
                offsetInteger: 0,
                offsetString: "",
            },
        };

        await orderReaderMutationService.retrieveListOfBillItems(retrieveBillItemsParams);

        expect(OrderServicePromiseClient.prototype.retrieveListOfBillItems).toBeCalledWith(
            newRetrieveListOfBillItems(retrieveBillItemsParams)
        );
    });

    it("should throw error with invalid param retrieve list of billing items", async () => {
        (OrderServicePromiseClient.prototype.retrieveListOfBillItems as jest.Mock).mockReturnValue(
            fakeReturn
        );

        const retrieveBillItemsParams: NsFatimaOrderService.RetrieveListOfBillItemsRequest = {
            studentId: "student_id_1",
            paging: undefined,
        };

        await expect(
            orderReaderMutationService.retrieveListOfBillItems(retrieveBillItemsParams)
        ).rejects.toThrow(Error("ra.message.invalid_form"));
    });
});

describe("retrieveListOfOrderItems retrieve list of order items", () => {
    it("should retrieve list of order items correctly with valid param", async () => {
        (OrderServicePromiseClient.prototype.retrieveListOfOrderItems as jest.Mock).mockReturnValue(
            fakeReturn
        );

        const retrieveOrderItemsParams: NsFatimaOrderService.RetrieveListOfOrderItemsRequest = {
            studentId: "student_id_1",
            paging: {
                limit: 10,
                offsetInteger: 0,
                offsetString: "",
            },
        };

        await orderReaderMutationService.retrieveListOfOrderItems(retrieveOrderItemsParams);

        expect(OrderServicePromiseClient.prototype.retrieveListOfOrderItems).toBeCalledWith(
            newRetrieveListOfBillItems(retrieveOrderItemsParams)
        );
    });

    it("should throw error with invalid param retrieve list of order items", async () => {
        (OrderServicePromiseClient.prototype.retrieveListOfOrderItems as jest.Mock).mockReturnValue(
            fakeReturn
        );

        const retrieveOrderItemsParams: NsFatimaOrderService.RetrieveListOfOrderItemsRequest = {
            studentId: "student_id_1",
            paging: undefined,
        };

        await expect(
            orderReaderMutationService.retrieveListOfOrderItems(retrieveOrderItemsParams)
        ).rejects.toThrow(Error("ra.message.invalid_form"));
    });
});
