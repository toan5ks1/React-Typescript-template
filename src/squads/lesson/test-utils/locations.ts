import { LocationInformation } from "src/squads/lesson/common/types";

export const getMockLocations = (length: number = 20): LocationInformation[] => {
    return Array(length)
        .fill("")
        .map((_, index) => ({
            locationId: `center_${index}`,
            name: `Center ${index + 1}`,
            parentLocationId: `parent_center`,
            locationType: "center",
            accessPath: "",
        }));
};
