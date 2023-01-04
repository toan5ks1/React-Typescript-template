// TODO: Update interface with location and create fragment for bill_items
export interface StudentBillingItem {
    billing_item_description?: any;
    final_price: number;
    student_id: string;
    billing_date?: any;
    billing_status: string;
    bill_item_sequence_number: number;
}
export interface TableColumnInvoiceInfoProps {
    bill_sequence_num: number;
}

export type FormIssueInvoiceValues = {
    paymentMethod: string;
    dueDate?: Date | string;
    expiryDate?: Date | string;
    remarks?: string;
};
