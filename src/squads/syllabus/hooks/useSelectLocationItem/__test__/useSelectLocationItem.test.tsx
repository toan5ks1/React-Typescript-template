import { getLeafLocationsByRecursive } from "src/squads/syllabus/common/helpers/tree-locations";
import {
    mockBranchLocation,
    mockListLocationsChecked,
    mockLowestNodeLocation,
} from "src/squads/syllabus/test-utils/locations";

import useSelectLocationItem from "../useSelectLocationItem";

import { renderHook } from "@testing-library/react-hooks";

describe("useSelectLocationItem", () => {
    it("should return checked in checkedList", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useSelectLocationItem({
                keyCompareEqual: "locationId",
                checkedList: mockListLocationsChecked,
                location: mockLowestNodeLocation,
            })
        );

        const { checked, indeterminate, restOfCheckedLocations, selectedLocations } = current;
        expect(checked).toBe(true);
        expect(indeterminate).toBe(false);
        expect(restOfCheckedLocations).toMatchObject(mockListLocationsChecked);
        expect(selectedLocations).toMatchObject([mockLowestNodeLocation]);
    });

    it("should return correct when empty checkedList", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useSelectLocationItem({
                keyCompareEqual: "locationId",
                checkedList: [],
                location: mockLowestNodeLocation,
            })
        );

        const { checked, restOfCheckedLocations, indeterminate, selectedLocations } = current;

        expect(checked).toBe(false);
        expect(indeterminate).toBe(false);
        expect(restOfCheckedLocations).toMatchObject([mockLowestNodeLocation]);
        expect(selectedLocations).toMatchObject([mockLowestNodeLocation]);
    });

    it("should return correct checked and indeterminate branch", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useSelectLocationItem({
                keyCompareEqual: "locationId",
                checkedList: mockListLocationsChecked,
                location: mockBranchLocation,
            })
        );

        const { checked, restOfCheckedLocations, indeterminate, selectedLocations } = current;

        const leafLocations = getLeafLocationsByRecursive({ node: mockBranchLocation });

        const checkedIds = mockListLocationsChecked?.map((leaf) => leaf.locationId);

        const filterLeaf = leafLocations.filter((leaf) => !checkedIds?.includes(leaf.locationId));

        expect(checked).toBe(false);
        expect(indeterminate).toBe(true);
        expect(restOfCheckedLocations).toMatchObject(filterLeaf);
        expect(selectedLocations).toMatchObject(leafLocations);
    });
});
