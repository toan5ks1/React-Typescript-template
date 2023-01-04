import { Payment_GetEnrollmentProductIdsByProductIdsQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { productSettingService } from "src/squads/payment/service/fatima/product-setting-service/product-setting-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockEnrollmentProductIds } from "src/squads/payment/test-utils/mocks/enrollment";

import productSettingQueriesFatima from "src/squads/payment/service/fatima/product-setting-service/product-setting-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/product-setting-service/product-setting-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getEnrollmentProductIdsByProductIds: jest.fn(),
        },
    })
);

const mockEnrollmentProductId = "product_id_1";
const mockEnrollmentProductIds = [createMockEnrollmentProductIds()[0]];

describe("Product setting service", () => {
    it("should return enrollment product ids when calling getEnrollmentProductIdsByProductIds", async () => {
        (
            productSettingQueriesFatima.getEnrollmentProductIdsByProductIds as jest.Mock
        ).mockResolvedValue(mockEnrollmentProductIds);

        const queryVariable: Partial<Payment_GetEnrollmentProductIdsByProductIdsQueryVariables> = {
            productIds: [mockEnrollmentProductId],
        };

        const response =
            await productSettingService.query.paymentGetEnrollmentProductIdsByProductIds(
                queryVariable
            );

        expect(productSettingQueriesFatima.getEnrollmentProductIdsByProductIds).toBeCalled();
        expect(response).toEqual(mockEnrollmentProductIds);
    });

    it("should throw an error when calling getEnrollmentProductIdsByProductIds with undefined product_id", async () => {
        (
            productSettingQueriesFatima.getEnrollmentProductIdsByProductIds as jest.Mock
        ).mockResolvedValue(mockEnrollmentProductIds);

        const queryVariable: Partial<Payment_GetEnrollmentProductIdsByProductIdsQueryVariables> = {
            productIds: undefined,
        };

        await expect(async () => {
            await productSettingService.query.paymentGetEnrollmentProductIdsByProductIds(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetEnrollmentProductIdsByProductIds",
                errors: [{ field: "product_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(productSettingQueriesFatima.getEnrollmentProductIdsByProductIds).not.toBeCalled();
    });
});
