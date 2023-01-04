import { ComponentProps, CSSProperties, ElementType, HTMLAttributes, Key, ReactNode } from "react";

import { StandardProps } from "src/typings/react-component";

import { Table, TableCellProps } from "@mui/material";

import { PaginationWithTotal } from "src/hooks/data/useQueryWithPagination";

export interface CellProps extends TableCellProps {
    "data-testid"?: string;
    style?: CSSProperties;
    headerStyle?: CSSProperties;
}

export interface TableColumn<T extends object = any> {
    key: string;
    title?: ReactNode;
    emptyValue?: string;
    testId?: string;
    cellProps?: CellProps;
    dataIndex?: string;
    render?: (record: T, dataIndex?: number) => ReactNode;
}

export type TableIndex = boolean | Pick<CSSProperties, "width">;

export enum TableBorderStyle {
    all = "all",
    horizontal = "horizontal",
    none = "none",
}

export interface RowKeyFunc {
    (record: object): string;
}

export type StyleKeys = {
    root: CSSProperties;
    container: CSSProperties;
    table: CSSProperties;
    row: CSSProperties;
    header: CSSProperties;
    footer: CSSProperties;
};

export interface TableCheckboxSelectType {
    onSelectAllClick: (isSelectAll: boolean) => void;
    hasData: boolean;
    hasChecked: boolean;
    isCheckedAll: boolean;
}

export interface TableBaseHeaderProps extends StandardProps {
    visible: boolean;
    border: CSSProperties;
    columns: TableColumn[];
    withIndex?: TableIndex;
    render?: (columns: TableColumn[]) => ReactNode;
}

export interface TableBaseBodyProps<TData>
    extends Pick<
        TableBaseRowProps<TData>,
        "border" | "rowKey" | "columns" | "hover" | "withIndex"
    > {
    data: TData[];
    loading: boolean;
    noDataMessage?: string | ReactNode;
    isSelected?: Function;
    customBody?: ReactNode;
    skeCount?: number;
    skeHeight?: number;
    pagination?: PaginationWithTotal;
    styleIndexCol?: TableBaseRowProps<TData>["styleIndexCol"];
}

export interface TableBaseRowProps<TData>
    extends Omit<HTMLAttributes<HTMLTableRowElement>, "onSelect"> {
    dataIndex: number;
    record: TData;
    columns: TableColumn[];
    selected?: boolean;
    rowKey: string | RowKeyFunc;
    hover?: boolean;
    border: CSSProperties;
    withIndex?: TableIndex;
    pagination?: PaginationWithTotal;
    render?: (columns: TableColumn[]) => ReactNode;
    styleIndexCol?: CSSProperties;
}

export interface TableBaseCellProps extends CellProps {
    border?: Pick<
        CSSProperties,
        "border" | "borderLeft" | "borderTop" | "borderRight" | "borderBottom"
    >;
    maxColumnIndex?: number;
    columnIndex?: number;
}

export interface TableBaseFooterProps {
    pagination: PaginationWithTotal;
    labelRowsPerPage?: string;
    rowsPerPageOptions?: number[];
    style?: CSSProperties;
}

export interface TableBaseProps<TData> extends StandardProps {
    columns: TableColumn[];
    data: TData[];
    showHeader: boolean;
    border: keyof typeof TableBorderStyle; // Support 3 border style
    body: Omit<TableBaseBodyProps<TData>, "data" | "columns" | "border">;
    footer?: TableBaseFooterProps;
    styles?: Partial<StyleKeys>; // Support custom style by using style attribute
    tableProps?: object | ComponentProps<typeof Table>; // Sticky header, put data-id...
    component: ElementType;
    isSelected?: (key: Key) => boolean;
    errorMessage?: string | ReactNode;
    withIndex?: TableIndex;
    styleIndexCol?: TableBaseRowProps<TData>["styleIndexCol"];
}

export interface TableHeaderWithCheckboxProps extends Omit<TableBaseHeaderProps, "render"> {
    select?: TableCheckboxSelectType;
}

export interface TableBodyWithCheckboxProps<TData>
    extends TableBaseBodyProps<TData>,
        Pick<TableRowWithCheckboxProps<TData>, "onSelect" | "handleClickCheckbox">,
        Pick<TableWithCheckboxProps<TData>, "hasDraftProperty"> {}

export interface TableRowWithCheckboxProps<TData>
    extends Omit<TableBaseRowProps<TData>, "render">,
        Pick<TableWithCheckboxProps<TData>, "hasDraftProperty"> {
    handleClickCheckbox?: (record: TData) => void;
    onSelect?: (record: TData[]) => void;
}

export interface TableWithCheckboxProps<TData> extends Omit<TableBaseProps<TData>, "isSelected"> {
    listSelectedItems?: TData[]; // Allow pass a list with selected item from outside
    onSelect?: (record: TData[]) => void; // Support checkbox each row
    hasDraftProperty?: boolean;
}

export interface TableBodyWithRowSpanProps<TData> extends Omit<TableBaseBodyProps<TData>, "data"> {
    data: { [group: string]: TData[] };
}

export interface TableWithRowSpanProps<TData>
    extends Omit<TableBaseProps<TData>, "columns" | "data"> {
    headerColumns: TableColumn[];
    dataColumns: TableColumn[];
    data: { [group: string]: TData[] };
}
