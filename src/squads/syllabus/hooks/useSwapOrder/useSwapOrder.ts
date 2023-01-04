import { MutationMenus } from "src/common/constants/enum";

export type Action = MutationMenus.MOVE_DOWN | MutationMenus.MOVE_UP;

interface UseSwapOrder<T extends Record<keyof T, T[keyof T]>> {
    data: T[];
    key: keyof T;
}

const useSwapOrder = <T extends Partial<Record<keyof T, T[keyof T]>>>({
    data,
    key,
}: UseSwapOrder<T>) => {
    const swap = (action: Action, identity: T[keyof T]) => {
        if (!data) return null;
        const index = data.findIndex((element) => element[key] === identity);
        return getSwap(action, index);
    };

    const getSwap = (action: Action, index: number): [T, T, number] | null => {
        if (index === -1) return null;
        if (index === 0 && action === MutationMenus.MOVE_UP) return null;
        if (index === data.length - 1 && action === MutationMenus.MOVE_DOWN) return null;

        let nextIndex: number = 0;

        switch (action) {
            case MutationMenus.MOVE_UP: {
                nextIndex = index - 1;
                break;
            }
            default: {
                nextIndex = index + 1;
            }
        }
        const firstElement = data[index];
        const secondElement = data[nextIndex];
        return [firstElement, secondElement, index];
    };

    return { swap, getSwap };
};

export default useSwapOrder;
