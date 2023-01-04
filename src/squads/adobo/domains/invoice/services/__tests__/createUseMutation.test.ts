import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import {
    createUseMutation,
    UseMutationOptions,
} from "src/squads/adobo/domains/invoice/services/service-creator";
import { getMockBillItemsData } from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";
import { TestQueryWrapper } from "src/squads/adobo/domains/invoice/test-utils/react-hooks";

import { InvoiceType } from "manabuf/invoicemgmt/v1/enums_pb";

import { act, renderHook } from "@testing-library/react-hooks";

const service = {
    invoice: {
        mutation: {
            CREATE: jest.fn(),
        },
    },
};

const studentId = "student_id_1";
const mockBillingItems = getMockBillItemsData();

const mockBillItemIdsList = [
    mockBillingItems[0].bill_item_sequence_number,
    mockBillingItems[1].bill_item_sequence_number,
];
const mockSubTotal = mockBillingItems[0].final_price + mockBillingItems[1].final_price;
const mockTotal = mockSubTotal;

const mockNewInvoice: NsInvoiceService.GenerateInvoiceDetail = {
    studentId: studentId,
    billItemIdsList: mockBillItemIdsList,
    subTotal: mockSubTotal,
    total: mockTotal,
    invoiceType: InvoiceType.MANUAL,
};

const invoiceResponse: NsInvoiceService.GenerateInvoicesResponse = {
    successful: true,
    errorsList: [],
};

const invoiceRequest: NsInvoiceService.GenerateInvoicesRequest = {
    invoicesList: [mockNewInvoice],
};

const defaultUseMutationParams = invoiceRequest;

const renderUseMutationHook = (
    options?: UseMutationOptions<
        NsInvoiceService.GenerateInvoicesRequest,
        NsInvoiceService.GenerateInvoicesResponse
    >
) => {
    const useMutation = createUseMutation(service)({
        entity: "invoice",
        action: "CREATE",
    });
    return renderHook(() => useMutation(options), {
        wrapper: TestQueryWrapper,
    });
};

const mockEntryExitService = (
    entryExitResponse: NsInvoiceService.GenerateInvoicesResponse = invoiceResponse
) => {
    (service.invoice.mutation.CREATE as jest.Mock).mockImplementation(
        (
            _variables: NsInvoiceService.GenerateInvoicesRequest
        ): NsInvoiceService.GenerateInvoicesResponse => {
            return entryExitResponse;
        }
    );
};

describe("createUseMutation create infer mutation", () => {
    it("should return correct data when called", async () => {
        mockEntryExitService();

        const { result, waitForNextUpdate } = renderUseMutationHook();

        act(() => {
            result.current.mutate(defaultUseMutationParams);
        });

        await waitForNextUpdate();

        expect(service.invoice.mutation.CREATE).toBeCalledWith(defaultUseMutationParams);
        expect(result.current.data).toEqual(invoiceResponse);
    });

    it("should call lifecycle hooks correctly", async () => {
        mockEntryExitService();

        const options: UseMutationOptions<
            NsInvoiceService.GenerateInvoicesRequest,
            NsInvoiceService.GenerateInvoicesResponse
        > = {
            onSuccess: jest.fn(),
        };

        const { result, waitForNextUpdate } = renderUseMutationHook(options);

        act(() => {
            result.current.mutate(defaultUseMutationParams);
        });
        await waitForNextUpdate();

        expect(service.invoice.mutation.CREATE).toBeCalledWith(defaultUseMutationParams);
        expect(options.onSuccess).toBeCalledWith(
            invoiceResponse,
            defaultUseMutationParams,
            undefined
        );
    });
});
