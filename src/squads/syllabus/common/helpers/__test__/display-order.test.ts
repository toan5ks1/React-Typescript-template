import { swapDisplayOrder, sortDisplayOrderEntities, swap } from "../display-order";

describe(swapDisplayOrder.name, () => {
    it("should return correct result", () => {
        const result = swapDisplayOrder<{ name: string }>(
            {
                display_order: 5,
                name: "Name 5",
            },
            {
                display_order: 2,
                name: "Name 2",
            }
        );
        expect(result).toEqual([
            {
                display_order: 2,
                name: "Name 5",
            },
            {
                display_order: 5,
                name: "Name 2",
            },
        ]);
    });
});

describe(sortDisplayOrderEntities.name, () => {
    it("should return correct result", () => {
        const result = [
            {
                display_order: 5,
                name: "Name 5",
            },
            {
                display_order: 2,
                name: "Name 2",
            },
            {
                display_order: 11,
                name: "Name 11",
            },
            {
                display_order: 2,
                name: "Name 2.1",
            },
            {
                display_order: 3,
                name: "Name 3",
            },
        ].sort(sortDisplayOrderEntities);

        expect(result).toEqual([
            {
                display_order: 2,
                name: "Name 2.1",
            },
            {
                display_order: 2,
                name: "Name 2",
            },
            {
                display_order: 3,
                name: "Name 3",
            },
            {
                display_order: 5,
                name: "Name 5",
            },
            {
                display_order: 11,
                name: "Name 11",
            },
        ]);
    });
});

describe(swap.name, () => {
    it("should return swapped value", () => {
        expect(swap(1, 2)).toEqual([2, 1]);
        expect(swap("abc@gm", "10")).toEqual(["10", "abc@gm"]);
    });
});
