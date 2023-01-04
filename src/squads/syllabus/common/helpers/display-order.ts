export function swap<T>(a: T, b: T): T[] {
    return [b, a];
}

type EntityDisplayOrderTypes<T> = T & {
    created_at?: string;
    display_order?: number | null;
};

//with side effect. We intended to mutate the original record
export function swapDisplayOrder<T = any>(
    rec1: EntityDisplayOrderTypes<T>,
    rec2: EntityDisplayOrderTypes<T>
) {
    const [a1, a2] = swap(rec1.display_order, rec2.display_order);

    rec1.display_order = a1;
    rec2.display_order = a2;

    return [rec1, rec2];
}

export function sortDisplayOrderEntities<T>(
    prev: EntityDisplayOrderTypes<T>,
    next: EntityDisplayOrderTypes<T>
): number {
    if (prev.display_order === next.display_order) {
        return prev.created_at! > next.created_at! ? 1 : -1;
    }

    return prev.display_order! > next.display_order! ? 1 : -1;
}
