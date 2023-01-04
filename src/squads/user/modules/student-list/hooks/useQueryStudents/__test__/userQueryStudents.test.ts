import {
    createMockCoursesWithFilter,
    createMockGradesWithFilter,
    createMockListStudentWithFilter,
} from "src/squads/user/test-utils/mocks/student";

import useQueryStudents from "../useQueryStudents";

import { renderHook } from "@testing-library/react-hooks";

const mockedStudents = createMockListStudentWithFilter("123");
const mockGrades = createMockGradesWithFilter();
const mockCourses = createMockCoursesWithFilter();

jest.mock("src/squads/user/hooks/useStudentFilterByCourseGrade", () => {
    return () => ({
        data: mockedStudents,
        loading: false,
        pagination: {},
    });
});

describe("useQuerySchools", () => {
    it("should return schools without filter", () => {
        const { result } = renderHook(() =>
            useQueryStudents({
                grades: [],
                courses: [],
                isNotLogged: true,
                keyword: "",
            })
        );
        expect(result.current.students).toEqual(mockedStudents);
    });

    it("should return schools with filter", () => {
        const { result } = renderHook(() =>
            useQueryStudents({
                grades: mockGrades,
                courses: mockCourses,
                isNotLogged: true,
                keyword: "",
            })
        );
        expect(result.current.students).toEqual(mockedStudents);
    });
});
