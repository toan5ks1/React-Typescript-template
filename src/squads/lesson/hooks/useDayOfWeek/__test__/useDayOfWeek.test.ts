import { choiceDayOfWeek } from "src/common/constants/choices";

import { renderHook } from "@testing-library/react-hooks";
import useDayOfWeek from "src/squads/lesson/hooks/useDayOfWeek";

describe(useDayOfWeek.name, () => {
    it("should return correctly list default day of week", () => {
        const { result } = renderHook(() => useDayOfWeek());
        expect(result.current.choiceDayOfWeek).toEqual(choiceDayOfWeek);
    });
});
