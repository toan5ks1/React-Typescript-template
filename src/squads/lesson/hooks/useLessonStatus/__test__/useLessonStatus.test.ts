import { choiceLessonStatus } from "src/squads/lesson/common/choices";

import { renderHook } from "@testing-library/react-hooks";
import useLessonStatus from "src/squads/lesson/hooks/useLessonStatus";

describe("useLessonStatus", () => {
    it("should return correctly list status", () => {
        const { result } = renderHook(() => useLessonStatus());
        expect(result.current.choiceLessonStatus).toEqual(choiceLessonStatus);
    });
});
