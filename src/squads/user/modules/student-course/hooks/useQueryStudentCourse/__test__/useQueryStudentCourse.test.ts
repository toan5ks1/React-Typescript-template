import { renderHook } from "@testing-library/react-hooks";
import { coursesData } from "src/squads/user/hooks/useCourseMapStudent/__mocks__";
import useNormalizeCourses from "src/squads/user/modules/student-course/hooks/useNormalizeCourses";
import useQueryStudentCourse from "src/squads/user/modules/student-course/hooks/useQueryStudentCourse";

jest.mock("src/squads/user/hooks/useCourseMapStudent");

describe("useQueryStudentCourse", () => {
    it("should return correct", () => {
        const { result } = renderHook(() => useQueryStudentCourse(coursesData[0].studentId));
        const mockCourse = useNormalizeCourses(coursesData);
        expect(result.current.courses).toEqual(mockCourse);
        expect(result.current.loaded).toEqual(true);
    });
});
