import { Fragment } from "react";

import get from "lodash/get";

import TypographyBase from "../../Typographys/TypographyBase";
import TableBaseBody from "../TableBaseBody";
import TableBaseCell from "../TableBaseCell";
import TableBaseRow from "../TableBaseRow";
import TableIndexCell from "../TableIndexCell";
import { TableBodyWithRowSpanProps, TableColumn } from "../table-types";
import { calcBorderRightBottomTable, calculateDataIndex, getRowKey } from "../utils";

const renderCells = <T extends object>({
    record,
    columns,
    border,
    dataIndex,
}: {
    record: T;
    columns: TableColumn[];
    border: Parameters<typeof calcBorderRightBottomTable>[0];
    dataIndex: number;
}) => {
    return columns.map((column, columnIndex) => (
        <TableBaseCell
            key={column.key}
            {...column.cellProps}
            style={column.cellProps?.style}
            border={border}
            maxColumnIndex={columns.length - 1}
            columnIndex={columnIndex}
        >
            {!column.render && (
                <TypographyBase variant="body2" data-testid={column.testId}>
                    {column.dataIndex ? get(record, column.dataIndex) : column.emptyValue}
                </TypographyBase>
            )}

            {column.render?.(record, dataIndex)}
        </TableBaseCell>
    ));
};

const TableBodyWithRowSpan = <T extends object>(props: TableBodyWithRowSpanProps<T>) => {
    const { columns, rowKey, border, data, pagination, withIndex, ...tableBaseBodyProps } = props;
    const tableBaseRowProps = { columns, rowKey, border };
    const skeletonData = Object.keys(data).map(() => ({}));
    const skeletonColumns = [{ key: "group" }, ...columns];

    return (
        <TableBaseBody
            data={skeletonData}
            columns={skeletonColumns}
            border={border}
            rowKey={rowKey}
            withIndex={withIndex}
            customBody={
                <>
                    {Object.entries(data).map(([group, records], rowIndex) => (
                        <Fragment key={group}>
                            <TableBaseRow
                                dataIndex={0}
                                record={records[0]}
                                render={(columns) => (
                                    <>
                                        {withIndex && (
                                            <TableIndexCell
                                                border={border}
                                                withIndex={withIndex}
                                                rowSpan={records.length}
                                            >
                                                {calculateDataIndex(rowIndex, pagination)}
                                            </TableIndexCell>
                                        )}

                                        <TableBaseCell
                                            border={border}
                                            rowSpan={records.length}
                                            style={{ verticalAlign: "top" }}
                                        >
                                            {group}
                                        </TableBaseCell>

                                        {renderCells({
                                            record: records[0],
                                            columns,
                                            border,
                                            dataIndex: 0,
                                        })}
                                    </>
                                )}
                                {...tableBaseRowProps}
                            />
                            {records.length - 1 > 0 &&
                                records
                                    .slice(1)
                                    .map((record, dataIndex) => (
                                        <TableBaseRow
                                            key={getRowKey(record, rowKey)}
                                            dataIndex={dataIndex}
                                            record={record}
                                            render={(columns) =>
                                                renderCells({ record, columns, border, dataIndex })
                                            }
                                            {...tableBaseRowProps}
                                        />
                                    ))}
                        </Fragment>
                    ))}
                </>
            }
            {...tableBaseBodyProps}
        />
    );
};

export default TableBodyWithRowSpan;
