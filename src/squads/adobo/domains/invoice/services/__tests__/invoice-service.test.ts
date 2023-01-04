import invoiceService from "src/squads/adobo/domains/invoice/services/invoice-service";
import {
    Invoice_InvoiceOneQueryVariables,
    Invoice_UsersQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { getMockInvoiceDetail } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { getUsersMock } from "src/squads/adobo/domains/invoice/test-utils/mocks/users";

import invoiceQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice.query";
import userQueryInvoiceMgmt from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/user.query";

jest.mock(
    "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice.query",
    () => ({
        __esModule: true,
        default: {
            getInvoice: jest.fn(),
        },
    })
);

jest.mock(
    "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/user.query",
    () => ({
        __esModule: true,
        default: {
            getUsers: jest.fn(),
        },
    })
);

const mockInvoice = getMockInvoiceDetail();
const mockUser = getUsersMock();

describe("Invoice Item Service", () => {
    it("should return one invoice when calling getInvoice", async () => {
        const variables: Invoice_InvoiceOneQueryVariables = {
            invoice_id: "user_id_1",
        };

        (invoiceQueryInvoiceMgmt.getInvoice as jest.Mock).mockResolvedValue(mockInvoice);

        const result = await invoiceService.query.invoiceGetOne(variables);

        expect(invoiceQueryInvoiceMgmt.getInvoice).toBeCalledWith(variables);
        expect(invoiceQueryInvoiceMgmt.getInvoice).toBeCalledTimes(1);
        expect(result).toEqual(mockInvoice);
    });

    it("should get student names when calling getUsers", async () => {
        const variables: Invoice_UsersQueryVariables = {
            user_ids: ["user_id_1"],
        };

        (userQueryInvoiceMgmt.getUsers as jest.Mock).mockResolvedValue(mockUser);

        const result = await invoiceService.query.invoiceGetUsers(variables);

        expect(userQueryInvoiceMgmt.getUsers).toBeCalledWith(variables);
        expect(userQueryInvoiceMgmt.getUsers).toBeCalledTimes(1);
        expect(result).toEqual(mockUser);
    });
});
