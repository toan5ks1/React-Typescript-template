import { Key, useCallback } from "react";

import { Table } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TableBaseFooter from "src/components/Table/TableBaseFooter";
import TableBaseHeader from "src/components/Table/TableBaseHeader";
import TableWrapper from "src/components/Table/TableWrapper";
import { TableBaseProps, TableColumn } from "src/components/Table/table-types";
import { getBorder } from "src/components/Table/utils";
import TableInvoiceInfoBody from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Tables/TableInvoiceInfo/TableInvoiceInfoBody";

export * from "src/components/Table/table-types";

// TODO: Create test file
interface TableInvoiceInfoProps<TData> extends Omit<TableBaseProps<TData>, "columns" | "data"> {
    columns: TableColumn[];
    data: TData[];
    tax?: string;
    subtotal?: string;
    total?: string;
}

const TableInvoiceInfo = <T extends object>(props: TableInvoiceInfoProps<T>) => {
    const theme = useTheme();

    const {
        showHeader,
        styles,
        border = "all",
        columns,
        footer,
        body,
        tableProps,
        isSelected,
        component,
        data = [],
        errorMessage,
        withIndex,
        styleIndexCol,
        total,
        subtotal,
        tax,
    } = props;

    const handleCheckIsSelected = useCallback((key: Key) => isSelected?.(key), [isSelected]);

    return (
        <TableWrapper component={component} errorMessage={errorMessage} styles={styles}>
            <Table style={styles?.table} {...tableProps}>
                <TableBaseHeader
                    columns={columns}
                    border={getBorder(theme, border)}
                    visible={showHeader}
                    style={styles?.header}
                    withIndex={withIndex}
                />

                <TableInvoiceInfoBody
                    data={data}
                    columns={columns}
                    border={getBorder(theme, border)}
                    isSelected={handleCheckIsSelected}
                    withIndex={withIndex}
                    styleIndexCol={styleIndexCol}
                    total={total}
                    subtotal={subtotal}
                    tax={tax}
                    {...body}
                />
            </Table>
            {footer?.pagination && <TableBaseFooter {...footer} style={styles?.footer} />}
        </TableWrapper>
    );
};

TableInvoiceInfo.defaultProps = {
    columns: [],
    showHeader: true,
    border: "all",
    component: "div",
};

export default TableInvoiceInfo;
