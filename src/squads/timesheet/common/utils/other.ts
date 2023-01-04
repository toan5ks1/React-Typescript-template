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

export function arrayHasItem<T>(arr?: T[] | T | null): boolean {
    return Array.isArray(arr) && arr.length > 0;
}
