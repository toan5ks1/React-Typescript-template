import { CSSProperties, Key } from "react";

import get from "lodash/get";

import { Theme } from "@mui/material";

import { RowKeyFunc, TableBorderStyle } from "./table-types";

import isFunction from "lodash/isFunction";
import { PaginationWithTotal } from "src/hooks/data/useQueryWithPagination";

export const calcBorderRightBottomTable = (
    border: Pick<CSSProperties, "borderRight" | "borderBottom">,
    maxIndex: number,
    currentIndex: number
) => {
    return currentIndex < maxIndex
        ? { ...border }
        : { borderRight: "none", borderBottom: border.borderBottom };
};

export const getBorder = (
    theme: Theme,
    type: string
): Pick<CSSProperties, "borderRight" | "borderBottom"> => {
    switch (type) {
        case TableBorderStyle.all:
            return {
                borderRight: `1px solid ${theme.palette.border?.main}`,
                borderBottom: `1px solid ${theme.palette.border?.main}`,
            };
        case TableBorderStyle.horizontal:
            return {
                borderRight: "none",
                borderBottom: `1px solid ${theme.palette.border?.main}`,
            };
        default:
            return {
                borderRight: "none",
                borderBottom: "none",
            };
    }
};

export const getRowKey = (record: object, rowKey: string | RowKeyFunc) => {
    if (isFunction(rowKey)) {
        return rowKey(record);
    }

    return get(record, rowKey) as Key;
};

/**
 * Calculates the data index based on pagination.
 * @param {PaginationWithTotal} pagination The response pagination object
 * @param dataIndex The index of the data in the dataset
 * @returns {number}
 */
export const calculateDataIndex = (dataIndex: number, pagination?: PaginationWithTotal): number =>
    (pagination?.page || 0) * (pagination?.limit || 0) + dataIndex + 1;

export const withCellStyles = <T extends object>(record: T, cellStyles: CSSProperties) => ({
    ...record,
    cellStyles,
});
