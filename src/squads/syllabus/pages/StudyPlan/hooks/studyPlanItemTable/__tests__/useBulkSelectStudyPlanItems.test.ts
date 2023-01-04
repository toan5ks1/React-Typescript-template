import { mockStudyPlanItemsTableData } from "src/squads/syllabus/test-utils/study-plan";

import useBulkSelectStudyPlanItems from "../useBulkSelectStudyPlanItems";

import { act, renderHook } from "@testing-library/react-hooks";

const data = mockStudyPlanItemsTableData({});

const topicToSelect = data[0];
const itemToSelect = topicToSelect.studyPlanItems[0];
describe(useBulkSelectStudyPlanItems.name, () => {
    it("should select all items in topic when click handleSelectTopic", () => {
        const { result } = renderHook(() => useBulkSelectStudyPlanItems());

        act(() => {
            result.current.handleSelectTopic(topicToSelect);
        });

        expect(result.current.selectedList).toHaveLength(1);

        expect(result.current.selectedList[0].studyPlanItems).toHaveLength(
            topicToSelect.studyPlanItems.length
        );
    });

    it("should select an item in topic when click handleSelectItem", () => {
        const { result } = renderHook(() => useBulkSelectStudyPlanItems());

        act(() => {
            result.current.handleSelectItem(topicToSelect, itemToSelect);
        });

        expect(result.current.selectedList[0].studyPlanItems).toHaveLength(1);
    });

    it("should unselect an item in topic when handleSelectTopic and then unselect and item on list", () => {
        const { result } = renderHook(() => useBulkSelectStudyPlanItems());

        act(() => {
            result.current.handleSelectTopic(topicToSelect);
        });

        expect(result.current.selectedList).toHaveLength(1);

        expect(result.current.selectedList[0].studyPlanItems).toHaveLength(
            topicToSelect.studyPlanItems.length
        );

        // unselect 1 item in topic
        act(() => {
            result.current.handleSelectItem(topicToSelect, itemToSelect);
        });

        expect(result.current.selectedList[0].studyPlanItems).toHaveLength(
            topicToSelect.studyPlanItems.length - 1
        );
    });

    it("should select all items in topic when click handleSelectTopic with 1 item selected in topic", () => {
        const { result } = renderHook(() => useBulkSelectStudyPlanItems());

        // select 1 item in topic
        act(() => {
            result.current.handleSelectItem(topicToSelect, itemToSelect);
        });
        expect(result.current.selectedList[0].studyPlanItems).toHaveLength(1);

        // select topic
        act(() => {
            result.current.handleSelectTopic(topicToSelect);
        });

        expect(result.current.selectedList).toHaveLength(1);

        expect(result.current.selectedList[0].studyPlanItems).toHaveLength(
            topicToSelect.studyPlanItems.length
        );
    });

    it("should unselect topic when uncheck the only one selected item in topic", () => {
        const { result } = renderHook(() => useBulkSelectStudyPlanItems());

        act(() => {
            result.current.handleSelectItem(topicToSelect, itemToSelect);
        });

        expect(result.current.selectedList[0].studyPlanItems).toHaveLength(1);
        expect(result.current.selectedList).toHaveLength(1);

        act(() => {
            result.current.handleSelectItem(topicToSelect, itemToSelect);
        });

        expect(result.current.selectedList).toHaveLength(0);
    });
});
