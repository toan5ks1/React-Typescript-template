import { CSSProperties, Fragment } from "react";

import { Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TableBorderStyle, TableColumn } from "src/components/Table";
import TableBaseCell from "src/components/Table/TableBaseCell";
import TableBaseRow from "src/components/Table/TableBaseRow";
import { calcBorderRightBottomTable, getBorder, getRowKey } from "src/components/Table/utils";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";

import { StudyPlanItemStatusKey } from "../../common/constants";
import { StudyPlanItemsByTopic, StudyPlanItemWithLoInfo } from "../../common/types";

const renderCells = ({
    studyPlanItem,
    columns,
    border,
    dataIndex,
    theme,
}: {
    studyPlanItem: StudyPlanItemWithLoInfo;
    columns: TableColumn[];
    border: Parameters<typeof calcBorderRightBottomTable>[0];
    dataIndex: number;
    theme: Theme;
}) => {
    const archivedStyles: CSSProperties = {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[400],
    };

    return columns.map((column, columnIndex) => (
        <TableBaseCell
            key={column.key}
            {...column.cellProps}
            style={{
                ...column.cellProps?.style,
                ...(studyPlanItem.status === StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED
                    ? archivedStyles
                    : {}),
            }}
            border={border}
            maxColumnIndex={columns.length - 1}
            columnIndex={columnIndex}
        >
            {column.render?.(studyPlanItem, dataIndex)}
        </TableBaseCell>
    ));
};

export interface StudyPlanItemTableBodyProps {
    columns: TableColumn<StudyPlanItemWithLoInfo>[];
    data: StudyPlanItemsByTopic[];
    rowKey: string;
}

const StudyPlanItemTableBody = (props: StudyPlanItemTableBodyProps) => {
    const { columns, data, rowKey } = props;
    const theme = useTheme();
    const baseProps = { columns, rowKey, border: getBorder(theme, TableBorderStyle.all) };

    return (
        <>
            {data.map(({ topicId, topicName, studyPlanItems }) => {
                if (!studyPlanItems.length) return null;

                return (
                    <Fragment key={topicId}>
                        <TableBaseRow
                            {...baseProps}
                            dataIndex={0}
                            record={studyPlanItems[0]}
                            render={(columns) => (
                                <>
                                    <TableBaseCell
                                        border={baseProps.border}
                                        rowSpan={studyPlanItems.length}
                                        style={{ verticalAlign: "top" }}
                                        {...columns[0].cellProps}
                                    >
                                        <TypographyMaxLines variant="body2" maxLines={1}>
                                            {topicName}
                                        </TypographyMaxLines>
                                    </TableBaseCell>

                                    {renderCells({
                                        studyPlanItem: studyPlanItems[0],
                                        border: baseProps.border,
                                        columns: columns.slice(1),
                                        dataIndex: 0,
                                        theme,
                                    })}
                                </>
                            )}
                        />

                        {studyPlanItems.slice(1).map((studyPlanItem, dataIndex) => (
                            <TableBaseRow
                                {...baseProps}
                                key={getRowKey(studyPlanItem, rowKey)}
                                dataIndex={dataIndex}
                                record={studyPlanItem}
                                render={(columns) =>
                                    renderCells({
                                        studyPlanItem,
                                        border: baseProps.border,
                                        columns: columns.slice(1),
                                        dataIndex,
                                        theme,
                                    })
                                }
                            />
                        ))}
                    </Fragment>
                );
            })}
        </>
    );
};

export default StudyPlanItemTableBody;
