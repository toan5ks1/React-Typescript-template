import { cloneElement, isValidElement } from "react";

import { TableBody, TableCell, TableRow } from "@mui/material";
import TableSke from "src/components/Table/TableSke";
import { TableBaseBodyProps } from "src/components/Table/table-types";
import { getRowKey } from "src/components/Table/utils";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";

import TableBaseRowObserveVisible from "./TableBaseRowObserveVisible";

import useTranslate from "src/squads/lesson/hooks/useTranslate";

const DEFAULT_COUNT_PER_PAGE = 10;

const TableBaseBodyObserveVisible = <T extends object>(props: TableBaseBodyProps<T>) => {
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
                    <TableBaseRowObserveVisible
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

export default TableBaseBodyObserveVisible;
