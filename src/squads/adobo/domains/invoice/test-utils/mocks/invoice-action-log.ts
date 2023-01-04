import { Invoice_ActionLogQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

export const getMockInvoiceActionLogData = (): Invoice_ActionLogQuery["invoice_action_log"] => {
    return [
        {
            user_id: "user_id_1",
            created_at: "2022/04/29",
            updated_at: "2022/04/29",
            action: "Invoice Failed",
            action_detail: "PV-1123: Failed",
            action_comment: "Invoice Failed PV-1123: Failed",
            invoice_action_id: "1",
        },
        {
            user_id: "01G8TCV3Y8A6D7SPE7JZFKT8CH",
            created_at: "2022/04/20",
            updated_at: "2022/04/20",
            action: "Invoice Issued",
            action_detail: "PV-1123: Direct Debit",
            action_comment: "Invoice Issued PV-1123: Direct Debit",
            invoice_action_id: "2",
        },
    ];
};
