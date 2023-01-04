import { billItemService } from "src/squads/payment/service/fatima/bill-item-service/bill-item-service";
import {
    Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
    Payment_GetManyBillItemsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    createMockBillItemListByStudentProductId,
    createMockBillItems,
} from "src/squads/payment/test-utils/mocks/bill-item";

import billItemQueriesFatima from "src/squads/payment/service/fatima/bill-item-service/bill-item-fatima.query";

jest.mock("src/squads/payment/service/fatima/bill-item-service/bill-item-fatima.query", () => ({
    __esModule: true,
    default: {
        getList: jest.fn(),
        getManyBillItemsByStudentProductIds: jest.fn(),
    },
}));

const mockBillItem = createMockBillItems();
const mockBillItemListByStudentProductId = createMockBillItemListByStudentProductId();

describe("Bill item service", () => {
    it("should return bill item list when calling paymentGetBillItemsByOrderId", async () => {
        const queryVariable: Payment_GetManyBillItemsV2QueryVariables = {
            order_id: "order_id_1",
            limit: 10,
            offset: 0,
        };

        (billItemQueriesFatima.getList as jest.Mock).mockResolvedValue(mockBillItem);

        const result = await billItemService.query.paymentGetBillItemsByOrderId(queryVariable);

        expect(billItemQueriesFatima.getList).toBeCalledWith(queryVariable);
        expect(billItemQueriesFatima.getList).toBeCalledTimes(1);
        expect(result).toEqual(mockBillItem);
    });

    it("should throw an error if order_id is empty string when calling paymentGetBillItemsByOrderId", async () => {
        const queryVariable: Payment_GetManyBillItemsV2QueryVariables = {
            order_id: "",
            limit: 10,
            offset: 0,
        };

        await expect(async () => {
            await billItemService.query.paymentGetBillItemsByOrderId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetBillItemsByOrderId",
                errors: [{ field: "order_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(billItemQueriesFatima.getList).not.toBeCalled();
    });

    it("should return bill item list when calling paymentGetManyBillItemsByStudentProductIds", async () => {
        const queryVariable: Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables = {
            student_product_ids: ["student_product_id_1", "student_product_id_2"],
        };

        (billItemQueriesFatima.getManyBillItemsByStudentProductIds as jest.Mock).mockResolvedValue(
            mockBillItemListByStudentProductId
        );

        const result = await billItemService.query.paymentGetManyBillItemsByStudentProductIds(
            queryVariable
        );

        expect(billItemQueriesFatima.getManyBillItemsByStudentProductIds).toBeCalledWith(
            queryVariable
        );
        expect(billItemQueriesFatima.getManyBillItemsByStudentProductIds).toBeCalledTimes(1);
        expect(result).toEqual(mockBillItemListByStudentProductId);
    });

    it("should throw an error if student_package_ids is empty when calling paymentGetManyBillItemsByStudentProductIds", async () => {
        const queryVariable: Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables = {
            student_product_ids: [],
        };

        await expect(async () => {
            await billItemService.query.paymentGetManyBillItemsByStudentProductIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyBillItemsByStudentProductIds",
                errors: [{ field: "student_product_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(billItemQueriesFatima.getManyBillItemsByStudentProductIds).not.toBeCalled();
    });
});
