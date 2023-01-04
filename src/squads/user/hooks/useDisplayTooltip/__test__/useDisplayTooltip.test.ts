import useDisplayTooltip from "../useDisplayTooltip";

import { renderHook, act } from "@testing-library/react-hooks";

describe("useDisplayTooltip", () => {
    it("should return function and false", () => {
        const { result } = renderHook(() => useDisplayTooltip());

        expect(typeof result.current.handleMouseEnter).toBe("function");
        expect(result.current.shouldDisplayTooltip).toBe(false);
    });

    it("should change shouldDisplayTooltip to true", () => {
        const mockEvent = {
            currentTarget: {
                clientHeight: 10,
                scrollHeight: 20,
            },
        } as unknown as React.MouseEvent<HTMLElement, MouseEvent>;

        const { result } = renderHook(() => useDisplayTooltip());

        act(() => {
            result.current.handleMouseEnter(mockEvent);
        });

        expect(result.current.shouldDisplayTooltip).toBe(true);
    });

    it("should change shouldDisplayTooltip to false", () => {
        const mockEvent = {
            currentTarget: {
                clientHeight: 10,
                scrollHeight: 10,
            },
        } as unknown as React.MouseEvent<HTMLElement, MouseEvent>;

        const { result } = renderHook(() => useDisplayTooltip());

        act(() => {
            result.current.handleMouseEnter(mockEvent);
        });

        expect(result.current.shouldDisplayTooltip).toBe(false);
    });
});
