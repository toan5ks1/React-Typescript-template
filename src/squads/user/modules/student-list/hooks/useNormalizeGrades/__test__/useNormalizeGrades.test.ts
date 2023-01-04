import { createMockMapGradeOfStudents } from "src/squads/user/test-utils/mocks/student";

import useNormalizeGrades from "../useNormalizeGrades";

import { renderHook } from "@testing-library/react-hooks";

const mockMapGrades = createMockMapGradeOfStudents("id01");

jest.mock("src/squads/user/hooks/useCourseMapStudent", () => {
    return () => ({
        getStudentGradeName: jest.fn(),
    });
});

jest.mock("src/squads/user/hooks/useGetGradeAndStatusOfStudents", () => {
    return () => ({
        mapGradeOfStudents: mockMapGrades,
        isLoading: false,
    });
});

describe("useNormalizeGrades", () => {
    it("should return correct", () => {
        const { result } = renderHook(() => useNormalizeGrades(["id01"]));

        expect(result.current.loading).toEqual(false);
        expect(result.current.mapGrades).toEqual(mockMapGrades);
    });
});
