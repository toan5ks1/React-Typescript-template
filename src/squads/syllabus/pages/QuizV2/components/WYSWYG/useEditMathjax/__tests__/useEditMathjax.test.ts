import { ChangeEvent } from "react";

import useEditMathjax from "../useEditMathjax";

import { renderHook, act } from "@testing-library/react-hooks";

jest.mock("../../useInstallMathJax", () => {
    const fakeMathJaxHub = {
        mathJaxHub: null,
    };
    return () => fakeMathJaxHub;
});

describe(useEditMathjax.name, () => {
    it("should change texValue after calling onTexChange", () => {
        const initialTex = "123321";
        const { result } = renderHook(() => useEditMathjax(() => initialTex));

        expect(result.current.value).toEqual(initialTex);

        const newTexValue = "00000";
        act(() => {
            result.current.onTexChange({
                target: { value: newTexValue },
            } as ChangeEvent<HTMLTextAreaElement>);
        });

        expect(result.current.value).toEqual(newTexValue);
    });
});
