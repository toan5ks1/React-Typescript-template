import useActionMenu, { UseActionMenuProps } from "../useActionMenu";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";

describe("useActionMenu", () => {
    it("should init state correct", () => {
        const { result }: RenderHookResult<null, UseActionMenuProps> = renderHook(() =>
            useActionMenu()
        );

        expect(result.current.open).toBe(false);
    });
});

describe("useActionMenu handle state", () => {
    it("should change state correct", () => {
        const { result }: RenderHookResult<null, UseActionMenuProps> = renderHook(() =>
            useActionMenu()
        );

        act(() => {
            // @ts-ignore
            result.current.onOpen({ currentTarget: "FAKE" });
        });

        expect(result.current.open).toEqual(true);

        act(() => {
            result.current.onClose();
        });

        expect(result.current.open).toEqual(false);
    });
});
