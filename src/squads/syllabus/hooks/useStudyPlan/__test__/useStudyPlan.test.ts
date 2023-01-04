import useStudyPlan, { Collection, UseStudyPlanReturn } from "../useStudyPlan";

import { act, renderHook } from "@testing-library/react-hooks";

describe("useStudyPlan", () => {
    it("should add parent correct", () => {
        const parentKey = "ABC";
        const expected: Collection = {
            [parentKey]: { checked: true },
        };
        const { result } = renderHook<null, UseStudyPlanReturn>(() => useStudyPlan());

        act(() => {
            result.current.onSelectParent(parentKey, true);
        });

        expect(result.current.selectCollection).toEqual(expected);
    });

    it("should add child correct", () => {
        const parentKey = "ABC";
        const childKey = "ABC";
        const expected: Collection = {
            [parentKey]: { children: childKey },
        };
        const { result } = renderHook<null, UseStudyPlanReturn>(() => useStudyPlan());

        act(() => {
            result.current.onSelectChild(parentKey, childKey, true);
        });

        expect(result.current.selectCollection).toEqual(expected);
    });

    it("should get list parent keys correct", () => {
        const listParentKeys: string[] = ["ABC", "BCD"];
        const { result } = renderHook<null, UseStudyPlanReturn>(() => useStudyPlan());

        act(() => {
            listParentKeys.forEach((key) => {
                result.current.onSelectParent(key, true);
            });
        });

        expect(result.current.getSelectedParents()).toEqual(listParentKeys);
    });

    it("should reset collection", () => {
        const parentKey = "ABC";
        const { result } = renderHook<null, UseStudyPlanReturn>(() => useStudyPlan());

        act(() => {
            result.current.onSelectParent(parentKey, true);
        });

        act(() => {
            result.current.reset();
        });

        expect(result.current.selectCollection).toEqual({});
    });
});
