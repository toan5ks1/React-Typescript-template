import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";
import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { StudentBillingItem } from "src/squads/adobo/domains/invoice/common/types/invoice";
import { getFormattedItemPrice } from "src/squads/adobo/domains/invoice/common/utils/currency";
import { PaginationWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";

import { TableColumn } from "src/components/Table";
import TableWithCheckbox from "src/components/Table/TableWithCheckbox";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ChipBillingStatus from "src/squads/adobo/domains/invoice/pages/student-invoice/components/ChipBillingStatus";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface TableWithCheckboxBillingItemsProps {
    billingItems?: StudentBillingItem[];
    onSelect: (value: StudentBillingItem[]) => void;
    selectedBillItems: StudentBillingItem[];
    currency: InvoiceCurrency;
    isLoading: boolean;
    pagination: PaginationWithTotal;
}

const TableWithCheckboxBillingItems = (props: TableWithCheckboxBillingItemsProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const {
        billingItems = [],
        currency,
        isLoading,
        pagination,
        onSelect,
        selectedBillItems,
    } = props;

    const columns: TableColumn<StudentBillingItem>[] = useMemo(
        () => [
            // TODO: Add location column
            {
                key: "billingNo",
                title: tInvoice("createInvoice.columns.billingNo"),
                cellProps: {
                    "data-testid": "StudentBillingItemsTableCell__columnBillingNo",
                },
                render: (record: StudentBillingItem) => {
                    return (
                        <TypographyBase variant="body2" data-testid="StudentBillingItem__billingNo">
                            BI-{record.bill_item_sequence_number}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "billingItem",
                title: tInvoice("createInvoice.columns.billingItem"),
                cellProps: {
                    "data-testid": "StudentBillingItemsTableCell__columnBillingItem",
                },
                render: (record: StudentBillingItem) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingItem__billingItem"
                        >
                            {record.billing_item_description?.product_name}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "status",
                title: tInvoice("createInvoice.columns.status"),
                cellProps: {
                    "data-testid": "StudentBillingItemsTableCell__columnStatus",
                },
                render: (record: StudentBillingItem) => {
                    return <ChipBillingStatus status={record.billing_status} />;
                },
            },
            {
                key: "billingDate",
                title: tInvoice("createInvoice.columns.billingDate"),
                cellProps: {
                    "data-testid": "StudentBillingItemsTableCell__columnBillingDate",
                },
                render: (record: StudentBillingItem) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingItem__billingDate"
                        >
                            {formatDate(record.billing_date, "yyyy/LL/dd")}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "amount",
                title: tInvoice("createInvoice.columns.amount"),
                cellProps: {
                    "data-testid": "StudentBillingItemsTableCell__columnAmount",
                },
                render: (record: StudentBillingItem) => {
                    return (
                        <TypographyBase variant="body2" data-testid="StudentBillingItem__amount">
                            {getFormattedItemPrice(currency, false, record.final_price)}
                        </TypographyBase>
                    );
                },
            },
        ],
        [tInvoice, currency]
    );

    return (
        <TableWithCheckbox<StudentBillingItem>
            data={billingItems}
            body={{
                rowKey: "bill_item_sequence_number",
                loading: isLoading,
                pagination,
            }}
            withIndex
            columns={columns}
            tableProps={{
                "data-testid": "TableWithCheckboxBillingItems__table",
            }}
            footer={{
                pagination,
            }}
            onSelect={onSelect}
            listSelectedItems={selectedBillItems}
        />
    );
};

export default TableWithCheckboxBillingItems;
