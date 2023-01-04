import { lazy } from "react";

export function isNumericValue(val: any): boolean {
    // !val to prevent "", undefined, null
    return Boolean(val) || val === 0 ? !Number.isNaN(Number(val)) : false;
}

function stringifyReplacer(_key: string | number | symbol, value: any) {
    if (typeof value === "undefined") {
        return "undefined";
    }

    const specialTypes = ["function", "bigint", "symbol"];
    // We use different operation for special kinds
    if (specialTypes.includes(typeof value)) {
        return value.toString();
    }

    return value;
}

export function safeStringify(target: any, spacing?: number): string {
    return JSON.stringify(target, stringifyReplacer, spacing);
}

export function removeLastCharacter(str: string) {
    return str.slice(0, -1);
}

export function emailIsValid(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isUndefined(a: any): boolean {
    return typeof a === "undefined";
}

export function toArr<T>(e: T | Array<T>): T[] {
    return Array.isArray(e) ? e : [e];
}

/**
 * @param {string} str string to shorten
 * @param {number=30} max max string length
 */
export function toShortenStr(str: string | undefined, max: number = 30) {
    if (!str || str.length <= max) return str || "";

    return str.substr(0, max) + "...";
}

export function pick1stElement<T>(arr: T[], defaultValue?: T): T | undefined {
    if (Array.isArray(arr)) {
        return arr[0];
    }

    return defaultValue || undefined;
}

export const removeByIndex = <T>(arrayIn: T[], index: number): T[] => {
    if (index >= 0) return [...arrayIn.slice(0, index), ...arrayIn.slice(index + 1)];
    return arrayIn;
};

export const mergeTwoArrayAndRemoveDuplicate = (arr1: string[], arr2: string[]): string[] => {
    return [...new Set([...arr1, ...arr2])];
};

export function omitProp<T extends object, K extends keyof T>(
    obj: T,
    prop: K
): Pick<T, Exclude<keyof T, K>> {
    const { [prop]: removed, ...rest } = obj;

    return rest;
}

export function retry(
    fn: () => Promise<{ default: any }>,
    retriesLeft = 5,
    interval = 1000
): Promise<{ default: any }> {
    return new Promise((resolve, reject) => {
        fn()
            .then(resolve)
            .catch((error) => {
                window.warner?.log(
                    `lazy load retry. retriesLeft: ${retriesLeft}, interval: ${interval}`
                );

                setTimeout(() => {
                    if (retriesLeft === 1) {
                        reject(error);
                        return;
                    }
                    retry(fn, retriesLeft - 1, interval).then(resolve, reject);
                }, interval);
            });
    });
}

export function lazyWithRetry(
    fn: () => Promise<{ default: any }>,
    retriesLeft = 5,
    interval = 1000
) {
    return lazy(() => retry(fn, retriesLeft, interval));
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const containsWhiteSpaces = (value: string) => /\s/.test(value);

export function pathNameMatch(basePath: string, comparePath: string): boolean {
    return basePath === `${comparePath}` || basePath === `${comparePath}/`;
}

export function arrayHasItem<T>(arr?: T[] | T | null): boolean {
    return Array.isArray(arr) && arr.length > 0;
}

export const handleOpenNewTab = (url: string) => {
    return window.open(url, "_blank");
};

export const genHasuraArrayString = (arr: Array<number | string | undefined>) => {
    return `{${arr.join(",")}}`;
};

//TODO: refactor next release
export const isTopPage = (pathname: string) => {
    return pathname.split("/").length <= 3;
};

//TODO: refactor next release
export const getTopPagePath = (pathname: string) => {
    const arr = pathname.split("/");
    return {
        basename: arr[1],
        entity: arr[2],
    };
};
