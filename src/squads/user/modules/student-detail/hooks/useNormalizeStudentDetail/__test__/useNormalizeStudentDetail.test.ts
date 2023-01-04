import type { NormalizeStudentInformation } from "src/squads/user/common/types";
import { getMockLocationsHasura } from "src/squads/user/test-utils/mocks/locations";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";

import { act, renderHook } from "@testing-library/react-hooks";
import useNormalizeStudentDetail from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";
import useStudentDetail, {
    UseStudentDetailReturn,
} from "src/squads/user/modules/student-detail/hooks/useStudentDetail";
import type { UseStudentDetailProps } from "src/squads/user/modules/student-detail/hooks/useStudentDetail/useStudentDetail";
import useStudentDetailLocation, {
    UseStudentDetailLocationReturn,
} from "src/squads/user/modules/student-detail/hooks/useStudentDetailLocation";

const mockData = createMockStudent({ id: "student_id_01", current_grade: 10 });
const mockDataLocation = getMockLocationsHasura(2);

jest.mock("src/squads/user/modules/student-detail/hooks/useStudentDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-detail/hooks/useStudentDetailLocation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useNormalizeStudentDetail", () => {
    it("should return students list", () => {
        (
            useStudentDetail as jest.Mock<UseStudentDetailReturn<NormalizeStudentInformation>>
        ).mockImplementation(
            (
                arg: UseStudentDetailProps<NormalizeStudentInformation>
            ): UseStudentDetailReturn<NormalizeStudentInformation> => {
                arg?.selector?.(mockData);
                return {
                    isLoading: false,
                    student: mockData,
                    refetch: jest.fn(),
                };
            }
        );
        (useStudentDetailLocation as jest.Mock<UseStudentDetailLocationReturn>).mockReturnValue({
            isLoading: false,
            locations: mockDataLocation,
            refetch: jest.fn(),
        });
        const { result } = renderHook(() => useNormalizeStudentDetail("student_id"));

        expect(result.current.student).toEqual(mockData);
    });
    it("should call refetch student and location function", () => {
        const mockFetchStudent = jest.fn();
        const mockFetchLocation = jest.fn();

        (
            useStudentDetail as jest.Mock<UseStudentDetailReturn<NormalizeStudentInformation>>
        ).mockReturnValue({
            refetch: mockFetchStudent,
            isLoading: false,
        });
        (useStudentDetailLocation as jest.Mock<UseStudentDetailLocationReturn>).mockReturnValue({
            refetch: mockFetchLocation,
            isLoading: false,
        });
        const { result } = renderHook(() => useNormalizeStudentDetail("student_id"));
        act(() => result.current.refetch());
        expect(mockFetchStudent).toHaveBeenCalledTimes(1);
        expect(mockFetchLocation).toHaveBeenCalledTimes(1);
    });
});
