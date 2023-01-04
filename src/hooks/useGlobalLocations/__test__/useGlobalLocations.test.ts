import { inValidLocation } from "src/common/utils/location-types";
import reactiveStorage, { GlobalLocationTypes } from "src/internals/reactive-storage";
import {
    mockSortedPersistedLocationTypesContainsOrgLocation,
    mockSortedPersistedLocationTypesWithChildrenHandPicked,
} from "src/test-utils/location-types";

import useGlobalLocations from "../useGlobalLocations";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/hooks/useFeatureToggle";
import useGlobalLocationTypesWithLocations from "src/hooks/useGlobalLocationTypesWithLocations";

jest.mock("src/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/hooks/useGlobalLocationTypesWithLocations", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/internals/reactive-storage", () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
    },
}));

const mockUnleashKey = (isEnabled: boolean) => {
    (useFeatureToggle as jest.Mock).mockReturnValue({ isEnabled });
};

const mockGlobalLocationTypes = (sortedLocationTypesWithLocations: GlobalLocationTypes) => {
    (useGlobalLocationTypesWithLocations as jest.Mock).mockReturnValue({
        sortedLocationTypesWithLocations,
    });
};

const mockLocationsFromLocalStorage = (locationsFromLocalStorage: GlobalLocationTypes) => {
    (reactiveStorage.get as jest.Mock).mockImplementation(() => {
        return locationsFromLocalStorage;
    });
};

describe("useGlobalLocations should handle correctly with unleash key shouldEnableSelectFirstLocation false", () => {
    beforeEach(() => {
        mockUnleashKey(false);
    });

    it("should return empty location with empty location type context", async () => {
        mockGlobalLocationTypes([]);

        const { result } = renderHook(() => useGlobalLocations());

        expect(result.current.locations).toEqual([]);
    });

    it("should return center location list with not empty location type context", async () => {
        mockGlobalLocationTypes(mockSortedPersistedLocationTypesWithChildrenHandPicked);
        const lowestLevelLocations =
            mockSortedPersistedLocationTypesWithChildrenHandPicked[
                mockSortedPersistedLocationTypesWithChildrenHandPicked.length - 1
            ].locations;

        const { result } = renderHook(() => useGlobalLocations());

        expect(result.current.locations).toEqual(lowestLevelLocations);
    });
});

describe("useGlobalLocations should handle correctly with unleash key shouldEnableSelectFirstLocation true", () => {
    beforeEach(() => {
        mockUnleashKey(true);
    });

    it("should return a invalid location with case not sets localStorage yet", async () => {
        mockLocationsFromLocalStorage([]);
        mockGlobalLocationTypes(mockSortedPersistedLocationTypesWithChildrenHandPicked);

        const { result } = renderHook(() => useGlobalLocations());

        expect(result.current.locations).toEqual([inValidLocation]);
    });

    it("should return empty location list with case select org location", async () => {
        mockLocationsFromLocalStorage(mockSortedPersistedLocationTypesContainsOrgLocation);
        mockGlobalLocationTypes(mockSortedPersistedLocationTypesContainsOrgLocation);

        const { result } = renderHook(() => useGlobalLocations());

        expect(result.current.locations).toEqual([]);
    });
});
