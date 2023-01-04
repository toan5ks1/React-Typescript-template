import { MathJaxLoadStatus } from "src/common/constants/enum";

import useInstallMathjax from "../useInstallMathjax";

import { renderHook } from "@testing-library/react-hooks";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";

describe(`${useInstallMathjax.name} browser env`, () => {
    const oldMathJax = window.MathJax;

    const fakeLoadedMathJax = {
        value: {
            version: "1.0.0",
        },
        config: {
            isLoaded: true,
        },
    };

    beforeEach(() => {
        window.MathJax = {
            ...oldMathJax,
            ...fakeLoadedMathJax,
        };
    });

    afterEach(() => {
        delete window.MathJax;
    });

    it("should set mathjaxHub when config is set, and mathjax is loaded", async () => {
        const { result } = renderHook(() => useInstallMathjax(), {
            wrapper: AppProvider,
        });

        expect(result.current).toEqual({
            loadStatus: MathJaxLoadStatus.LOADED,
            mathJaxHub: fakeLoadedMathJax,
        });
    });
});
