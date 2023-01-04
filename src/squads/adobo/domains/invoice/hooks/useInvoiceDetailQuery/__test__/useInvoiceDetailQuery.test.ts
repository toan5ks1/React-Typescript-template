import { invoiceBillItemsService } from "src/squads/adobo/domains/invoice//services/invoicemgmt/invoice-bill-items-service/invoice-bill-items-service";
import { paymentHistoryService } from "src/squads/adobo/domains/invoice//services/invoicemgmt/payment-history/payment-history-service";
import { getMockInvoiceActionLogData } from "src/squads/adobo/domains/invoice//test-utils/mocks/invoice-action-log";
import { getMockPaymentHistoryList } from "src/squads/adobo/domains/invoice//test-utils/mocks/payment-history";
import { inferQuery } from "src/squads/adobo/domains/invoice/services/infer-service";
import invoiceService from "src/squads/adobo/domains/invoice/services/invoice-service";
import { invoiceActionLogService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-action-log-service/invoice-action-log-service";
import {
    Invoice_ActionLogQuery,
    Invoice_ActionLogQueryVariables,
    Invoice_BillItemManyQuery,
    Invoice_BillItemManyQueryVariables,
    Invoice_BillItemsListQuery,
    Invoice_BillItemsListQueryVariables,
    Invoice_InvoiceOneQuery,
    Invoice_InvoiceOneQueryVariables,
    Invoice_PaymentHistoryQuery,
    Invoice_PaymentHistoryQueryVariables,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import {
    getMockInvoiceBillItems,
    getMockInvoiceDetail,
} from "src/squads/adobo/domains/invoice/test-utils/mocks/invoices";
import { mockWarner } from "src/squads/adobo/domains/invoice/test-utils/warner";

import { TestQueryWrapper } from "src/squads/adobo/domains/invoice/test-utils/providers/TestQueryWrapper";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useInvoiceDetailQuery from "src/squads/adobo/domains/invoice/hooks/useInvoiceDetailQuery";

jest.mock("src/squads/adobo/domains/invoice/services/infer-service", () => {
    return {
        _esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockInvoiceId = "01G7DWMBQTV5414QRMFWZ8BN54";
const mockActionLogsQuery = jest.fn();
const mockBillItemsQuery = jest.fn();
const mockInvoiceQuery = jest.fn();
const mockPaymentHistoryQuery = jest.fn();

const mockActionLogs = getMockInvoiceActionLogData();
const mockInvoiceBillItems = getMockInvoiceBillItems();
const mockInvoice = getMockInvoiceDetail();
const mockPaymentHistory = getMockPaymentHistoryList();

const mockInferQuery = ({ entity }: Parameters<typeof inferQuery>[0]) => {
    switch (entity) {
        case "invoiceActionLog": {
            return mockActionLogsQuery;
        }
        case "invoiceBillItems": {
            return mockBillItemsQuery;
        }
        case "invoice": {
            return mockInvoiceQuery;
        }
        case "paymentHistory": {
            return mockPaymentHistoryQuery;
        }
        default:
            throw new Error("Please catch the other queries");
    }
};

describe(useInvoiceDetailQuery.name, () => {
    const std = mockWarner();

    it("should return EMPTY data when data is FETCHING", () => {
        mockActionLogsQuery.mockReturnValue({
            data: [],
            isFetching: true,
        });

        mockBillItemsQuery.mockReturnValue({
            data: [],
            isFetching: true,
        });

        mockInvoiceQuery.mockReturnValue({
            data: undefined,
            isFetching: true,
        });

        mockPaymentHistoryQuery.mockReturnValue({
            data: [],
            isFetching: true,
        });

        (inferQuery as jest.Mock).mockImplementation(mockInferQuery);

        const { result } = renderHook(() => useInvoiceDetailQuery({ invoiceId: mockInvoiceId }), {
            wrapper: TestQueryWrapper,
        });

        expect(result.current).toMatchObject({
            invoice: undefined,
            paymentHistory: [],
            billItems: [],
            actionLogs: [],
            isFetching: true,
        });
    });

    it("should return CORRECT data when data is loaded", () => {
        mockActionLogsQuery.mockReturnValue({
            data: mockActionLogs,
            isFetching: false,
        });

        mockBillItemsQuery.mockReturnValue({
            data: mockInvoiceBillItems,
            isFetching: false,
        });

        mockInvoiceQuery.mockReturnValue({
            data: mockInvoice,
            isFetching: false,
        });

        mockPaymentHistoryQuery.mockReturnValue({
            data: mockPaymentHistory,
            isFetching: false,
        });

        (inferQuery as jest.Mock).mockImplementation(mockInferQuery);

        const { result } = renderHook(() => useInvoiceDetailQuery({ invoiceId: mockInvoiceId }), {
            wrapper: TestQueryWrapper,
        });

        expect(result.current).toMatchObject({
            invoice: mockInvoice,
            paymentHistory: mockPaymentHistory,
            billItems: mockInvoiceBillItems,
            actionLogs: mockActionLogs,
            isFetching: false,
        });
    });

    it("should return error when paymentHistory query failed", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "paymentHistory";
                    action: keyof typeof paymentHistoryService.query;
                }) =>
                (
                    _params: Invoice_PaymentHistoryQueryVariables,
                    options?: UseQueryBaseOptions<Invoice_PaymentHistoryQuery["payment"] | []>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentHistoryMany") {
                            callbackRan = true;

                            options?.onError?.(Error("ERROR invoice - useGetPaymentHistory"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        renderHook(() => useInvoiceDetailQuery({ invoiceId: mockInvoiceId }));
        expect(std.error).toBeCalledWith(
            "usePaymentHistory",
            Error("ERROR invoice - useGetPaymentHistory")
        );
    });

    it("should return error when invoice query failed", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "invoice"; action: keyof typeof invoiceService.query }) =>
                (
                    _params: Invoice_InvoiceOneQueryVariables,
                    options?: UseQueryBaseOptions<Invoice_InvoiceOneQuery["invoice"] | []>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "invoiceGetOne") {
                            callbackRan = true;

                            options?.onError?.(Error("ERROR invoice - useInvoiceDetailInfo"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        renderHook(() => useInvoiceDetailQuery({ invoiceId: mockInvoiceId }));
        expect(std.error).toBeCalledWith(
            "useInvoiceDetailInfo",
            Error("ERROR invoice - useInvoiceDetailInfo")
        );
    });

    it("should return error when billItems query failed", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "invoiceBillItems";
                    action: keyof typeof invoiceBillItemsService.query;
                }) =>
                (
                    _params: Invoice_BillItemsListQueryVariables,
                    options?: UseQueryBaseOptions<
                        Invoice_BillItemsListQuery["invoice_bill_item"] | []
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "invoiceBillItemsGetMany") {
                            callbackRan = true;

                            options?.onError?.(Error("ERROR invoice - useInvoiceBillItems"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        renderHook(() => useInvoiceDetailQuery({ invoiceId: mockInvoiceId }));
        expect(std.error).toBeCalledWith(
            "useInvoiceBillItems",
            Error("ERROR invoice - useInvoiceBillItems")
        );
    });

    it("should return error when invoiceBillItems query failed", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "invoiceBillItems";
                    action: keyof typeof invoiceBillItemsService.query;
                }) =>
                (
                    _params: Invoice_BillItemManyQueryVariables,
                    options?: UseQueryBaseOptions<Invoice_BillItemManyQuery["bill_item"] | []>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "billItemGetMany") {
                            callbackRan = true;

                            options?.onError?.(Error("ERROR invoice - billItems"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        renderHook(() => useInvoiceDetailQuery({ invoiceId: mockInvoiceId }));
        expect(std.error).toBeCalledWith("billItems", Error("ERROR invoice - billItems"));
    });

    it("should return error when actionLogs query failed", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "invoiceActionLog";
                    action: keyof typeof invoiceActionLogService.query;
                }) =>
                (
                    _params: Invoice_ActionLogQueryVariables,
                    options?: UseQueryBaseOptions<Invoice_ActionLogQuery["invoice_action_log"] | []>
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "invoiceActionLogMany") {
                            callbackRan = true;

                            options?.onError?.(Error("ERROR invoice - useInvoiceActionLog"));

                            return {
                                data: undefined,
                                isFetching: false,
                            };
                        }
                    }

                    return { data: [], isFetching: false };
                }
        );

        renderHook(() => useInvoiceDetailQuery({ invoiceId: mockInvoiceId }));
        expect(std.error).toBeCalledWith(
            "useInvoiceActionLog",
            Error("ERROR invoice - useInvoiceActionLog")
        );
    });
});
