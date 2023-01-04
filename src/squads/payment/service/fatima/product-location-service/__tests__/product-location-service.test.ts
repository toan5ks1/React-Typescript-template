import { Payment_GetProductIdsByLocationIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { productLocationService } from "src/squads/payment/service/fatima/product-location-service/product-location-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockLocationBasedProductIds } from "src/squads/payment/test-utils/mocks/products";

import productLocationQueriesFatima from "src/squads/payment/service/fatima/product-location-service/product-location-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/product-location-service/product-location-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getProductIds: jest.fn(),
        },
    })
);

const mockLocationBasedProductIds = createMockLocationBasedProductIds();

describe("Product location service", () => {
    it("should return product ids when calling paymentGetProductIdsByLocationIds", async () => {
        (productLocationQueriesFatima.getProductIds as jest.Mock).mockResolvedValue(
            mockLocationBasedProductIds
        );

        const queryVariable: Payment_GetProductIdsByLocationIdsQueryVariables = {
            location_ids: ["location_id_1"],
        };

        const response = await productLocationService.query.paymentGetProductIdsByLocationIds(
            queryVariable
        );

        expect(productLocationQueriesFatima.getProductIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockLocationBasedProductIds);
    });

    it("should throw an error if location_ids is undefined when calling paymentGetProductIdsByLocationIds", async () => {
        (productLocationQueriesFatima.getProductIds as jest.Mock).mockResolvedValue(undefined);

        const queryVariable: Payment_GetProductIdsByLocationIdsQueryVariables = {
            location_ids: undefined,
        };

        await expect(async () => {
            await productLocationService.query.paymentGetProductIdsByLocationIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetProductIdsByLocationIds",
                errors: [{ field: "location_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productLocationQueriesFatima.getProductIds).not.toBeCalled();
    });
});
