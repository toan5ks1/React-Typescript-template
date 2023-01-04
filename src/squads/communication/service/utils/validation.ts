import { arrayHasItem } from "src/common/utils/other";

export function isInvalidOrEmptyArray(
    params: string | string[] | number | number[] | null | undefined
): boolean {
    return !Boolean(params) || !arrayHasItem(params);
}

export function isInvalidOrEmptyVariable(
    params: string | string[] | number | number[] | null | undefined
): boolean {
    return !Boolean(params);
}
