import { ReactNode } from "react";

import { PaginationWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";

import { TableBody, TableCell, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import TableBaseRow from "src/components/Table/TableBaseRow";
import TableSke from "src/components/Table/TableSke";
import { TableBaseRowProps } from "src/components/Table/table-types";
import { getRowKey } from "src/components/Table/utils";
import TypographyBase from "src/components/Typographys/TypographyBase";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";

import useTranslate from "src/squads/adobo/domains/invoice/hooks/useTranslate";

const DEFAULT_COUNT_PER_PAGE = 10;

interface TableInvoiceInfoBodyProps<TData>
    extends Pick<
        TableBaseRowProps<TData>,
        "border" | "rowKey" | "columns" | "hover" | "withIndex"
    > {
    data: TData[];
    loading: boolean;
    noDataMessage?: string | ReactNode;
    isSelected?: Function;
    skeCount?: number;
    skeHeight?: number;
    pagination?: PaginationWithTotal;
    styleIndexCol?: TableBaseRowProps<TData>["styleIndexCol"];
    tax?: string;
    subtotal?: string;
    total?: string;
}

const PREFIX = "TableBaseRow";

const classes = {
    selected: `${PREFIX}-selected`,
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${classes.selected}`]: {
        backgroundColor: theme.palette.primary.background,
    },
}));

// TODO: Create test file
const TableInvoiceInfoBody = <T extends object>(props: TableInvoiceInfoBodyProps<T>) => {
    const {
        columns,
        data = [],
        loading,
        rowKey,
        noDataMessage,
        isSelected,
        skeCount,
        skeHeight,
        border,
        hover,
        withIndex,
        pagination,
        styleIndexCol,
        total,
        subtotal,
        tax,
    } = props;

    const StyledTableCell = styled(TableCell)(({ align }) => ({
        ...border,
        align,
    }));

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

    return (
        <TableBody data-testid="TableInvoiceInfoBody__root">
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
            <StyledTableRow>
                <StyledTableCell />
                <StyledTableCell>Subtotal</StyledTableCell>
                <StyledTableCell>--</StyledTableCell>
                <StyledTableCell>--</StyledTableCell>
                <StyledTableCell>--</StyledTableCell>
                <StyledTableCell align="right">{subtotal}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell />
                <StyledTableCell>Tax(10% incl.)</StyledTableCell>
                <StyledTableCell>--</StyledTableCell>
                <StyledTableCell>--</StyledTableCell>
                <StyledTableCell>--</StyledTableCell>
                <StyledTableCell align="right">{tax}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell />
                <StyledTableCell colSpan={4}>
                    <TypographyBase data-testid="TableBase__cellHeader" variant="subtitle2">
                        Total
                    </TypographyBase>
                </StyledTableCell>
                <StyledTableCell align="right">
                    <TypographyBase data-testid="TableBase__cellHeader" variant="subtitle2">
                        {total}
                    </TypographyBase>
                </StyledTableCell>
            </StyledTableRow>
        </TableBody>
    );
};

export default TableInvoiceInfoBody;
