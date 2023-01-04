import {
    Payment_GetManyMaterialsByProductIdsV2QueryVariables,
    Payment_GetMaterialByProductIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { materialService } from "src/squads/payment/service/fatima/material-service/material-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    createMockProductMaterialList,
    createMockProductMaterialListWithProductId,
} from "src/squads/payment/test-utils/mocks/products";

import productMaterialQueriesFatima from "src/squads/payment/service/fatima/material-service/material-fatima.query";

jest.mock("src/squads/payment/service/fatima/material-service/material-fatima.query", () => ({
    __esModule: true,
    default: {
        getOne: jest.fn(),
        getManyMaterialsByIds: jest.fn(),
    },
}));

const mockProductMaterial = createMockProductMaterialList()[0];
const mockProductMaterialListWithProductId = createMockProductMaterialListWithProductId();

describe("Product material service", () => {
    it("should return product material when calling paymentGetOneProductMaterialByProductId", async () => {
        (productMaterialQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockProductMaterial);

        const queryVariable: Payment_GetMaterialByProductIdQueryVariables = {
            product_id: "product_id_1",
        };

        const response = await materialService.query.paymentGetOneProductMaterialByProductId(
            queryVariable
        );

        expect(productMaterialQueriesFatima.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductMaterial);
    });

    it("should throw an error if product_id is undefined when calling paymentGetOneProductMaterialByProductId", async () => {
        (productMaterialQueriesFatima.getOne as jest.Mock).mockResolvedValue(mockProductMaterial);

        const queryVariable: Partial<Payment_GetMaterialByProductIdQueryVariables> = {
            product_id: undefined,
        };

        await expect(async () => {
            await materialService.query.paymentGetOneProductMaterialByProductId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "payment - material - paymentGetOneProductMaterialByProductId",
                errors: [{ field: "product_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productMaterialQueriesFatima.getOne).not.toBeCalled();
    });

    it("should return product material list when calling getManyMaterialsByIds", async () => {
        (productMaterialQueriesFatima.getManyMaterialsByIds as jest.Mock).mockResolvedValue(
            mockProductMaterialListWithProductId
        );

        const queryVariable: Payment_GetManyMaterialsByProductIdsV2QueryVariables = {
            productIds: ["product_id_1", "product_id_2", "product_id_3"],
        };

        const response = await materialService.query.paymentGetManyProductMaterialsTypeByProductIds(
            queryVariable
        );

        expect(productMaterialQueriesFatima.getManyMaterialsByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockProductMaterialListWithProductId);
    });

    it("should throw an error if productIds is undefined when calling paymentGetManyProductMaterialsTypeByProductIds", async () => {
        (productMaterialQueriesFatima.getManyMaterialsByIds as jest.Mock).mockResolvedValue(
            mockProductMaterialListWithProductId
        );

        const queryVariable: Payment_GetManyMaterialsByProductIdsV2QueryVariables = {
            productIds: undefined,
        };

        await expect(async () => {
            await materialService.query.paymentGetManyProductMaterialsTypeByProductIds(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyProductMaterialsTypeByProductIds",
                errors: [{ field: "productIds", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productMaterialQueriesFatima.getManyMaterialsByIds).not.toBeCalled();
    });
});
