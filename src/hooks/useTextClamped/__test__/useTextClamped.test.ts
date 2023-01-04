import { useRef } from "react";

import useTextClamped from "../useTextClamped";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("react", () => {
    const originReact = jest.requireActual("react");
    const mUseRef = jest.fn();
    return {
        ...originReact,
        useRef: mUseRef,
    };
});

const wapRenderHook = () => {
    return renderHook(() => useTextClamped({ textContent: "textContent" }));
};

describe("useTextClamped", () => {
    it("should return isClamped = false", () => {
        const ref = { current: { clientHeight: 40, scrollHeight: 40 } };

        (useRef as jest.Mock).mockReturnValue(ref);

        const { result } = wapRenderHook();

        expect(result.current.isClamped).toBe(false);
    });

    it("should return isClamped = true", () => {
        const ref = { current: { clientHeight: 40, scrollHeight: 60 } };
        (useRef as jest.Mock).mockReturnValue(ref);

        const { result } = wapRenderHook();

        expect(result.current.isClamped).toBe(true);
    });
});
