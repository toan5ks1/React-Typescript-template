import {
    createMockMapCourses,
    createMockQueryCourses,
} from "src/squads/user/test-utils/mocks/student";

import useNormalizeCourses from "../useNormalizeCourses";

import { renderHook } from "@testing-library/react-hooks";

const mockCourses = createMockQueryCourses(1, "id01");
const mockMapCourses = createMockMapCourses("id01");

jest.mock("src/squads/user/hooks/useCourseMapStudent", () => {
    return () => ({
        loaded: false,
        coursesData: mockCourses,
    });
});

describe("useNormalizeCourses", () => {
    it("should return correct", () => {
        const { result } = renderHook(() => useNormalizeCourses(["id01"]));

        expect(result.current.loaded).toEqual(false);
        expect(result.current.courses).toEqual(mockCourses);
        expect(result.current.mapCourses).toEqual(mockMapCourses);
    });
});
