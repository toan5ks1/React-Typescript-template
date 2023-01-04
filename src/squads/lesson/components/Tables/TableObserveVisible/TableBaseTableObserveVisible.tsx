import { Key, useCallback } from "react";

import { Table } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TableBaseBody from "src/components/Table/TableBaseBody";
import TableBaseHeader from "src/components/Table/TableBaseHeader";
import { TableBaseProps } from "src/components/Table/table-types";
import { getBorder } from "src/components/Table/utils";
import TableWrapper from "src/squads/lesson/components/Tables/TableWrapper";

import TableBaseBodyObserveVisible from "./TableBaseBodyObserveVisible";

const TableBaseTableObserveVisible = <T extends object>(props: TableBaseProps<T>) => {
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

    const renderBodyTable = () => {
        const rowsPerPage = footer?.pagination?.rowsPerPage;

        if (rowsPerPage && rowsPerPage > 25) {
            return (
                <TableBaseBodyObserveVisible
                    data={data}
                    columns={columns}
                    border={getBorder(theme, border)}
                    isSelected={handleCheckIsSelected}
                    withIndex={withIndex}
                    styleIndexCol={styleIndexCol}
                    {...body}
                />
            );
        }
        return (
            <TableBaseBody
                data={data}
                columns={columns}
                border={getBorder(theme, border)}
                isSelected={handleCheckIsSelected}
                withIndex={withIndex}
                styleIndexCol={styleIndexCol}
                {...body}
            />
        );
    };

    return (
        <TableWrapper
            component={component}
            errorMessage={errorMessage}
            styles={styles}
            footer={footer}
        >
            <Table style={styles?.table} {...tableProps}>
                <TableBaseHeader
                    columns={columns}
                    border={getBorder(theme, border)}
                    visible={showHeader}
                    style={styles?.header}
                    withIndex={withIndex}
                />
                {renderBodyTable()}
            </Table>
        </TableWrapper>
    );
};

TableBaseTableObserveVisible.defaultProps = {
    columns: [],
    showHeader: true,
    border: "all",
    component: "div",
};

export default TableBaseTableObserveVisible;
