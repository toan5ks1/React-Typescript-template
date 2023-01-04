import { useCallback, useState } from "react";

import { StudyPlanItemsByTopic, StudyPlanItemWithLoInfo } from "../../common/types";

import isEqual from "lodash/isEqual";

const useBulkSelectStudyPlanItems = () => {
    const [selectedList, setSelectedList] = useState<StudyPlanItemsByTopic[]>([]);

    const handleSelectTopic = useCallback((topic: StudyPlanItemsByTopic) => {
        setSelectedList((current) => {
            const newSelectedRecords = current.filter(
                (selectedRecord) => !isEqual(selectedRecord, topic)
            );

            if (newSelectedRecords.length === current.length) {
                // replace if current topic is existed in selectedList
                // this happens when select a SP item but its topic was not selected before
                const selectedTopicIndex = current.findIndex(
                    (item) => item.topicId === topic.topicId
                );
                if (selectedTopicIndex > -1) {
                    newSelectedRecords.splice(selectedTopicIndex, 1, topic);
                } else {
                    newSelectedRecords.push(topic);
                }
            }

            return newSelectedRecords;
        });
    }, []);

    const handleSelectItem = useCallback(
        (topic: StudyPlanItemsByTopic, item: StudyPlanItemWithLoInfo) => {
            const selectedTopic = selectedList.find((t) => t.topicId === topic.topicId);

            // If the topic is not selected
            // add new topic and SP item of topic to selectedList
            if (!selectedTopic) {
                const newSelectedTopic = { ...topic, studyPlanItems: [item] };
                return setSelectedList((currentList) => [...currentList, newSelectedTopic]);
            }

            const { studyPlanItems: itemsInSelectedTopic } = selectedTopic;

            const newSelectedItems = itemsInSelectedTopic.filter(
                (selected: StudyPlanItemWithLoInfo) => !isEqual(selected, item)
            );

            if (newSelectedItems.length === itemsInSelectedTopic.length) {
                newSelectedItems.push(item);
            }

            // remove check topic if there is no more item in selected topic
            if (newSelectedItems.length <= 0) {
                return setSelectedList(
                    selectedList.filter(({ topicId }) => !isEqual(topicId, selectedTopic.topicId))
                );
            }

            const selectedTopicIdx = selectedList.findIndex((t) => t.topicId === topic.topicId);
            setSelectedList((currentList) =>
                currentList.map((t, idx) =>
                    selectedTopicIdx === idx ? { ...t, studyPlanItems: newSelectedItems } : t
                )
            );
        },
        [selectedList]
    );
    return {
        selectedList,
        handleSelectTopic,
        handleSelectItem,
        setSelectedList,
    };
};

export default useBulkSelectStudyPlanItems;
