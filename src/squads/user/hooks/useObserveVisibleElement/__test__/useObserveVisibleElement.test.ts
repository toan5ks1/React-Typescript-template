import useObserveVisibleElement from "../useObserveVisibleElement";

import { renderHook } from "@testing-library/react-hooks";

describe("useObserveVisibleElement", () => {
    afterAll(() => {
        jest.restoreAllMocks();
    });

    it("should return data correctly", () => {
        const observe = jest.fn();
        const unobserve = jest.fn();
        const defaultHeight = 110;
        window.IntersectionObserver = jest.fn().mockReturnValue({ observe, unobserve });

        const { result } = renderHook(() => useObserveVisibleElement({ defaultHeight }));

        expect(result.current.intersectionRef.current).toBeNull();
        expect(result.current.placeholderHeight.current).toBe(defaultHeight);
        expect(result.current.isVisible).toBe(false);
        expect(result.current.rendered).toBe(false);
        expect(typeof result.current.resetRendered).toBe("function");
    });
});
