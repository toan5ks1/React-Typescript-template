import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { formatDate } from "src/common/utils/time";
import {
    PaymentMethod,
    PaymentStatus,
} from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getPaymentHistoryItemPrefix } from "src/squads/adobo/domains/invoice/common/utils/invoice-details";
import { Invoice_PaymentHistoryQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { PaymentStatusKeys } from "src/squads/adobo/domains/invoice/typings/remote";

import { Box } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import { TableColumn } from "src/components/Table";
import TableBase from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import ChipInvoiceStatus from "src/squads/adobo/domains/invoice/pages/invoice-list/components/ChipInvoiceStatus";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface TablePaymentHistoryProps {
    paymentHistory?: Invoice_PaymentHistoryQuery["payment"];
    isFetchingPaymentHistory?: boolean;
}

type TPaymentHistoryRecord = ArrayElement<Invoice_PaymentHistoryQuery["payment"]>;

const TablePaymentHistory = ({
    paymentHistory = [],
    isFetchingPaymentHistory,
}: TablePaymentHistoryProps) => {
    const tPayments = useResourceTranslate(Entities.INVOICE);

    const columns: TableColumn<ArrayElement<Invoice_PaymentHistoryQuery["payment"]>>[] = useMemo(
        () => [
            {
                key: "paymentNo",
                title: tPayments("paymentHistory.columns.paymentNo"),
                cellProps: {
                    "data-testid": "PaymentTableCell__columnPaymentNo",
                },
                render: (record: TPaymentHistoryRecord) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Payment__paymentNo">
                            {getPaymentHistoryItemPrefix(record.payment_sequence_number)}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "paymentStatus",
                title: tPayments("paymentHistory.columns.status"),
                cellProps: {
                    "data-testid": "PaymentTableCell__columnPaymentStatus",
                },
                render: (record: TPaymentHistoryRecord) => {
                    return (
                        <ChipInvoiceStatus
                            data-testid="Payment__paymentNo"
                            status={record.payment_status as PaymentStatusKeys}
                            label={PaymentStatus[record.payment_status]}
                        />
                    );
                },
            },
            {
                key: "paymentMethod",
                title: tPayments("paymentHistory.columns.paymentMethod"),
                cellProps: {
                    "data-testid": "PaymentTableCell__columnPaymentMethod",
                },
                render: (record: TPaymentHistoryRecord) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Payment__paymentMethod">
                            {PaymentMethod[record.payment_method]}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "createdDate",
                title: tPayments("paymentHistory.columns.createdDate"),
                cellProps: {
                    "data-testid": "PaymentTableCell__columnCreatedDate",
                },
                render: (record: TPaymentHistoryRecord) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Payment__createdDate">
                            {formatDate(record.created_at, "yyyy/LL/dd")}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "dueDate",
                title: tPayments("paymentHistory.columns.dueDate"),
                cellProps: {
                    "data-testid": "PaymentTableCell__columnDueDate",
                },
                render: (record: TPaymentHistoryRecord) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Payment__dueDate">
                            {formatDate(record.payment_due_date, "yyyy/LL/dd")}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "expiryDate",
                title: tPayments("paymentHistory.columns.paymentDate"),
                cellProps: {
                    "data-testid": "PaymentTableCell__columnExpiryDate",
                },
                render: (record: TPaymentHistoryRecord) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Payment__expiryDate">
                            {formatDate(record.payment_expiry_date, "yyyy/LL/dd")}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "paymentResult",
                title: tPayments("paymentHistory.columns.result"),
                cellProps: {
                    "data-testid": "PaymentsTableCell__columnResult",
                },
                render: (record: TPaymentHistoryRecord) => {
                    return (
                        <TypographyBase variant="body2" data-testid="Payments__columnResult">
                            {record.result}
                        </TypographyBase>
                    );
                },
            },
        ],
        [tPayments]
    );

    return (
        <Box data-testid="TablePaymentHistory">
            <Box my={3}>
                <TypographyPrimary data-testid="InvoiceDetail__genInfoTitle">
                    {tPayments("paymentHistory.title")}
                </TypographyPrimary>
            </Box>
            <TableBase
                data={paymentHistory}
                body={{
                    rowKey: "Payment_number",
                    loading: !!isFetchingPaymentHistory,
                }}
                withIndex
                columns={columns}
                tableProps={{
                    "data-testid": "TablePayment__table",
                }}
            />
            <Box mt={3} mb={4}>
                <DividerDashed />
            </Box>
        </Box>
    );
};

export default TablePaymentHistory;
