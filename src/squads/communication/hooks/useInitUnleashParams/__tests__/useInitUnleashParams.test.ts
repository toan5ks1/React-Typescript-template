import { Features } from "src/squads/communication/common/constants/feature-keys";

import { renderHook } from "@testing-library/react-hooks";

describe("useInitUnleashParams", () => {
    it("return init params without user id and school id", async () => {
        const { default: useInitUnleashParams } = await import("../useInitUnleashParams");
        const { result } = renderHook(() => useInitUnleashParams<Features>());
        expect(result.current).toEqual({
            env: "stag",
            schoolId: undefined,
            userId: undefined,
            variant: "manabie",
        });
    });

    it("return init params with user id and school id", async () => {
        jest.doMock("src/squads/communication/internals/reactive-storage", () => {
            return {
                get: () => {
                    return {
                        id: "user-id",
                        schoolId: 123456,
                    };
                },
            };
        });
        const { default: useInitUnleashParams } = await import("../useInitUnleashParams");
        const { result } = renderHook(() => useInitUnleashParams<Features>());
        expect(result.current).toEqual({
            env: "stag",
            schoolId: "123456",
            userId: "user-id",
            variant: "manabie",
        });
        jest.dontMock("src/squads/communication/internals/reactive-storage");
    });
});
