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
            // Because we can't mock SyntheticEvent, so I will disable typescript here
            // https://github.com/facebook/flow/issues/5244#issuecomment-342124953
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
