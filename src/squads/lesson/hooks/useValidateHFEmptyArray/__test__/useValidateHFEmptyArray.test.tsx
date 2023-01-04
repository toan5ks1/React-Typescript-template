import useValidateHFEmptyArray from "../useValidateHFEmptyArray";

import { renderHook } from "@testing-library/react-hooks";

describe("useValidateHFEmptyArray test hook", () => {
    type TestType = {
        element: string;
    };

    const errorMessage = "Is empty array";

    const {
        result: { current },
    } = renderHook(() => useValidateHFEmptyArray<TestType>(errorMessage));

    it("Should empty array", () => {
        expect(current([])).toEqual(errorMessage);
    });

    it("Should not empty array", () => {
        expect(current([{ element: "1st element" }])).not.toEqual(errorMessage);
    });
});
