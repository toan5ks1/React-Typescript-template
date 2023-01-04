import { MathJaxLoadStatus } from "src/common/constants/enum";

import useInstallMathjax from "../useInstallMathjax";

import { renderHook } from "@testing-library/react-hooks";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";

describe("useInstallMathjax node env", () => {
    it("cannot set mathjaxHub on node environment", async () => {
        const { result } = renderHook(() => useInstallMathjax(), {
            wrapper: AppProvider,
        });

        expect(result.current).toEqual({
            loadStatus: MathJaxLoadStatus.NOT_INJECTED,
            mathJaxHub: null,
        });
    });
});
