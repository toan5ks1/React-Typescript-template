import { OptionSelectType } from "src/common/constants/types";

export function translateForChoices<T extends (str: string) => string>(
    options: OptionSelectType[],
    t: T
): OptionSelectType[] {
    return options.map((option) => {
        const value = t(option.value);
        return {
            ...option,
            value,
        };
    });
}
