import {
    PaymentMethod,
    PaymentStatus,
} from "src/squads/adobo/domains/invoice/common/constants/enum";
import { Invoice_PaymentHistoryQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

export function getMockPaymentHistoryList(): Invoice_PaymentHistoryQuery["payment"] {
    return [
        {
            created_at: "2022/06/11",
            invoice_id: "1",
            payment_due_date: "2022/06/20",
            payment_expiry_date: "2022/06/21",
            payment_id: "1",
            payment_method: "DIRECT_DEBIT",
            payment_status: "PAYMENT_PENDING",
            updated_at: "2022/06/20",
            payment_date: "2022/06/20",
            result: "SUCCESS",
            payment_sequence_number: 1,
        },
        {
            created_at: "2022/06/11",
            invoice_id: "1",
            payment_due_date: "2022/06/20",
            payment_expiry_date: "2022/06/21",
            payment_id: "2",
            payment_method: "DIRECT_DEBIT",
            payment_status: "PAYMENT_SUCCESSFUL",
            updated_at: "2022/06/20",
            payment_date: "2022/06/20",
            result: "SUCCESS",
            payment_sequence_number: 2,
        },
        {
            created_at: "2022/06/11",
            invoice_id: "1",
            payment_due_date: "2022/06/20",
            payment_expiry_date: "2022/06/21",
            payment_id: "3",
            payment_method: "CONVENIENCE_STORE",
            payment_status: "PAYMENT_FAILED",
            updated_at: "2022/06/20",
            payment_date: "2022/06/20",
            result: "SUCCESS",
            payment_sequence_number: 3,
        },
    ];
}

export function getMockPaymentHistoryTableList(): Invoice_PaymentHistoryQuery["payment"] {
    const mockPaymentHistoryList = getMockPaymentHistoryList();
    return [
        {
            ...mockPaymentHistoryList[0],
            payment_status: PaymentStatus[mockPaymentHistoryList[0].payment_status],
            payment_method: PaymentMethod[mockPaymentHistoryList[0].payment_method],
        },
        {
            ...mockPaymentHistoryList[1],
            payment_status: PaymentStatus[mockPaymentHistoryList[1].payment_status],
            payment_method: PaymentMethod[mockPaymentHistoryList[1].payment_method],
        },
        {
            ...mockPaymentHistoryList[2],
            payment_status: PaymentStatus[mockPaymentHistoryList[2].payment_status],
            payment_method: PaymentMethod[mockPaymentHistoryList[2].payment_method],
        },
    ];
}
