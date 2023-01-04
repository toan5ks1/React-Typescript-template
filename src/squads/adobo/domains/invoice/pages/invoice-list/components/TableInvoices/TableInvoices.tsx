import { useMemo } from "react";

//TODO: Uncomment to able redirecting to one invoice page
//import { useLocation } from "react-router";
import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getFormattedItemPrice } from "src/squads/adobo/domains/invoice/common/utils/currency";
import {
    getInvoicePrefix,
    getUserByUserId,
} from "src/squads/adobo/domains/invoice/common/utils/invoice-details";
import {
    pathInvoiceDetailPage,
    pathStudentDetailPage,
} from "src/squads/adobo/domains/invoice/common/utils/paths";
import { Invoice_InvoicesQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { PaginationWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";
import { InvoiceStatusKeys } from "src/squads/adobo/domains/invoice/typings/remote";

import StyledLink from "src/components/StyledLink";
import { TableColumn } from "src/components/Table";
import TableBase from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ChipInvoiceStatus from "src/squads/adobo/domains/invoice/pages/invoice-list/components/ChipInvoiceStatus/ChipInvoiceStatus";

import useGetUserName from "src/squads/adobo/domains/invoice/hooks/useGetUserName";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

// TODO: Remove when integrated with Invoice Detail
export interface Invoice {
    invoice_number: string;
    invoice_status: string;
    student_name: string;
    amount: number;
    payment_method: string;
    created_date: any;
    due_date: any;
    expiry_date: any;
    invoice_type: string;
}

export interface TableInvoiceProps {
    currency: InvoiceCurrency;
    invoices?: Invoice_InvoicesQuery["invoice"];
    isLoading: boolean;
    pagination: PaginationWithTotal;
    studentId?: string;
}

const TableInvoices = (props: TableInvoiceProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    //TODO: Uncomment to able redirecting to one invoice page
    // const location = useLocation();

    const { currency, invoices = [], isLoading, pagination, studentId } = props;

    const shouldHideStudentNameColumn: boolean = !!studentId;

    const convertToUserIdsList = useMemo(() => {
        if (studentId) return [];
        const idsList = invoices.reduce((userIds: string[], invoice) => {
            userIds.push(invoice.student_id);
            return userIds;
        }, []);
        return idsList;
    }, [invoices, studentId]);

    const { data: users = [], isLoading: isLoadingUserNames } = useGetUserName({
        userIds: convertToUserIdsList,
    });

    const columns: TableColumn<ArrayElement<Invoice_InvoicesQuery["invoice"]>>[] = useMemo(
        () => [
            {
                key: "invoiceNo",
                title: tInvoice("invoiceManagement.columns.invoiceNo"),
                cellProps: {
                    "data-testid": "InvoicesTableCell__columnInvoiceNo",
                },
                render: (record: ArrayElement<Invoice_InvoicesQuery["invoice"]>) => {
                    return (
                        <StyledLink to={pathInvoiceDetailPage(record.invoice_id)}>
                            <TypographyBase variant="body2" data-testid="Invoice__invoiceNo">
                                {getInvoicePrefix(record.invoice_sequence_number!)}
                            </TypographyBase>
                        </StyledLink>
                    );
                },
            },
            {
                key: "invoiceStatus",
                title: tInvoice("invoiceManagement.columns.invoiceStatus"),
                cellProps: {
                    "data-testid": "InvoicesTableCell__columnInvoiceStatus",
                },
                render: (record: ArrayElement<Invoice_InvoicesQuery["invoice"]>) => {
                    return (
                        <ChipInvoiceStatus
                            status={record.status as InvoiceStatusKeys}
                            label={tInvoice(`invoiceManagement.invoiceStatuses.${record.status}`)}
                        />
                    );
                },
            },
            ...(!shouldHideStudentNameColumn
                ? [
                      {
                          key: "studentName",
                          title: tInvoice("invoiceManagement.columns.studentName"),
                          cellProps: {
                              "data-testid": "InvoicesTableCell__columnStudentName",
                          },
                          render: (record: ArrayElement<Invoice_InvoicesQuery["invoice"]>) => {
                              return (
                                  <StyledLink to={pathStudentDetailPage(record.student_id)}>
                                      <TypographyBase
                                          variant="body2"
                                          data-testid="Invoice__studentName"
                                      >
                                          {getUserByUserId(record.student_id, users)}
                                      </TypographyBase>
                                  </StyledLink>
                              );
                          },
                      },
                  ]
                : []),
            {
                key: "amount",
                title: tInvoice("invoiceManagement.columns.amount"),
                cellProps: {
                    "data-testid": "InvoicesTableCell__columnAmount",
                },
                render: (record: ArrayElement<Invoice_InvoicesQuery["invoice"]>) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Invoice__amount">
                            {getFormattedItemPrice(currency, false, record.total)}
                        </TypographyBase>
                    );
                },
            },
            // TODO: Add columns related to Payment Method
            {
                key: "invoiceType",
                title: tInvoice("invoiceManagement.columns.invoiceType"),
                cellProps: {
                    "data-testid": "InvoicesTableCell__columnInvoiceType",
                },
                render: (record: ArrayElement<Invoice_InvoicesQuery["invoice"]>) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Invoice__invoiceType">
                            {tInvoice(`invoiceManagement.invoiceTypes.${record.type}`)}
                        </TypographyBase>
                    );
                },
            },
        ],
        [tInvoice, currency, shouldHideStudentNameColumn, users]
    );

    return (
        <TableBase
            data={invoices}
            body={{
                rowKey: "invoice_number",
                loading: isLoading && isLoadingUserNames,
                pagination,
            }}
            withIndex
            columns={columns}
            tableProps={{
                "data-testid": "TableInvoices__table",
            }}
            footer={{
                pagination,
            }}
        />
    );
};

export default TableInvoices;
