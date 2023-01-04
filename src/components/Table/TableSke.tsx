import { useMemo, CSSProperties } from "react";

import { TableRow, Skeleton } from "@mui/material";

import TableBaseCell from "./TableBaseCell";
import { TableIndex, TableColumn } from "./table-types";

const defaultMapper = [1];

export interface TableSkeProps {
    columns: TableColumn[];
    height?: number | string;
    count?: number;
    withIndex?: TableIndex;
    border?: CSSProperties;
}

const TableSke = (props: TableSkeProps) => {
    const { count = 1, height, columns, withIndex, border } = props;

    const mapper = useMemo(() => (count > 1 ? new Array(count).fill(1) : defaultMapper), [count]);

    const renderSke = (key: string, columnIndex: number) => {
        return (
            <TableBaseCell
                key={key}
                border={border}
                maxColumnIndex={columns.length - 1}
                columnIndex={columnIndex}
            >
                <Skeleton height={height || 20} width="100%" />
            </TableBaseCell>
        );
    };

    return (
        <>
            {mapper.map((_, index) => {
                return (
                    <TableRow key={index} data-testid="TableSke__item">
                        {withIndex && renderSke("index", -1)}
                        {columns.map(({ key }, columnIndex) => renderSke(key, columnIndex))}
                    </TableRow>
                );
            })}
        </>
    );
};

export default TableSke;
