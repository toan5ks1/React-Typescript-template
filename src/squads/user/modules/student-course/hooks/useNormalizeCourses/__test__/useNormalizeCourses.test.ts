import {
    createMockQueryCourses,
    createMockStudentCourse,
} from "src/squads/user/test-utils/mocks/student";

import { renderHook } from "@testing-library/react-hooks";
import useNormalizeCourses from "src/squads/user/modules/student-course/hooks/useNormalizeCourses";

jest.mock("src/squads/user/hooks/useCourseMapStudent");

describe("useNormalizeCourses", () => {
    it("should return correct", () => {
        const mockCourses = createMockQueryCourses(1, "id_01");
        const mockStudentCourse = createMockStudentCourse("id_01");

        const { result } = renderHook(() => useNormalizeCourses(mockCourses));

        expect(result.current[0].course).toEqual(mockStudentCourse.course);
        expect(result.current[0].start).toEqual(mockStudentCourse.start);
        expect(result.current[0].end).toEqual(mockStudentCourse.end);
        expect(result.current[0].studentPackageId).toEqual(mockStudentCourse.studentPackageId);
    });
});
