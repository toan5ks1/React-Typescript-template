import invoiceService from "src/squads/adobo/domains/invoice/services/invoice-service";
import invoiceServiceModifier from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import { getMockIssueInvoicePayload } from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";

jest.mock("src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/invoice-service");

describe(`test for invoice service ${invoiceService.mutation.CREATE.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "generateInvoiceResponse";
        const payload: NsInvoiceService.GenerateInvoicesRequest = {
            invoicesList: [],
        };

        (invoiceServiceModifier.generateInvoices as jest.Mock).mockResolvedValue(response);

        const result = await invoiceService.mutation.CREATE(payload);

        expect(invoiceServiceModifier.generateInvoices).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for invoice service ${invoiceService.mutation.issueInvoice.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "issueInvoiceResponse";
        const mockIssueInvoicePayload = getMockIssueInvoicePayload();

        (invoiceServiceModifier.issueInvoice as jest.Mock).mockResolvedValue(response);

        const result = await invoiceService.mutation.issueInvoice(mockIssueInvoicePayload);

        expect(invoiceServiceModifier.issueInvoice).toBeCalledWith(mockIssueInvoicePayload);
        expect(result).toEqual(response);
    });
});
