import { EurekaEntities } from "src/common/constants/enum";
import { getPrimaryKey } from "src/squads/syllabus/common/helpers/legacy";

import type { CheckboxProps } from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { TableBorderStyle, TableColumn } from "src/components/Table";
import TableBaseCell from "src/components/Table/TableBaseCell";
import { getBorder } from "src/components/Table/utils";

import { StudyPlanItemStatusKey } from "../../common/constants";
import { StudyPlanItemWithLoInfo } from "../../common/types";
import TableCellWithCheckbox from "../Table/TableCellWithCheckbox";

export const itemRowKey = getPrimaryKey(EurekaEntities.STUDY_PLAN_ITEMS);

interface StudyPlanItemTableCellsProps {
    studyPlanItem: StudyPlanItemWithLoInfo;
    columns: TableColumn[];
    dataIndex: number;
    selectedItems: StudyPlanItemWithLoInfo[];
    onSelectItem: CheckboxProps["onChange"];
}

const StudyPlanItemTableCells = ({
    studyPlanItem,
    columns,
    dataIndex,
    selectedItems,
    onSelectItem,
}: StudyPlanItemTableCellsProps) => {
    const theme = useTheme();
    const border = getBorder(theme, TableBorderStyle.all);

    const checked = selectedItems.some((item) => item[itemRowKey] === studyPlanItem[itemRowKey]);

    return (
        <>
            {columns.map((column, columnIndex) => {
                const isFirstIndex = columnIndex === 0;

                const cellProps = {
                    ...column.cellProps,
                    border,
                    columnIndex,
                    maxColumnIndex: columns.length - 1,
                    style: {
                        ...column.cellProps?.style,
                        ...(studyPlanItem.status ===
                        StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED
                            ? {
                                  backgroundColor: theme.palette.grey[100],
                                  color: theme.palette.grey[400],
                              }
                            : {}),
                        ...(checked ? { backgroundColor: theme.palette.blue?.[50] } : {}),
                    },
                };

                const childRender = column.render?.(studyPlanItem, dataIndex);

                const key = column.key;

                if (isFirstIndex) {
                    return (
                        <TableCellWithCheckbox
                            key={key}
                            cellProps={cellProps}
                            checkboxProps={{
                                checked,
                                onChange: onSelectItem,
                            }}
                        >
                            {childRender}
                        </TableCellWithCheckbox>
                    );
                }

                return (
                    <TableBaseCell key={key} {...cellProps}>
                        {childRender}
                    </TableBaseCell>
                );
            })}
        </>
    );
};

export default StudyPlanItemTableCells;
