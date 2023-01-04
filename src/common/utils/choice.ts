import { OptionSelectType } from "src/common/constants/types";
import { TypeEntity } from "src/typings/react-admin";
import { $enum } from "ts-enum-util";
import { StringKeyOf } from "ts-enum-util/src/types";

/**
 * convertToChoices - Convert to an array of select options
 * this is useful for using enum from BE and passing to mutation
 * it makes sure data pass to gRPC service is in the same format
 * and in some case, helpful for translation
 * @param object
 * @param key
 * @param module
 */
export function convertToChoices<T>(
    object: Record<StringKeyOf<T>, number>,
    key: string,
    module: TypeEntity
): OptionSelectType[] {
    return $enum(object)
        .getKeys()
        .map((e) => {
            return {
                id: object[e],
                label: e,
                value: `resources.${module}.choices.${key}.${object[e]}`,
            };
        });
}
