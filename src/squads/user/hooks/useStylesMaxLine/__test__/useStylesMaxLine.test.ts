import useStylesMaxLine from "../useStylesMaxLine";

import { renderHook } from "@testing-library/react-hooks";

describe("useStylesMaxLine", () => {
    it("should return string data", () => {
        const { result } = renderHook(() => useStylesMaxLine({ maxLines: 2 }));

        expect(typeof result.current.lineClamp).toBe("object");
    });
});
