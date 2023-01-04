import { getMockLocations } from "src/squads/user/test-utils/mocks/locations";
import {
    createMockCoursesWithFilter,
    createMockGradesWithFilter,
} from "src/squads/user/test-utils/mocks/student";

import useFilterStudents, { UseFilterStudentsReturn } from "../useFilterStudents";

import { renderHook, RenderHookResult, act } from "@testing-library/react-hooks";
import useGlobalLocations from "src/hooks/useGlobalLocations";

const mockGrades = createMockGradesWithFilter();
const mockCourses = createMockCoursesWithFilter();
const mockLowestLocations = getMockLocations();

jest.mock("src/squads/user/hooks/useUserFeatureFlag");
jest.mock("src/hooks/useGlobalLocations", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useFilterStudents", () => {
    beforeEach(() => {
        (useGlobalLocations as jest.Mock).mockReturnValue({ locations: mockLowestLocations });
    });

    it("keyword should be correct when searching by text", () => {
        const { result }: RenderHookResult<null, UseFilterStudentsReturn> = renderHook(() =>
            useFilterStudents()
        );
        const keyword = "End";

        act(() => result?.current?.onSearch(keyword));

        expect(result.current.filter.keyword).toEqual(keyword);
    });

    it("grades should be correct when choosing a grade", () => {
        const { result }: RenderHookResult<null, UseFilterStudentsReturn> = renderHook(() =>
            useFilterStudents()
        );

        act(() =>
            result.current.onFilter({
                grades: mockGrades,
            })
        );

        expect(result.current.filter.grades).toEqual(mockGrades);
    });

    it("courses should be correct when choosing a course", () => {
        const { result }: RenderHookResult<null, UseFilterStudentsReturn> = renderHook(() =>
            useFilterStudents()
        );

        act(() =>
            result.current.onFilter({
                courses: mockCourses,
            })
        );

        expect(result.current.filter.courses).toEqual(mockCourses);
    });

    it("isNotLogged should be correct when clicking isNotLogged checkbox", () => {
        const { result } = renderHook(() => useFilterStudents());

        act(() =>
            result.current.onFilter({
                isNotLogged: true,
            })
        );

        expect(result.current.filter.isNotLogged).toEqual(true);
    });
    it("should return locations correctly", () => {
        const { result } = renderHook(() => useFilterStudents());

        const expectedResult = mockLowestLocations.map((location) => location.locationId);

        expect(result.current.filter.locationIds).toMatchObject(expectedResult);
    });
});
