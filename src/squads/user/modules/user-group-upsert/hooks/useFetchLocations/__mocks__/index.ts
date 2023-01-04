import { getLeafLocationsByRecursive } from "src/squads/user/common/helpers/tree-locations";
import { mockTreeLocations } from "src/squads/user/test-utils/mocks/locations";

export default () => {
    const leafLocations = getLeafLocationsByRecursive({ node: mockTreeLocations[0] });
    return { treeLocations: mockTreeLocations[0], leafLocations, isLoading: false };
};
