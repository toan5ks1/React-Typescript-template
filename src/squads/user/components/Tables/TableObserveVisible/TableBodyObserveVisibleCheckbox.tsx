import TableBaseBody from "src/components/Table/TableBaseBody";
import { TableBodyWithCheckboxProps } from "src/components/Table/table-types";
import { getRowKey } from "src/components/Table/utils";

import TableRowObserveVisibleCheckbox from "./TableRowObserveVisibleCheckbox";

const TableBodyObserveVisibleCheckbox = <T extends object>(
    props: TableBodyWithCheckboxProps<T>
) => {
    const { onSelect, handleClickCheckbox, ...tableBaseBodyProps } = props;
    const {
        columns,
        data,
        border,
        hover,
        rowKey,
        withIndex,
        pagination,
        isSelected,
        hasDraftProperty,
    } = tableBaseBodyProps;

    return (
        <TableBaseBody
            customBody={
                <>
                    {data.map((record, dataIndex) => {
                        const key = getRowKey(record, rowKey) || dataIndex;

                        return (
                            <TableRowObserveVisibleCheckbox
                                key={key}
                                columns={columns}
                                selected={isSelected?.(key)}
                                dataIndex={dataIndex}
                                record={record}
                                rowKey={rowKey}
                                border={border}
                                hover={hover}
                                onSelect={onSelect}
                                withIndex={withIndex}
                                pagination={pagination}
                                handleClickCheckbox={handleClickCheckbox}
                                hasDraftProperty={hasDraftProperty}
                            />
                        );
                    })}
                </>
            }
            {...tableBaseBodyProps}
        />
    );
};

export default TableBodyObserveVisibleCheckbox;
