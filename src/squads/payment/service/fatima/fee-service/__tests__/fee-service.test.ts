import {
    Payment_GetFeeByProductIdQueryVariables,
    Payment_GetManyFeesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { feeService } from "src/squads/payment/service/fatima/fee-service/fee-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    createMockProductFeeList,
    createMockProductFeeListWithProductId,
} from "src/squads/payment/test-utils/mocks/products";

import productFeeQueriesFatima from "src/squads/payment/service/fatima/fee-service/fee-fatima.query";

jest.mock("src/squads/payment/service/fatima/fee-service/fee-fatima.query", () => ({
    __esModule: true,
    default: {
        getOne: jest.fn(),
        getManyFeesByIds: jest.fn(),
    },
}));

const mockProductFee = createMockProductFeeList();
const mockProductFeeListWithProductId = createMockProductFeeListWithProductId();

describe("Product fee service", () => {
    it("should return product fee list when calling paymentGetOneProductFeeByProductId", async () => {
        (productFeeQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockProductFee);

        const queryVariable: Payment_GetFeeByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const response = await feeService.query.paymentGetOneProductFeeByProductId(queryVariable);

        expect(productFeeQueriesFatima.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductFee);
    });

    it("should throw an error if product_id is undefined when calling paymentGetOneProductFeeByProductId", async () => {
        const queryVariable: Partial<Payment_GetFeeByProductIdQueryVariables> = {
            product_id: undefined,
        };

        await expect(async () => {
            await feeService.query.paymentGetOneProductFeeByProductId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "payment - fee - paymentGetOneProductFeeByProductId",
                errors: [{ field: "product_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productFeeQueriesFatima.getOne).not.toBeCalled();
    });

    it("should return product fee list when calling paymentGetManyProductFeesTypeByProductIds", async function () {
        (productFeeQueriesFatima.getManyFeesByIds as jest.Mock).mockResolvedValue(
            mockProductFeeListWithProductId
        );

        const queryVariable: Payment_GetManyFeesByProductIdsQueryVariables = {
            productIds: ["product_id_1", "product_id_2", "product_id_3"],
        };

        const response = await feeService.query.paymentGetManyProductFeesTypeByProductIds(
            queryVariable
        );

        expect(productFeeQueriesFatima.getManyFeesByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductFeeListWithProductId);
    });

    it("should throw an error if productIds is undefined when calling paymentGetManyProductFeesTypeByProductIds", async function () {
        (productFeeQueriesFatima.getManyFeesByIds as jest.Mock).mockResolvedValue(
            mockProductFeeListWithProductId
        );

        const queryVariable: Payment_GetManyFeesByProductIdsQueryVariables = {
            productIds: undefined,
        };

        await expect(async () => {
            await feeService.query.paymentGetManyProductFeesTypeByProductIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyProductFeesTypeByProductIds",
                errors: [{ field: "productIds", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productFeeQueriesFatima.getManyFeesByIds).not.toBeCalled();
    });
});
