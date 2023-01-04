import { Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { studentProductService } from "src/squads/payment/service/fatima/student-product-service/student-product-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockStudentProducts } from "src/squads/payment/test-utils/mocks/student-product";

import studentProductFatimaQueries from "src/squads/payment/service/fatima/student-product-service/student-product-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/student-product-service/student-product-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getManyStudentProductByStudentProductIds: jest.fn(),
        },
    })
);

const mockStudentProducts = createMockStudentProducts();

describe("Student product service", () => {
    it("should return student product list when calling getManyStudentProductByStudentProductIds", async () => {
        const queryVariable: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables = {
            student_product_ids: ["student_product_id_1", "student_product_id_2"],
        };

        (
            studentProductFatimaQueries.getManyStudentProductByStudentProductIds as jest.Mock
        ).mockResolvedValue(mockStudentProducts);

        const result =
            await studentProductService.query.paymentGetManyStudentProductByStudentProductIds(
                queryVariable
            );

        expect(studentProductFatimaQueries.getManyStudentProductByStudentProductIds).toBeCalledWith(
            queryVariable
        );
        expect(
            studentProductFatimaQueries.getManyStudentProductByStudentProductIds
        ).toBeCalledTimes(1);
        expect(result).toEqual(mockStudentProducts);
    });

    it("should throw an error if student_product_ids is empty when calling getManyStudentProductByStudentProductIds", async () => {
        const queryVariable: Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables = {
            student_product_ids: [],
        };

        await expect(async () => {
            await studentProductService.query.paymentGetManyStudentProductByStudentProductIds(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyStudentProductByStudentProductIds",
                errors: [{ field: "student_product_ids", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(
            studentProductFatimaQueries.getManyStudentProductByStudentProductIds
        ).not.toBeCalled();
    });
});
