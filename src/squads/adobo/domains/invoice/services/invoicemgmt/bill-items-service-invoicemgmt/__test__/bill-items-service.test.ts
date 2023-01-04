import { CreateInvoiceBillingItemsStatus } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { billItemsService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/bill-items-service-invoicemgmt/bill-items-service";
import { Invoice_BillItemsQueryVariables } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getMockBillItemsData } from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";

import billItemsQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/bill-items-service-invoicemgmt/bill-items-invoicemgmt.query";

jest.mock(
    "src/squads/adobo/domains/invoice/services/invoicemgmt/bill-items-service-invoicemgmt/bill-items-invoicemgmt.query",
    () => ({
        __esModule: true,
        default: {
            getMany: jest.fn(),
        },
    })
);

const mockBillItems = getMockBillItemsData();

describe("Bill items service", () => {
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

        (billItemsQueryInvoiceMgmt.getMany as jest.Mock).mockResolvedValue(mockBillItems);

        const result = await billItemsService.query.billItemsGetMany(variables);

        expect(billItemsQueryInvoiceMgmt.getMany).toBeCalledWith(variables);
        expect(billItemsQueryInvoiceMgmt.getMany).toBeCalledTimes(1);
        expect(result).toEqual(mockBillItems);
    });
});
