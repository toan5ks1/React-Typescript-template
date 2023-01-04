import { CreateInvoiceBillingItemsStatus } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { StudentBillingItem } from "src/squads/adobo/domains/invoice/common/types/invoice";
import { PaginationWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";

export function getMockBillItemsData(): StudentBillingItem[] {
    return [
        {
            bill_item_sequence_number: 1,
            billing_item_description: {
                product_name: "Textbook",
            },
            billing_status: CreateInvoiceBillingItemsStatus.BILLING_STATUS_BILLED,
            billing_date: "2022/02/01",
            final_price: 1000,
            student_id: "student_id_1",
        },
        {
            bill_item_sequence_number: 2,
            billing_item_description: {
                product_name: "School Supplies",
            },
            billing_status: CreateInvoiceBillingItemsStatus.BILLING_STATUS_PENDING,
            billing_date: "2022/02/15",
            final_price: 3000,
            student_id: "student_id_1",
        },
    ];
}

export const getMockBillItemsPagination = (count?: number | null): PaginationWithTotal => {
    return {
        offset: 0,
        page: 0,
        limit: 10,
        rowsPerPage: 10,
        count: count || 0,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
    };
};
