import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { formatDate } from "src/common/utils/time";
import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getFormattedItemPrice } from "src/squads/adobo/domains/invoice/common/utils/currency";
import {
    getBillItemPrefix,
    formatDiscountText,
    getTaxPrefix,
    checkUndefined,
} from "src/squads/adobo/domains/invoice/common/utils/invoice-details";
import { Invoice_BillItemManyQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";

import { Box, List, ListItemText } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import { TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TableInvoiceInfo from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Tables/TableInvoiceInfo";

import { InvoiceDetailReturn } from "src/squads/adobo/domains/invoice/hooks/useInvoiceDetailQuery";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

interface InvoiceInfoProps {
    billItems?: InvoiceDetailReturn["billItems"];
}

type InvoiceInfoColumn = TableColumn<ArrayElement<Invoice_BillItemManyQuery["bill_item"]>>;

type CourseList = {
    slot: string;
    weight: number;
    course_id: string;
    course_name: string;
};

const InvoiceInfo = (props: InvoiceInfoProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);

    const { billItems = [] } = props;

    const columns: InvoiceInfoColumn[] = useMemo(
        () => [
            {
                key: "invoiceInfoId",
                title: "ID",
                cellProps: {
                    "data-testid": "InvoiceInfoTableCell__columnId",
                },
                render: (record) => {
                    return (
                        <TypographyBase variant="body2" data-testid="TableInvoiceInfo__id">
                            {getBillItemPrefix(record?.bill_item_sequence_number)}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "invoiceInfoDescription",
                title: "Description",
                cellProps: {
                    "data-testid": "InvoiceInfoTableCell__columnDescription",
                },
                render: (record) => {
                    const courseItems = record?.billing_item_description?.course_items || [];
                    return (
                        <>
                            <TypographyBase
                                variant="body2"
                                data-testid="TableInvoiceInfo__description"
                            >
                                {checkUndefined(record?.billing_item_description?.product_name)}
                            </TypographyBase>
                            <List
                                disablePadding
                                sx={{ listStyleType: "disc", paddingLeft: "20px" }}
                            >
                                {courseItems.map((courseItem: CourseList, index: number) => (
                                    <ListItemText
                                        sx={{ display: "list-item", padding: "0" }}
                                        key={index}
                                    >
                                        <TypographyBase
                                            variant="body2"
                                            data-testid={`TableInvoiceInfo__course${index}`}
                                        >
                                            {courseItem.course_name}
                                        </TypographyBase>
                                    </ListItemText>
                                ))}
                            </List>
                        </>
                    );
                },
            },
            {
                key: "billedDate",
                title: "Billed Date",
                cellProps: {
                    "data-testid": "InvoiceInfoTableCell__columnBilledDate",
                },
                render: (record) => {
                    return (
                        <TypographyBase variant="body2" data-testid="TableInvoiceInfo__billedData">
                            {record.billing_date
                                ? formatDate(record.billing_date, "yyyy/LL/dd")
                                : "--"}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "discount",
                title: "Discount",
                cellProps: {
                    "data-testid": "InvoiceInfoTableCell__columnDiscount",
                },
                render: (record) => {
                    return (
                        <TypographyBase variant="body2" data-testid="TableInvoiceInfo__discount">
                            {record.discount_amount_type
                                ? formatDiscountText(
                                      record.discount_amount_type,
                                      record.discount_amount_value ?? 0
                                  )
                                : "--"}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "tax",
                title: "Tax",
                cellProps: {
                    "data-testid": "InvoiceInfoTableCell__columnTax",
                    style: {
                        textAlign: "right",
                    },
                },
                render: (record) => {
                    return (
                        <TypographyBase variant="body2" data-testid="TableInvoiceInfo__tax">
                            {record.tax_percentage ? getTaxPrefix(record.tax_percentage) : "--"}
                        </TypographyBase>
                    );
                },
            },
            {
                key: "amount",
                title: tInvoice("invoiceManagement.columns.amount"),
                cellProps: {
                    "data-testid": "InvoiceInfoTableCell__columnAmount",
                    style: {
                        textAlign: "right",
                    },
                },
                render: (record) => {
                    return (
                        <TypographyBase variant="body2" data-testid="TableInvoiceInfo__amount">
                            {getFormattedItemPrice(
                                InvoiceCurrency.JAPANESE_YEN,
                                false,
                                record.final_price ?? 0
                            )}
                        </TypographyBase>
                    );
                },
            },
        ],
        [tInvoice]
    );

    const totalAmount = useMemo(() => {
        const sum = billItems?.reduce((acc, billItem) => acc + billItem.final_price, 0);
        return sum;
    }, [billItems]);

    const totalTax = useMemo(() => {
        const sum = billItems?.reduce((acc, billItem) => {
            return billItem.tax_amount ? acc + billItem.tax_amount : 0;
        }, 0);
        return sum;
    }, [billItems]);

    return (
        <Box data-testid="InvoiceInfo">
            <Box my={3}>
                <TypographyPrimary data-testid="TableInvoice__title">
                    {tInvoice("invoiceDetails.invoiceInfo")}
                </TypographyPrimary>
            </Box>
            <TableInvoiceInfo
                data={billItems}
                columns={columns}
                body={{
                    rowKey: "actionLog_number",
                    loading: false,
                }}
                tableProps={{
                    "data-testid": "TablInvoiceInfo__table",
                }}
                total={getFormattedItemPrice(InvoiceCurrency.JAPANESE_YEN, false, totalAmount ?? 0)}
                subtotal={getFormattedItemPrice(
                    InvoiceCurrency.JAPANESE_YEN,
                    false,
                    totalAmount ?? 0
                )}
                tax={getFormattedItemPrice(InvoiceCurrency.JAPANESE_YEN, false, totalTax ?? 0)}
            />
            <Box mt={3} mb={4}>
                <DividerDashed />
            </Box>
        </Box>
    );
};

export default InvoiceInfo;
