import { $enum } from "ts-enum-util";
import { StringKeyOf } from "ts-enum-util/src/types";

export type EnumKeysReturn<T> = Record<StringKeyOf<T>, StringKeyOf<T>>;

/**
 * @description Convert Record<keyString, number> to Record<keyString, keyString>
 **/
export function convertEnumKeys<T extends Record<StringKeyOf<T>, number | string>>(
    enumObj: T
): EnumKeysReturn<T> {
    const keys: StringKeyOf<T>[] = $enum(enumObj).getKeys();

    return keys.reduce((result, key: StringKeyOf<T>) => {
        result[key] = String(key) as StringKeyOf<T>;
        return result;
    }, {} as EnumKeysReturn<T>);
}

export function getEnumString(objEnum = {}, value: any) {
    const index = Object.values(objEnum).indexOf(value);
    if (index >= 0) {
        return Object.keys(objEnum)[index];
    }
    return "";
}

/**
 * @description Convert Maybe<string> to string
 **/
export function convertString(value: string | null | undefined): string {
    return !value ? "" : value;
}
