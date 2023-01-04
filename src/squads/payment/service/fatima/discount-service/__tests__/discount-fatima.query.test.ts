import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyDiscountsQuery,
    Payment_GetManyDiscountsQueryVariables,
    Payment_GetManyDiscountsByDiscountIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockDiscountList } from "src/squads/payment/test-utils/mocks/discount";

import discountQueriesFatima from "../discount-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockDiscounts = createMockDiscountList();

describe("Discount query", () => {
    it("should return discount list when calling getMany", async () => {
        const variables: Payment_GetManyDiscountsQueryVariables = {
            name: "discount name",
            limit: 10,
            current_date: "2021-12-28T02:35:17.676837+00:00",
        };

        const mockDiscountDoQuery: HasuraAndDefaultResponse<Payment_GetManyDiscountsQuery> = {
            data: {
                discount: mockDiscounts,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDiscountDoQuery);

        const result = await discountQueriesFatima.getMany(variables);

        expect(result).toEqual(mockDiscounts);
    });

    it("should return discount list when calling getManyDiscountByIds", async () => {
        const variables: Payment_GetManyDiscountsByDiscountIdsQueryVariables = {
            discountIds: ["discount_id_1", "discount_id_2", "discount_id_3"],
        };

        const mockDiscountDoQuery: HasuraAndDefaultResponse<Payment_GetManyDiscountsQuery> = {
            data: {
                discount: mockDiscounts,
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDiscountDoQuery);

        const result = await discountQueriesFatima.getManyDiscountByIds(variables);

        expect(result).toEqual(mockDiscounts);
    });
});
