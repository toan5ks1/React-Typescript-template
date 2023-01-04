import {
    Payment_GetManyProductPricesByProductIdsQueryVariables,
    Payment_GetProductPriceByProductIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { productPriceService } from "src/squads/payment/service/fatima/product-price-service/product-price-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    createMockProductPriceList,
    createMockProductPriceManyList,
} from "src/squads/payment/test-utils/mocks/products";

import productPriceQueriesFatima from "src/squads/payment/service/fatima/product-price-service/product-price-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/product-price-service/product-price-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getOne: jest.fn(),
            getMany: jest.fn(),
            getManyPricesByIds: jest.fn(),
        },
    })
);

const mockProductPrice = createMockProductPriceList()[0];
const mockProductPriceManyList = createMockProductPriceManyList();
const mockProductPrices = createMockProductPriceList();

describe("Product price service", () => {
    it("should return product price when calling paymentGetOneProductPriceByProductId", async () => {
        (productPriceQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockProductPrice);

        const queryVariable: Payment_GetProductPriceByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const response = await productPriceService.query.paymentGetOneProductPriceByProductId(
            queryVariable
        );

        expect(productPriceQueriesFatima.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductPrice);
    });

    it("should throw an error when calling paymentGetOneProductPriceByProductId with undefined product_id", async () => {
        (productPriceQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockProductPrice);

        const queryVariable: Partial<Payment_GetProductPriceByProductIdQueryVariables> = {
            product_id: undefined,
        };

        await expect(async () => {
            await productPriceService.query.paymentGetOneProductPriceByProductId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetOneProductPriceByProductId",
                errors: [{ field: "product_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productPriceQueriesFatima.getOne).not.toBeCalled();
    });

    it("should return product prices when calling paymentGetManyProductPriceByProductId", async () => {
        (productPriceQueriesFatima.getMany as jest.Mock).mockResolvedValue(mockProductPrices);

        const queryVariable: Payment_GetProductPriceByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const response = await productPriceService.query.paymentGetManyProductPricesByProductId(
            queryVariable
        );

        expect(productPriceQueriesFatima.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductPrices);
    });

    it("should throw an error when calling paymentGetManyProductPriceByProductId with undefined product_id", async () => {
        (productPriceQueriesFatima.getMany as jest.Mock).mockResolvedValue(mockProductPrices);

        const queryVariable: Partial<Payment_GetProductPriceByProductIdQueryVariables> = {
            product_id: undefined,
        };

        await expect(async () => {
            await productPriceService.query.paymentGetManyProductPricesByProductId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyProductPriceByProductId",
                errors: [{ field: "product_id" }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productPriceQueriesFatima.getMany).not.toBeCalled();
    });

    it("should return product price list when calling paymentGetManyProductsPriceByProductIds", async () => {
        (productPriceQueriesFatima.getManyPricesByIds as jest.Mock).mockResolvedValue(
            mockProductPriceManyList
        );

        const queryVariable: Payment_GetManyProductPricesByProductIdsQueryVariables = {
            productIds: ["product_id_1", "product_id_2", "product_id_3"],
        };

        const response = await productPriceService.query.paymentGetManyProductsPriceByProductIds(
            queryVariable
        );

        expect(productPriceQueriesFatima.getManyPricesByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductPriceManyList);
    });

    it("should throw an error if productIds is undefined when calling paymentGetManyProductsPriceByProductIds", async () => {
        (productPriceQueriesFatima.getManyPricesByIds as jest.Mock).mockResolvedValue(undefined);

        const queryVariable: Payment_GetManyProductPricesByProductIdsQueryVariables = {
            productIds: undefined,
        };

        await expect(async () => {
            await productPriceService.query.paymentGetManyProductsPriceByProductIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyProductsPriceByProductIds",
                errors: [{ field: "productIds", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productPriceQueriesFatima.getManyPricesByIds).not.toBeCalled();
    });
});
