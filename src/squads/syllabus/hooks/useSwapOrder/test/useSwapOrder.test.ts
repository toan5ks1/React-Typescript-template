import { MutationMenus } from "src/common/constants/enum";

import useSwapOrder from "../useSwapOrder";

import { renderHook } from "@testing-library/react-hooks";

interface MockInterface extends Record<string, string> {
    id: string;
}

const mockData: MockInterface[] = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }];

describe("useSwapOrder", () => {
    const { result } = renderHook(() => useSwapOrder<MockInterface>({ data: mockData, key: "id" }));

    it("shouldn't swap", () => {
        const swapArr = result.current.swap(MutationMenus.MOVE_UP, "12");
        expect(swapArr).toBeNull();
    });

    it("should swap correct", () => {
        const swapArr = result.current.swap(MutationMenus.MOVE_UP, "2");
        const expected = [mockData[1], mockData[0], 1];
        expect(swapArr).toEqual(expected);
    });

    it("shouldn't swap with top item", () => {
        const swapArr = result.current.swap(MutationMenus.MOVE_UP, "1");
        expect(swapArr).toBeNull();
    });

    it("shouldn't swap with bottom item", () => {
        const swapArr = result.current.swap(MutationMenus.MOVE_DOWN, "5");
        expect(swapArr).toBeNull();
    });
});
