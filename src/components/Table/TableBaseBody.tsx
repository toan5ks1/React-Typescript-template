import { cloneElement, isValidElement } from "react";

import { TableBody, TableCell, TableRow } from "@mui/material";
import TableSke from "src/components/Table/TableSke";

import WrapperNoData from "../Wrappers/WrapperNoData";
import TableBaseRow from "./TableBaseRow";
import { TableBaseBodyProps } from "./table-types";
import { getRowKey } from "./utils";

import useTranslate from "src/hooks/useTranslate";

const DEFAULT_COUNT_PER_PAGE = 10;

const TableBaseBody = <T extends object>(props: TableBaseBodyProps<T>) => {
    const {
        columns,
        data = [],
        loading,
        rowKey,
        noDataMessage,
        isSelected,
        customBody,
        skeCount,
        skeHeight,
        border,
        hover,
        withIndex,
        pagination,
        styleIndexCol,
    } = props;

    const t = useTranslate();
    if (loading) {
        const count = skeCount || data.length || DEFAULT_COUNT_PER_PAGE;
        return (
            <TableBody>
                <TableSke
                    height={skeHeight}
                    count={count}
                    columns={columns}
                    withIndex={withIndex}
                    border={border}
                />
            </TableBody>
        );
    }

    if (!data || !data.length) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell
                        data-testid={"TableBase__noDataMessage"}
                        align="center"
                        colSpan={12}
                        padding="none"
                    >
                        {noDataMessage || (
                            <WrapperNoData
                                noDataMessage={t("ra.message.noDataInformation")}
                                isOnTable
                            />
                        )}
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    if (isValidElement(customBody)) {
        return <TableBody data-testid="TableBaseBody__root">{cloneElement(customBody)}</TableBody>;
    }

    return (
        <TableBody data-testid="TableBaseBody__root">
            {data.map((record, dataIndex) => {
                const key = getRowKey(record, rowKey) || dataIndex;

                return (
                    <TableBaseRow
                        key={key}
                        columns={columns}
                        selected={isSelected?.(key)}
                        dataIndex={dataIndex}
                        record={record}
                        rowKey={rowKey}
                        border={border}
                        hover={hover}
                        withIndex={withIndex}
                        pagination={pagination}
                        styleIndexCol={styleIndexCol}
                    />
                );
            })}
        </TableBody>
    );
};

export default TableBaseBody;
