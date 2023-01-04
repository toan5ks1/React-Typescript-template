import type {
    User_UserAccessPathWithFilterV2Query,
    User_UserAccessPathWithFilterV2QueryVariables,
} from "src/squads/user/service/bob/bob-types";
import userAccessPathService from "src/squads/user/service/define-service/user-access-paths-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseOptions } from "src/squads/user/service/service-creator";
import { getMockLocationsHasura } from "src/squads/user/test-utils/mocks/locations";

import { renderHook } from "@testing-library/react-hooks";
import useStudentDetailLocation from "src/squads/user/modules/student-detail/hooks/useStudentDetailLocation";

const mockData = getMockLocationsHasura(2);

const mockDataLocation = mockData.map((i) => {
    return {
        location: i,
    };
});

jest.mock("src/squads/user/service/infer-service", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});
describe("useStudentDetailLocation", () => {
    it("should return students list", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (_resource: {
                    entity: "userAccessPath";
                    action: keyof typeof userAccessPathService.query;
                }) =>
                (
                    _params: User_UserAccessPathWithFilterV2QueryVariables,
                    option?: UseQueryBaseOptions<
                        User_UserAccessPathWithFilterV2Query["user_access_paths"]
                    >
                ) => {
                    option?.selector?.(mockDataLocation);
                    return {
                        isLoading: false,
                        data: mockDataLocation,
                    };
                }
        );
        const { result } = renderHook(() => useStudentDetailLocation("student_id"));

        expect(result.current.locations).toEqual(mockData);
    });
});
