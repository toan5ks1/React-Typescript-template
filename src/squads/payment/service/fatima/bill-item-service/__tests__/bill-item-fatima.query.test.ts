import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyBillItemsByStudentProductIdsV2Query,
    Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
    Payment_GetManyBillItemsV2Query,
    Payment_GetManyBillItemsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockBillItemListByStudentProductId,
    createMockBillItems,
} from "src/squads/payment/test-utils/mocks/bill-item";

import billItemQueriesFatima from "src/squads/payment/service/fatima/bill-item-service/bill-item-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockBillItemList = createMockBillItems();
const mockBillItemListByStudentProductId = createMockBillItemListByStudentProductId();

describe("Bill item query", () => {
    it("should return bill item list when calling getList", async () => {
        const variables: Payment_GetManyBillItemsV2QueryVariables = {
            order_id: "order_id_1",
            limit: 10,
            offset: 0,
        };

        const mockBillItemDoQuery: HasuraAndDefaultResponse<Payment_GetManyBillItemsV2Query> = {
            data: {
                bill_item: mockBillItemList.data,
                bill_item_aggregate: {
                    aggregate: {
                        count: mockBillItemList.total,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockBillItemDoQuery);

        const result = await billItemQueriesFatima.getList(variables);

        expect(result).toEqual(mockBillItemList);
    });

    it("should return bill item list when calling getManyBillItemsByStudentProductIds", async () => {
        const variables: Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables = {
            student_product_ids: ["student_id_1", "student_id_2"],
        };

        const mockBillItemDoQuery: HasuraAndDefaultResponse<Payment_GetManyBillItemsByStudentProductIdsV2Query> =
            {
                data: {
                    bill_item: mockBillItemListByStudentProductId,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockBillItemDoQuery);

        const result = await billItemQueriesFatima.getManyBillItemsByStudentProductIds(variables);

        expect(result).toEqual(mockBillItemListByStudentProductId);
    });
});
