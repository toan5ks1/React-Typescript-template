import { discountService } from "src/squads/payment/service/fatima/discount-service/discount-service";
import {
    Payment_GetManyDiscountsQueryVariables,
    Payment_GetManyDiscountsByDiscountIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockDiscountList } from "src/squads/payment/test-utils/mocks/discount";

import discountQueriesFatima from "src/squads/payment/service/fatima/discount-service/discount-fatima.query";

jest.mock("src/squads/payment/service/fatima/discount-service/discount-fatima.query", () => ({
    __esModule: true,
    default: {
        getMany: jest.fn(),
        getManyDiscountByIds: jest.fn(),
    },
}));

const mockDiscounts = createMockDiscountList();

describe("Discount service", () => {
    it("should return discount list when calling paymentGetManyDiscountsByCurrentDate", async () => {
        const queryVariable: Payment_GetManyDiscountsQueryVariables = {
            name: "discount name",
            limit: 10,
            current_date: "2021-12-28T02:35:17.676837+00:00",
        };

        (discountQueriesFatima.getMany as jest.Mock).mockResolvedValue(mockDiscounts);

        const result = await discountService.query.paymentGetManyDiscountsByCurrentDate(
            queryVariable
        );

        expect(discountQueriesFatima.getMany).toBeCalledWith(queryVariable);
        expect(discountQueriesFatima.getMany).toBeCalledTimes(1);
        expect(result).toEqual(mockDiscounts);
    });

    it("should throw an error if current_date is undefined when calling paymentGetManyDiscountsByCurrentDate", async () => {
        const queryVariable: Payment_GetManyDiscountsQueryVariables = {
            name: "discount name",
            limit: 10,
            current_date: undefined,
        };

        await expect(async () => {
            await discountService.query.paymentGetManyDiscountsByCurrentDate(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyDiscountsByCurrentDate",
                errors: [{ field: "current_date", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(discountQueriesFatima.getMany).not.toBeCalled();
    });

    it("should return discount list when calling paymentGetManyDiscountByDiscountIds", async () => {
        const queryVariable: Payment_GetManyDiscountsByDiscountIdsQueryVariables = {
            discountIds: ["discount_id_1", "discount_id_2", "discount_id_3"],
        };

        (discountQueriesFatima.getManyDiscountByIds as jest.Mock).mockResolvedValue(mockDiscounts);

        const result = await discountService.query.paymentGetManyDiscountByDiscountIds(
            queryVariable
        );

        expect(discountQueriesFatima.getManyDiscountByIds).toBeCalledWith(queryVariable);
        expect(discountQueriesFatima.getManyDiscountByIds).toBeCalledTimes(1);
        expect(result).toEqual(mockDiscounts);
    });

    it("should throw an error if discountIds is undefined when calling paymentGetManyDiscountByDiscountIds", async () => {
        const queryVariable: Payment_GetManyDiscountsByDiscountIdsQueryVariables = {
            discountIds: undefined,
        };

        await expect(async () => {
            await discountService.query.paymentGetManyDiscountByDiscountIds(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyDiscountByDiscountIds",
                errors: [{ field: "discountIds", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(discountQueriesFatima.getManyDiscountByIds).not.toBeCalled();
    });
});
