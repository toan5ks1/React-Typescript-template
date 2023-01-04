import { LocationInformationHasura } from "src/squads/user/common/types";
import { inferQuery } from "src/squads/user/service/infer-service";
import { getMockLocationsHasura } from "src/squads/user/test-utils/mocks/locations";

import { renderHook } from "@testing-library/react-hooks";
import useStudentListLocation from "src/squads/user/modules/student-list/hooks/useStudentListLocation";

const mockData = getMockLocationsHasura(2);
const mockDataLocation = mockData.map((i) => {
    return {
        location: i,
        user_id: "user_id",
    };
});
jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});
describe("useStudentListLocation", () => {
    it("should return students list", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            isLoading: false,
            data: mockDataLocation,
        }));
        const { result } = renderHook(() => useStudentListLocation(["student_ids"]));
        const location = new Map<string, LocationInformationHasura[]>();
        location.set("user_id", mockData);
        expect(result.current.mapLocations).toEqual(location);
    });
});
