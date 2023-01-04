import {
    mockLocationTypesContainsEmptyLocation,
    mockSortedPersistedLocationTypesContainsOrgLocation,
} from "src/test-utils/location-types";

import { isContainsOrgLocation, isLocationsTypeWithEmptyLocation } from "../location-types";

describe("isContainsOrgLocation", () => {
    it("should return false with input empty location types list", () => {
        expect(isContainsOrgLocation([])).toEqual(false);
    });
    it("should return true with input location types list which have org location", () => {
        expect(isContainsOrgLocation(mockSortedPersistedLocationTypesContainsOrgLocation)).toEqual(
            true
        );
    });
});

describe("isLocationsTypeWithEmptyLocation", () => {
    it("should return true with input empty location types list", () => {
        expect(isLocationsTypeWithEmptyLocation([])).toEqual(true);
    });
    it("should return true with input location types which have empty location for every type", () => {
        expect(isLocationsTypeWithEmptyLocation(mockLocationTypesContainsEmptyLocation)).toEqual(
            true
        );
    });
    it("should return true with input location types which have location", () => {
        expect(
            isLocationsTypeWithEmptyLocation(mockSortedPersistedLocationTypesContainsOrgLocation)
        ).toEqual(false);
    });
});
