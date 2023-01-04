import { createMockStudentCourseUpsert } from "src/squads/user/test-utils/mocks/student";

import useCourseAutocomplete from "../useCourseAutocomplete";

import { renderHook } from "@testing-library/react-hooks";

const mockCourse = createMockStudentCourseUpsert("student_id");

describe("useCourseAutocomplete", () => {
    it("checkOptionDisabled should return true when courses existed", () => {
        const { result } = renderHook(() => useCourseAutocomplete([mockCourse]));

        expect(result.current?.checkOptionDisabled(mockCourse.course)).toBe(true);
    });

    it("checkOptionDisabled should return false when courses is empty", () => {
        const { result } = renderHook(() => useCourseAutocomplete([]));

        expect(result.current.checkOptionDisabled(mockCourse.course)).toBe(false);
    });

    it("checkOptionSelected should return true", () => {
        const { result } = renderHook(() => useCourseAutocomplete([mockCourse]));

        expect(result.current.checkOptionSelected(mockCourse.course, mockCourse.course)).toBe(true);
    });

    it("checkOptionSelected should return false", () => {
        const { result } = renderHook(() => useCourseAutocomplete([mockCourse]));

        expect(
            result.current.checkOptionSelected(mockCourse.course, {
                ...mockCourse.course,
                course_id: "1",
            })
        ).toBe(false);
    });
});
