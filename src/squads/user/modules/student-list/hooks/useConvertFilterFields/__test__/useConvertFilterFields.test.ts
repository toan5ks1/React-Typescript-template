import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import useConvertFilterFields from "../useConvertFilterFields";

import { renderHook } from "@testing-library/react-hooks";

describe("useConvertFilterFields", () => {
    it("should return data filterFieldObjects filterAppliedFieldObjects are objects", () => {
        const { result } = renderHook(() => useConvertFilterFields({}), {
            wrapper: TestCommonAppProvider,
        });

        expect(typeof result.current.filterFieldObjects).toBe("object");
        expect(typeof result.current.filterAppliedFieldObjects).toBe("object");
    });

    it("should return data filterAppliedFieldObjects with isNotLogged", () => {
        const { result } = renderHook(
            () =>
                useConvertFilterFields({
                    valueFilters: { courses: [], isNotLogged: true, grades: [] },
                }),
            {
                wrapper: TestCommonAppProvider,
            }
        );

        expect(result.current.filterAppliedFieldObjects).toMatchObject([
            {
                name: "isNotLogged",
                inputLabel: "Never logged in",
                isApplied: true,
                defaultValue: false,
            },
        ]);
    });
});
