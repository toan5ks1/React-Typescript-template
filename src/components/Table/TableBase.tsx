import { Key, useCallback } from "react";

import { Table } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TableBaseBody from "./TableBaseBody";
import TableBaseFooter from "./TableBaseFooter";
import TableBaseHeader from "./TableBaseHeader";
import TableWrapper from "./TableWrapper";
import { TableBaseProps } from "./table-types";
import { getBorder } from "./utils";

export * from "./table-types";

const TableBase = <T extends object>(props: TableBaseProps<T>) => {
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

                <TableBaseBody
                    data={data}
                    columns={columns}
                    border={getBorder(theme, border)}
                    isSelected={handleCheckIsSelected}
                    withIndex={withIndex}
                    styleIndexCol={styleIndexCol}
                    {...body}
                />
            </Table>
            {footer?.pagination && <TableBaseFooter {...footer} style={styles?.footer} />}
        </TableWrapper>
    );
};

TableBase.defaultProps = {
    columns: [],
    showHeader: true,
    border: "all",
    component: "div",
};

export default TableBase;
