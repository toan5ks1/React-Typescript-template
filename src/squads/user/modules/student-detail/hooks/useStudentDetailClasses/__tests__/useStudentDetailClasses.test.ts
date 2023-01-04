import useStudentDetailClasses from "../useStudentDetailClasses";

import { renderHook } from "@testing-library/react-hooks";

describe("useStudentDetailClasses", () => {
    it("should return object", () => {
        const { result } = renderHook(() => useStudentDetailClasses());

        expect(typeof result.current.classes).toBe("object");
    });
});
