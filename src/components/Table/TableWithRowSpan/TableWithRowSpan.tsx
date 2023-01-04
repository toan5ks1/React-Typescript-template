import { Key, useCallback } from "react";

import { Table } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TableBaseFooter from "../TableBaseFooter";
import TableBaseHeader from "../TableBaseHeader";
import TableWrapper from "../TableWrapper";
import { TableWithRowSpanProps } from "../table-types";
import { getBorder } from "../utils";
import TableBodyWithRowSpan from "./TableBodyWithRowSpan";

const TableWithRowSpan = <T extends object>(props: TableWithRowSpanProps<T>) => {
    const theme = useTheme();

    const {
        showHeader,
        styles,
        border = "all",
        headerColumns,
        dataColumns,
        footer,
        body,
        tableProps,
        isSelected,
        component,
        data = {},
        errorMessage,
        withIndex,
    } = props;

    const handleCheckIsSelected = useCallback((key: Key) => isSelected?.(key), [isSelected]);

    return (
        <TableWrapper component={component} errorMessage={errorMessage} styles={styles}>
            <Table style={styles?.table} {...tableProps}>
                <TableBaseHeader
                    columns={headerColumns}
                    border={getBorder(theme, border)}
                    visible={showHeader}
                    style={styles?.header}
                    withIndex={withIndex}
                />

                <TableBodyWithRowSpan
                    data={data}
                    columns={dataColumns}
                    border={getBorder(theme, border)}
                    isSelected={handleCheckIsSelected}
                    withIndex={withIndex}
                    {...body}
                />
            </Table>
            {footer?.pagination && <TableBaseFooter {...footer} />}
        </TableWrapper>
    );
};

TableWithRowSpan.defaultProps = {
    headerColumns: [],
    dataColumns: [],
    showHeader: true,
    border: "all",
    component: "div",
};

export default TableWithRowSpan;
