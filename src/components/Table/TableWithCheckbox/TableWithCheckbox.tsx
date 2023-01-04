import { Key, useCallback, useEffect, useMemo, useState } from "react";

import { differenceBy, intersectionBy, isEqual, uniqBy, xorBy } from "lodash";
import { arrayHasItem, safeStringify } from "src/common/utils/other";

import { Table } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import TableBaseFooter from "../TableBaseFooter";
import TableWrapper from "../TableWrapper";
import { TableWithCheckboxProps } from "../table-types";
import { getBorder, getRowKey } from "../utils";
import TableBodyWithCheckbox from "./TableBodyWithCheckbox";
import TableHeaderWithCheckbox from "./TableHeaderWithCheckbox";

const TableWithCheckbox = <T extends object>(props: TableWithCheckboxProps<T>) => {
    const theme = useTheme();

    const {
        showHeader,
        styles,
        border = "all",
        columns,
        footer,
        body,
        tableProps,
        onSelect,
        component,
        data = [],
        listSelectedItems = [],
        errorMessage,
        withIndex,
        hasDraftProperty,
    } = props;

    const [listSelected, setSelected] = useState<T[]>(listSelectedItems);
    const dataWithDraft = hasDraftProperty
        ? data.filter((record) => record?.hasOwnProperty("isDraft"))
        : data;
    // Handle remove item in table => Re-check selected item
    useEffect(() => {
        setSelected(listSelectedItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [safeStringify(listSelectedItems)]);

    const handleSelectAllClick = (isSelectAll: boolean) => {
        if (isSelectAll) {
            const uniqMergeData = uniqBy(listSelected.concat(dataWithDraft), body.rowKey);

            setSelected(uniqMergeData);
            onSelect?.(uniqMergeData);

            return;
        }

        const leftData = differenceBy(listSelected, dataWithDraft, body.rowKey);
        setSelected(leftData);
        onSelect?.(leftData);
    };

    const handleClickCheckbox = (selectingRecord: T) => {
        const newSelectedRecords = listSelected.filter(
            (selectedRecord) => !isEqual(selectedRecord, selectingRecord)
        );

        // The filtered list has the same number of items so a new item is checked.
        if (newSelectedRecords.length === listSelected.length) {
            newSelectedRecords.push(selectingRecord);
        }

        setSelected(newSelectedRecords);
        onSelect?.(newSelectedRecords);
    };

    const handleCheckIsSelected = useCallback(
        (key: Key) => listSelected.some((record) => getRowKey(record, body.rowKey) === key),
        [body.rowKey, listSelected]
    );
    const numberOfSelectedItems = useMemo(
        () => intersectionBy(listSelected, dataWithDraft, body.rowKey).length,
        [dataWithDraft, listSelected, body.rowKey]
    );

    // Reset selected when data empty
    useEffect(() => {
        if (!body.loading && !dataWithDraft.length && listSelected.length) {
            setSelected([]);
        }
    }, [body.loading, dataWithDraft, listSelected]);

    // Handle when upsert data with same rowKey
    useEffect(() => {
        if (dataWithDraft && !body.loading && arrayHasItem(listSelected)) {
            const sameIDsData = intersectionBy(data, listSelected, body.rowKey);
            const extantData = xorBy(sameIDsData, listSelected, body.rowKey);

            setSelected([...extantData, ...sameIDsData]);
        }

        if (!arrayHasItem(listSelectedItems)) setSelected([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [safeStringify(dataWithDraft), safeStringify(listSelected)]);

    return (
        <TableWrapper component={component} errorMessage={errorMessage} styles={styles}>
            <Table style={styles?.table} {...tableProps}>
                <TableHeaderWithCheckbox
                    columns={columns}
                    border={getBorder(theme, border)}
                    visible={showHeader}
                    style={styles?.header}
                    select={
                        onSelect && {
                            onSelectAllClick: handleSelectAllClick,
                            hasData: !!dataWithDraft.length,
                            isCheckedAll: numberOfSelectedItems === dataWithDraft.length,
                            hasChecked:
                                numberOfSelectedItems > 0 &&
                                numberOfSelectedItems <= dataWithDraft.length,
                        }
                    }
                    withIndex={withIndex}
                />

                <TableBodyWithCheckbox
                    data={data} // to render all data include Draft
                    columns={columns}
                    border={getBorder(theme, border)}
                    onSelect={onSelect}
                    handleClickCheckbox={handleClickCheckbox}
                    isSelected={handleCheckIsSelected}
                    withIndex={withIndex}
                    hasDraftProperty={hasDraftProperty}
                    {...body}
                />
            </Table>
            {footer?.pagination && <TableBaseFooter {...footer} />}
        </TableWrapper>
    );
};

TableWithCheckbox.defaultProps = {
    columns: [],
    showHeader: true,
    border: "all",
    component: "div",
};

export default TableWithCheckbox;
