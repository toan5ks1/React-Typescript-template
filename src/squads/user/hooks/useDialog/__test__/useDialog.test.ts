import useDialog, { UseDialogReturn } from "../useDialog";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";

describe("useDialog", () => {
    it("should set correct default", () => {
        const { result }: RenderHookResult<boolean, UseDialogReturn> = renderHook(() =>
            useDialog(true)
        );
        expect(result.current.open).toBe(true);
    });
});

describe("useDialog handle state", () => {
    it("should change state correct", () => {
        const { result }: RenderHookResult<boolean, UseDialogReturn> = renderHook(() =>
            useDialog(false)
        );

        act(() => {
            result.current.onOpen();
        });

        expect(result.current.open).toBe(true);

        act(() => {
            result.current.onClose();
        });

        expect(result.current.open).toBe(false);
    });
});
