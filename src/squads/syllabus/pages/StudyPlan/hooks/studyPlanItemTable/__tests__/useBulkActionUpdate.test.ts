import { UseFormGetValues } from "react-hook-form";
import { formatDate } from "src/common/utils/time";
import {
    getDateAfterByDuration,
    getDateBeforeByDuration,
} from "src/squads/syllabus/common/utils/time";
import { mockStudyPlanItemsTableData } from "src/squads/syllabus/test-utils/study-plan";

import HookForm from "src/components/Forms/HookForm";

import { StudyPlanItemFormValues, StudyPlanItemWithLoInfo } from "../../../common/types";
import useBulkActionUpdate from "../useBulkActionUpdate";

import { act, renderHook } from "@testing-library/react-hooks";
import { StudyPlanItemStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";

const data = mockStudyPlanItemsTableData({});
const selectedItems: StudyPlanItemWithLoInfo[] = data[0].studyPlanItems;

const selectedItemIds = selectedItems.map((item) => item.study_plan_item_id);
const fieldNames = selectedItemIds.map((id) => `studyPlanItem.${id}.availableFrom`);
const statusFieldNames = selectedItemIds.map((id) => `studyPlanItem.${id}.status`);

// set unknown to avoid type infer mismatch with UseFormGetValues<StudyPlanItemFormValues>
const getFieldAvailableFromValue: unknown = () =>
    `${formatDate(selectedItems[0].available_from, "yyyy/LL/dd")}, 00:00`;

const existingDate = selectedItems[0].available_from;

describe(useBulkActionUpdate.name, () => {
    it("should set dialog context correctly", () => {
        const { result } = renderHook(
            () => useBulkActionUpdate({ selectedItems, setValue: jest.fn, getValues: jest.fn() }),
            {
                wrapper: HookForm,
            }
        );

        act(() => {
            result.current.setDialogContext({
                label: "label",
                fieldName: "availableFrom",
            });
        });

        expect(result.current.dialogContext).toEqual({
            label: "label",
            fieldName: "availableFrom",
        });
    });

    it("should update date value to form hook if date is not null", () => {
        const setValue = jest.fn();

        const { result } = renderHook(
            () => useBulkActionUpdate({ selectedItems, setValue, getValues: jest.fn() }),
            {
                wrapper: HookForm,
            }
        );

        act(() => {
            result.current.setDialogContext({
                label: "label",
                fieldName: "availableFrom",
            });
        });

        act(() => {
            result.current.handleUpdateDateTime("2022/01/01, 12:00");
        });

        fieldNames.forEach((fieldName) => {
            expect(setValue).toHaveBeenCalledWith(fieldName, "2022/01/01, 12:00", {
                shouldDirty: true,
            });
        });
    });

    it("should not call setValue if dialog context not set", () => {
        const setValue = jest.fn();

        const { result } = renderHook(
            () => useBulkActionUpdate({ selectedItems, setValue, getValues: jest.fn() }),
            {
                wrapper: HookForm,
            }
        );

        expect(result.current.dialogContext).toEqual(undefined);

        act(() => {
            result.current.handleUpdateDateTime("2022/01/01, 12:00");
        });

        expect(setValue).not.toHaveBeenCalled();
    });

    it("should postpone date from current date value with postpone action", () => {
        const setValue = jest.fn();

        const { result } = renderHook(
            () =>
                useBulkActionUpdate({
                    selectedItems,
                    setValue,
                    getValues:
                        getFieldAvailableFromValue as UseFormGetValues<StudyPlanItemFormValues>,
                }),
            {
                wrapper: HookForm,
            }
        );

        act(() => {
            result.current.setDialogContext({
                label: "label",
                fieldName: "availableFrom",
            });
        });

        act(() => {
            result.current.handlePostponeAdvanceDate("postpone", 7);
        });

        const expectedDay = getDateAfterByDuration(existingDate, { days: 7 }).toFormat(
            "yyyy/LL/dd"
        );

        fieldNames.forEach((fieldName) => {
            expect(setValue).toHaveBeenCalledWith(fieldName, `${expectedDay}, 00:00`, {
                shouldDirty: true,
            });
        });
    });

    it("should advance date from current date value with handlePostponeAdvanceDate advance action", () => {
        const setValue = jest.fn();
        const { result } = renderHook(
            () =>
                useBulkActionUpdate({
                    selectedItems,
                    setValue,
                    getValues:
                        getFieldAvailableFromValue as UseFormGetValues<StudyPlanItemFormValues>,
                }),
            {
                wrapper: HookForm,
            }
        );

        act(() => {
            result.current.setDialogContext({
                label: "label",
                fieldName: "availableFrom",
            });
        });

        act(() => {
            result.current.handlePostponeAdvanceDate("advance", 7);
        });

        const expectedDay = getDateBeforeByDuration(existingDate, { days: 7 }).toFormat(
            "yyyy/LL/dd"
        );

        fieldNames.forEach((fieldName) => {
            expect(setValue).toHaveBeenCalledWith(fieldName, `${expectedDay}, 00:00`, {
                shouldDirty: true,
            });
        });
    });
});

describe(`handleUpdateShowHide in ${useBulkActionUpdate.name}`, () => {
    const setValue = jest.fn();

    it("should show all items with showAll action", () => {
        const { result } = renderHook(
            () =>
                useBulkActionUpdate({
                    selectedItems,
                    setValue,
                    getValues: jest.fn(),
                }),
            {
                wrapper: HookForm,
            }
        );

        act(() => {
            result.current.handleUpdateShowHide("showAll");
        });

        statusFieldNames.forEach((item) => {
            expect(setValue).toHaveBeenCalledWith(
                item,
                StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                {
                    shouldDirty: true,
                }
            );
        });
    });

    it("should hide all items with hideAll action", () => {
        const { result } = renderHook(
            () =>
                useBulkActionUpdate({
                    selectedItems,
                    setValue,
                    getValues: jest.fn(),
                }),
            {
                wrapper: HookForm,
            }
        );

        act(() => {
            result.current.handleUpdateShowHide("hideAll");
        });

        statusFieldNames.forEach((item) => {
            expect(setValue).toHaveBeenCalledWith(
                item,
                StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
                {
                    shouldDirty: true,
                }
            );
        });
    });
});
