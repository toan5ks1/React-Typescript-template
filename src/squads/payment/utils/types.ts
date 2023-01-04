export const isNotUndefinedOrNull = <T>(props: T | undefined | null): props is T => {
    return typeof props !== "undefined" && props !== null;
};

export const isValidQueryField = (value: string | (string | null)[] | null): string | undefined => {
    return typeof value === "string" ? value : undefined;
};

const isString = (string: string | null): string is string => {
    return typeof string !== null;
};

export const parseQueryParameterToStringArray = (
    value: string | (string | null)[] | null
): string[] => {
    return typeof value === "string"
        ? [value]
        : Array.isArray(value)
        ? value.filter<string>(isString)
        : [];
};

export const toNumber = (number: any): number => {
    return isNaN(number) ? 0 : number;
};

export const isEmptyObject = (obj: object) => {
    return Boolean(Object.keys(obj).length === 0);
};
