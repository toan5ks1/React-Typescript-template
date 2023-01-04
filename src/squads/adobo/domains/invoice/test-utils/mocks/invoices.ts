import { ArrayElement } from "src/common/constants/types";
import { PaymentMethods } from "src/squads/adobo/domains/invoice/common/constants/enum";
import {
    StudentBillingItem,
    FormIssueInvoiceValues,
} from "src/squads/adobo/domains/invoice/common/types/invoice";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import {
    Invoice_BillItemManyQuery,
    Invoice_BillItemsListQuery,
    Invoice_InvoiceOneQuery,
    Invoice_InvoicesQuery,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { PaginationWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";
import { getMockBillItemsData } from "src/squads/adobo/domains/invoice/test-utils/mocks/bill-items";

import { FormVoidInvoiceValues } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs/DialogVoidInvoice";

import { InvoiceType, PaymentMethod } from "manabuf/invoicemgmt/v1/enums_pb";

export function getMockInvoicePayload(studentId: string): NsInvoiceService.GenerateInvoiceDetail {
    const mockBillItems: StudentBillingItem[] = getMockBillItemsData();
    return {
        studentId: studentId,
        billItemIdsList: [
            mockBillItems[0].bill_item_sequence_number,
            mockBillItems[1].bill_item_sequence_number,
        ],
        subTotal: 4000,
        total: 4000,
        invoiceType: InvoiceType.MANUAL,
    };
}

export const getMockErrorsListInvoiceCreation =
    (): NsInvoiceService.GenerateInvoicesResponse["errorsList"] => {
        const mockInvoiceDetail = getMockInvoicePayload("id");
        return [
            {
                error: "invoice add fail 1",
                invoiceDetail: mockInvoiceDetail,
            },
            {
                error: "invoice add fail 2",
                invoiceDetail: mockInvoiceDetail,
            },
        ];
    };

export function getMockInvoicesData(): ArrayElement<Invoice_InvoicesQuery["invoice"]>[] {
    return [
        {
            invoice_id: "invoice_id_1",
            invoice_sequence_number: 1111,
            status: "DRAFT",
            student_id: "student_id_1",
            sub_total: 1000,
            total: 1000,
            type: "MANUAL",
        },
        {
            invoice_id: "invoice_id_2",
            invoice_sequence_number: 1112,
            status: "ISSUED",
            student_id: "student_id_2",
            sub_total: 2000,
            total: 2000,
            type: "SCHEDULED",
        },
        {
            invoice_id: "invoice_id_3",
            invoice_sequence_number: 1113,
            status: "FAILED",
            student_id: "student_id_3",
            sub_total: 3000,
            total: 3000,
            type: "MANUAL",
        },
        {
            invoice_id: "invoice_id_4",
            invoice_sequence_number: 1114,
            status: "REFUNDED",
            student_id: "student_id_4",
            sub_total: 4000,
            total: 4000,
            type: "MANUAL",
        },
        {
            invoice_id: "invoice_id_5",
            invoice_sequence_number: 1115,
            status: "PAID",
            student_id: "student_id_5",
            sub_total: 5000,
            total: 5000,
            type: "SCHEDULED",
        },
    ];
}

export function getMockInvoiceDetail(): ArrayElement<Invoice_InvoiceOneQuery["invoice"]> {
    return {
        created_at: "2022-07-08T03:11:09.562707+00:00",
        invoice_id: "01G7DWMBQTV5414QRMFWZ8BN54",
        invoice_sequence_number: 1,
        status: "DRAFT",
        student_id: "01G7DX2QMBT1C4HR3ZFPCJ484S",
        sub_total: 500,
        total: 500,
        type: "MANUAL",
    };
}

export function getMockIssuedInvoiceDetail(): ArrayElement<Invoice_InvoiceOneQuery["invoice"]> {
    return {
        created_at: "2022-07-08T03:11:09.562707+00:00",
        invoice_id: "01G8CG8N25KA5M2W3MF67774HM",
        invoice_sequence_number: 2,
        status: "ISSUED",
        student_id: "01G946XGET31JSYZTMXY6X2J9Y",
        sub_total: 1000,
        total: 1000,
        type: "MANUAL",
    };
}

export const createMockInvoiceDetail = (invoice_id: string): Invoice_InvoiceOneQuery["invoice"] => [
    {
        invoice_id: invoice_id,
        invoice_sequence_number: 1,
        status: "DRAFT",
        student_id: "01G7DX2QMBT1C4HR3ZFPCJ484S",
        sub_total: 500,
        total: 500,
        type: "MANUAL",
        created_at: "2022-07-08T03:11:09.562707+00:00",
    },
];

export function getMockInvoiceInfo(): Invoice_BillItemManyQuery["bill_item"] {
    return [
        {
            bill_item_sequence_number: 1,
            billing_item_description: {
                product_name: "product_1",
                course_items: [
                    {
                        slot: null,
                        weight: 1,
                        course_id: "01G1JRTFFJGT31CQX1MRJV0NT8",
                        course_name: "Individual 1:1 G10 English (3/wk)",
                    },
                ],
            },
            billing_date: "2022-06-29T10:52:13.107337+00:00",
            discount_amount: 0,
            discount_amount_type: "DISCOUNT-AMOUNT-01G7Y5CPZ5ZMSES6KY3WPFXYEM",
            discount_amount_value: 0,
            tax_amount: 0,
            tax_percentage: 0,
            tax_id: "4",
            tax_category: "TAX-CATEGORY-01G7Y5CPZ5ZMSES6KY3WPFXYEM",
            final_price: 0,
        },
        {
            bill_item_sequence_number: 4,
            billing_item_description: {
                product_name: "product_2",
                course_items: [
                    {
                        slot: null,
                        weight: 1,
                        course_id: "01G1JRTFFJGT31CQX1MRJV0NT8",
                        course_name: "Individual 1:1 G10 English (3/wk)",
                    },
                ],
            },
            billing_date: "2022-06-29T10:52:13.107337+00:00",
            discount_amount: 0,
            discount_amount_type: "DISCOUNT-AMOUNT-01G7Y5CPZ5ZMSES6KY3WPFXYEM",
            discount_amount_value: 0,
            tax_amount: 0,
            tax_percentage: 0,
            tax_id: "4",
            tax_category: "TAX-CATEGORY-01G7Y5CPZ5ZMSES6KY3WPFXYEM",
            final_price: 0,
        },
    ];
}

export function getMockInvoicePagination(length: number): PaginationWithTotal {
    return {
        offset: 0,
        page: 0,
        limit: 10,
        rowsPerPage: 10,
        count: length,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
    };
}

export const invoiceId = "01G87VD52HBT2EH7M73630WNCN";

export function getMockInvoiceBillItems(
    invoice_id: string = invoiceId
): Invoice_BillItemsListQuery["invoice_bill_item"] {
    return [
        {
            invoice_bill_item_id: "1",
            invoice_id: invoice_id,
            bill_item_sequence_number: 1,
        },
        {
            invoice_bill_item_id: "2",
            invoice_id: invoice_id,
            bill_item_sequence_number: 4,
        },
    ];
}

const date = "2022/07/28";

export function getMockIssueInvoicePayload(): NsInvoiceService.IssueInvoiceRequest {
    return {
        invoiceId: 0,
        invoiceIdString: "id",
        paymentMethod: PaymentMethod.CONVENIENCE_STORE,
        remarks: "remarks",
        dueDate: date,
        expiryDate: date,
    };
}

export function getMockIssueInvoiceFormValues(): FormIssueInvoiceValues {
    return {
        paymentMethod: PaymentMethods.PAYMENT_METHOD_CONVENIENCE_STORE,
        dueDate: new Date(date),
        expiryDate: new Date(date),
        remarks: "remarks",
    };
}

export function getMockNewIssueInvoiceRequest(): NsInvoiceService.IssueInvoiceRequest {
    return {
        dueDate: { nanos: 0, seconds: 1658966400 },
        expiryDate: { nanos: 0, seconds: 1658966400 },
        invoiceId: 0,
        invoiceIdString: "id",
        paymentMethod: 0,
        remarks: "remarks",
    };
}

export function getMockVoidInvoicePayload(): NsInvoiceService.VoidInvoiceRequest {
    return {
        invoiceId: "01G7DWMBQTV5414QRMFWZ8BN57",
        remarks: "remarks",
    };
}

export function getMockVoidInvoiceFormValues(): FormVoidInvoiceValues {
    return {
        remarks: "remarks",
    };
}

export function getMockNewVoidInvoiceRequest(): NsInvoiceService.VoidInvoiceRequest {
    return {
        invoiceId: "01G7DWMBQTV5414QRMFWZ8BN57",
        remarks: "remarks",
    };
}
