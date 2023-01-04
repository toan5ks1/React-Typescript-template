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

/**
 * @param alphabetCase format alphabet added into UpperCase or LowerCase
 * @description create array alphabet(26 items)
 * @returns array alphabet, example with alphabetCase = lowercase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
 */
export function getAlphabetArray(
    alphabetCase: "uppercase" | "lowercase" = "uppercase"
): Array<string> {
    return alphabetCase === "uppercase"
        ? [...Array(26)].map((_, i) => String.fromCharCode(i + 97).toUpperCase())
        : [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
}
