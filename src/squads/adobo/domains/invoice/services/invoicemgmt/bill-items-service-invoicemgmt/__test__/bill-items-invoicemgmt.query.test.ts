import { CreateInvoiceBillingItemsStatus } from "src/squads/adobo/domains/invoice/common/constants/enum";
import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/adobo/domains/invoice/internals/hasura-client/execute-query";
import {
    Invoice_BillItemsQuery,
    Invoice_BillItemsQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getMockBillItemsData } from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";

import billItemsQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/bill-items-service-invoicemgmt/bill-items-invoicemgmt.query";

jest.mock("src/squads/adobo/domains/invoice/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockBillItems = getMockBillItemsData();

describe("Bill items query", () => {
    it("should return bill items list when calling getMany", async () => {
        const variables: Invoice_BillItemsQueryVariables = {
            student_id: "student_id_1",
            billing_statuses: [
                CreateInvoiceBillingItemsStatus.BILLING_STATUS_BILLED,
                CreateInvoiceBillingItemsStatus.BILLING_STATUS_PENDING,
            ],
            limit: 10,
            offset: 0,
        };

        const mockBillItemQuery: HasuraAndDefaultResponse<Invoice_BillItemsQuery> = {
            data: {
                bill_item: mockBillItems,
                bill_item_aggregate: {
                    aggregate: {
                        count: mockBillItems.length,
                    },
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockBillItemQuery);

        const result = await billItemsQueryInvoiceMgmt.getMany(variables);

        expect(result).toEqual({
            data: mockBillItems,
            total: mockBillItems.length,
        });
    });
});
