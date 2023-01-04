import { Payment_GetProductIdsByGradeIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { productGradeService } from "src/squads/payment/service/fatima/product-grade-service/product-grade-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockGradeBasedProductIds } from "src/squads/payment/test-utils/mocks/products";

import productGradeFatimaQueries from "src/squads/payment/service/fatima/product-grade-service/product-grade-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/product-grade-service/product-grade-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getProductIds: jest.fn(),
        },
    })
);

const mockGradeBasedProductIds = createMockGradeBasedProductIds();

describe("Product grade service", () => {
    it("should return product ids when calling paymentGetProductIdsByGradeIds", async () => {
        (productGradeFatimaQueries.getProductIds as jest.Mock).mockResolvedValue(
            mockGradeBasedProductIds
        );

        const queryVariable: Payment_GetProductIdsByGradeIdsQueryVariables = {
            grade_ids: [1, 2, 3],
        };

        const response = await productGradeService.query.paymentGetProductIdsByGradeIds(
            queryVariable
        );

        expect(productGradeFatimaQueries.getProductIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockGradeBasedProductIds);
    });

    it("should throw an error if grade_ids is undefined when calling paymentGetProductIdsByGradeIds", async () => {
        (productGradeFatimaQueries.getProductIds as jest.Mock).mockResolvedValue(undefined);

        const queryVariable: Payment_GetProductIdsByGradeIdsQueryVariables = {
            grade_ids: undefined,
        };

        await expect(async () => {
            await productGradeService.query.paymentGetProductIdsByGradeIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetProductIdsByGradeIds",
                errors: [{ field: "grade_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productGradeFatimaQueries.getProductIds).not.toBeCalled();
    });
});
