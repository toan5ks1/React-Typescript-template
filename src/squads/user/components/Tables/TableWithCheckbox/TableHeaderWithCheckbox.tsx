import { Box } from "@mui/material";
import TableBaseCell from "src/components/Table/TableBaseCell";
import TableBaseHeader from "src/components/Table/TableBaseHeader";
import TableCheckbox from "src/components/Table/TableWithCheckbox/TableCheckbox";
import { TableColumn, TableHeaderWithCheckboxProps } from "src/components/Table/table-types";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useTranslate from "src/squads/user/hooks/useTranslate";

const TableHeaderWithCheckbox = (props: TableHeaderWithCheckboxProps) => {
    const { select, ...tableBaseHeaderProps } = props;
    const { border } = tableBaseHeaderProps;
    const t = useTranslate();
    const chooseAllItemCheckBox = t("ra.common.action.selectAllItems");

    const renderCell = (column: TableColumn, index: number) => {
        if (select && index === 0) {
            return (
                <Box display="flex" alignItems="center">
                    <Box mr={1.5} display="flex">
                        <TableCheckbox
                            data-testid="TableHeaderWithCheckbox__checkboxHeader"
                            checkboxProps={{
                                indeterminate: select.hasChecked && !select.isCheckedAll,
                                checked: select.isCheckedAll && select.hasData,
                                // onChange not working when click on the border
                                onClick: () => select.onSelectAllClick(!select.isCheckedAll),
                                disabled: !select.hasData,
                                inputProps: { "aria-label": chooseAllItemCheckBox },
                            }}
                        />
                    </Box>
                    <TypographyBase
                        data-testid="TableHeaderWithCheckbox__cellHeader"
                        variant="subtitle2"
                    >
                        {column.title}
                    </TypographyBase>
                </Box>
            );
        }

        return (
            <TypographyBase data-testid="TableHeaderWithCheckbox__cellHeader" variant="subtitle2">
                {column.title}
            </TypographyBase>
        );
    };

    return (
        <TableBaseHeader
            render={(columns) =>
                columns.map((column, index) => {
                    const { cellProps } = column;
                    const columnCellProps = Object.assign({}, cellProps);
                    delete columnCellProps.headerStyle;

                    return (
                        <TableBaseCell
                            {...columnCellProps}
                            style={
                                cellProps?.headerStyle ? cellProps?.headerStyle : cellProps?.style
                            }
                            key={column.key}
                            border={border}
                            maxColumnIndex={columns.length - 1}
                            columnIndex={index}
                        >
                            {renderCell(column, index)}
                        </TableBaseCell>
                    );
                })
            }
            {...tableBaseHeaderProps}
        />
    );
};

export default TableHeaderWithCheckbox;
