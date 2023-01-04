import {
    flatTreeLocationByRecursive,
    getNodeTreeByRecursive,
} from "src/squads/syllabus/common/helpers/tree-locations";
import { mockTreeLocations } from "src/squads/syllabus/test-utils/locations";

describe("getNodeTreeByRecursive test", () => {
    const mockRootLocation = mockTreeLocations[0];
    it("should return location root when id is locationId of root location", () => {
        const id = mockRootLocation.locationId;
        const location = getNodeTreeByRecursive(mockRootLocation, id);
        expect(location).toEqual(mockRootLocation);
    });

    it("should return correct child location when id is child location's locationId", () => {
        const id = mockRootLocation.children![0].locationId;
        const location = getNodeTreeByRecursive(mockRootLocation, id);
        expect(location).toEqual(mockRootLocation.children![0]);
    });

    it("should return default value when id doesn't match with any locationId", () => {
        const id = "testId";
        const location = getNodeTreeByRecursive(mockRootLocation, id);
        expect(location).toEqual({
            locationId: "",
            name: "",
            locationType: "",
            parentLocationId: "",
            accessPath: "",
        });
    });
});

describe("flatTreeLocationByRecursive test", () => {
    const mockFlatLocations = flatTreeLocationByRecursive(mockTreeLocations[0]);
    it("should return a list of locations without children", () => {
        mockFlatLocations.forEach((flatLocation) => {
            expect(flatLocation).not.toHaveProperty("children");
        });
        expect(mockFlatLocations.length).toEqual(23);
    });
});
