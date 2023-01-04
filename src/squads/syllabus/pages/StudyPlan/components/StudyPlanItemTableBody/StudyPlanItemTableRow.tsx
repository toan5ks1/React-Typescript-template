import { memo, useMemo } from "react";

import intersection from "lodash/intersection";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { TableBorderStyle } from "src/components/Table";
import TableBaseRow from "src/components/Table/TableBaseRow";
import { getBorder, getRowKey } from "src/components/Table/utils";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";

import { StudyPlanItemsByTopic, StudyPlanItemWithLoInfo } from "../../common/types";
import { useStudyPlanItemTableColumns } from "../../hooks/studyPlanItemTable";
import TableCellWithCheckbox from "../Table/TableCellWithCheckbox";
import StudyPlanItemTableCells, { itemRowKey } from "./StudyPlanItemTableCells";

interface StudyPlanItemTableRowProps {
    topic: StudyPlanItemsByTopic;
    selectedTopics: StudyPlanItemsByTopic[];
    selectedItems: StudyPlanItemWithLoInfo[];
    studyPlanItem: StudyPlanItemWithLoInfo;
    dataIndex: number;
    isLastRow?: boolean;
    onSelectTopic: (topic: StudyPlanItemsByTopic) => void;
    onSelectSPItem: (topic: StudyPlanItemsByTopic, item: StudyPlanItemWithLoInfo) => void;
}

const StudyPlanItemTableRow = ({
    topic,
    studyPlanItem,
    selectedTopics,
    selectedItems,
    isLastRow,
    dataIndex,
    onSelectTopic,
    onSelectSPItem,
}: StudyPlanItemTableRowProps) => {
    const theme = useTheme();
    const border = getBorder(theme, TableBorderStyle.all);

    const isFirstRow = dataIndex === 0;

    const { studyPlanItems, topicId } = topic;

    const columns = useStudyPlanItemTableColumns({
        classes: {},
        isEditing: true,
        sxStyles: {
            padding: { padding: "6px 16px" },
            visibilityEditColumn: {
                textAlign: "center",
            },
        },
    });

    const isTopicSelected = selectedTopics.some(
        (record) => getRowKey(record, "topicId") === topicId
    );

    const topicNameCellStyle = useMemo(
        () => ({
            // light blue when cell checkbox is checked
            ...(isTopicSelected
                ? {
                      backgroundColor: theme.palette.blue?.[50],
                      borderBottom: `1px solid ${theme.palette.grey[300]}`,
                  }
                : {}),
            // match with row border as UI design
            ...(!isLastRow ? { borderBottom: "none" } : {}),
        }),
        [isLastRow, isTopicSelected, theme]
    );

    const emptyCellStyle = useMemo(
        () => ({
            borderRight: `1px solid ${theme.palette.grey[200]}`,
            borderBottom: isLastRow ? `1px solid ${theme.palette.grey[200]}` : undefined,
        }),
        [isLastRow, theme.palette.grey]
    );

    const numberOfSelectedItemsInTopic = intersection(selectedItems, studyPlanItems).length;

    return (
        <TableBaseRow
            border={border}
            rowKey={itemRowKey}
            columns={columns}
            dataIndex={dataIndex}
            record={studyPlanItem}
            render={(columns) => {
                return (
                    <>
                        {isFirstRow ? (
                            <TableCellWithCheckbox
                                cellProps={{
                                    border: border,
                                    style: topicNameCellStyle,
                                }}
                                checkboxProps={{
                                    indeterminate:
                                        isTopicSelected &&
                                        numberOfSelectedItemsInTopic < studyPlanItems.length,
                                    onChange: () => onSelectTopic(topic),
                                    checked: isTopicSelected,
                                }}
                            >
                                <TypographyMaxLines variant="body2" maxLines={1}>
                                    {topic.topicName}
                                </TypographyMaxLines>
                            </TableCellWithCheckbox>
                        ) : (
                            // render empty cell to fullfill row
                            // active background color as UI design
                            <Box component="td" sx={emptyCellStyle}></Box>
                        )}

                        <StudyPlanItemTableCells
                            selectedItems={selectedItems}
                            studyPlanItem={studyPlanItem}
                            columns={columns.slice(1)}
                            dataIndex={dataIndex}
                            onSelectItem={() => onSelectSPItem(topic, studyPlanItem)}
                        />
                    </>
                );
            }}
        />
    );
};

export default memo(StudyPlanItemTableRow);
