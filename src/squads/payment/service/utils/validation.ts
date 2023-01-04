import { arrayHasItem } from "src/common/utils/other";

export function isInvalidOrEmptyArray(
    params: string | string[] | number | number[] | null | undefined
): params is any[] {
    return !Boolean(params) || typeof params === "undefined" || !arrayHasItem(params);
}

export function isInvalidOrEmptyVariable(params: any): params is any {
    return !Boolean(params) || typeof params === "undefined" || params === "";
}
