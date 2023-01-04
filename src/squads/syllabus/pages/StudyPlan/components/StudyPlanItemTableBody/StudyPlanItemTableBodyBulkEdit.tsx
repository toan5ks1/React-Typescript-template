import { Fragment, memo } from "react";

import { getRowKey } from "src/components/Table/utils";

import { StudyPlanItemsByTopic, StudyPlanItemWithLoInfo } from "../../common/types";
import { itemRowKey } from "./StudyPlanItemTableCells";
import StudyPlanItemTableRow from "./StudyPlanItemTableRow";

export interface StudyPlanItemTableBodyProps {
    data: StudyPlanItemsByTopic[];
    selectedTopics: StudyPlanItemsByTopic[];
    selectedItems: StudyPlanItemWithLoInfo[];
    onSelectTopic: (topic: StudyPlanItemsByTopic) => void;
    onSelectSPItem: (topic: StudyPlanItemsByTopic, item: StudyPlanItemWithLoInfo) => void;
}

const StudyPlanItemTableBodyBulkEdit = ({
    data,
    selectedTopics,
    selectedItems,
    onSelectTopic,
    onSelectSPItem,
}: StudyPlanItemTableBodyProps) => {
    return (
        <>
            {data.map((topic) => {
                const { topicId, studyPlanItems } = topic;

                if (!studyPlanItems.length) return null;

                return (
                    <Fragment key={topicId}>
                        {studyPlanItems.map((studyPlanItem, dataIndex) => {
                            const isLastRow = dataIndex === studyPlanItems.length - 1;
                            const itemKey = getRowKey(studyPlanItem, itemRowKey);

                            return (
                                <StudyPlanItemTableRow
                                    key={itemKey}
                                    topic={topic}
                                    selectedTopics={selectedTopics}
                                    selectedItems={selectedItems}
                                    studyPlanItem={studyPlanItem}
                                    dataIndex={dataIndex}
                                    isLastRow={isLastRow}
                                    onSelectTopic={onSelectTopic}
                                    onSelectSPItem={onSelectSPItem}
                                />
                            );
                        })}
                    </Fragment>
                );
            })}
        </>
    );
};

export default memo(StudyPlanItemTableBodyBulkEdit);
