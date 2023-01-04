export enum LabelTypes {
    NUMBER = "NUMBER",
    CUSTOM = "CUSTOM",
    TEXT = "TEXT",
    TEXT_UPPERCASE = "TEXT_UPPERCASE",
}

export type ExtendedLabelTypes = LabelTypes | null | "";

export const ASCII_RANGE_LOWERCASE_MIN = "a".charCodeAt(0);
export const ASCII_RANGE_LOWERCASE_MAX = "z".charCodeAt(0);
const ASCII_MAX_LENGTH = ASCII_RANGE_LOWERCASE_MAX - ASCII_RANGE_LOWERCASE_MIN + 1; //accept the upper limit too (so +1)

//covert the number to its position in ascii table (lowercase char)
function toPositionInASCII(num: number) {
    return num + ASCII_RANGE_LOWERCASE_MIN;
}

function numberToExcelLabel(num: number) {
    let result: string = "";
    const fullPart = Math.floor(num / ASCII_MAX_LENGTH);
    const remaining = num % ASCII_MAX_LENGTH;

    for (let i = 0; i < fullPart; i++) {
        result += String.fromCharCode(ASCII_RANGE_LOWERCASE_MIN);
    }

    return `${result}${String.fromCharCode(toPositionInASCII(remaining))}`;
}

export function genListTypeTextLowercase(code: number) {
    return numberToExcelLabel(code);
}

export function genListTypeTextUppercase(code: number) {
    return numberToExcelLabel(code).toUpperCase();
}

export function genListTypeNumber(code: number) {
    return `${code + 1}`;
}

export type TypeGenerator<T> = (x: T, currentLabel?: string) => string;

export const listTypeChooser: { [x in LabelTypes]: TypeGenerator<any> } = {
    [LabelTypes.NUMBER]: genListTypeNumber as TypeGenerator<number>,
    [LabelTypes.TEXT]: genListTypeTextLowercase as TypeGenerator<number>,
    [LabelTypes.TEXT_UPPERCASE]: genListTypeTextUppercase as TypeGenerator<number>,
    [LabelTypes.CUSTOM]: ((_key, currentLabel: string) => currentLabel) as TypeGenerator<number>,
};

const emptyGenerator: TypeGenerator<any> = () => "";

export function getLabelGenerator(type: ExtendedLabelTypes) {
    return listTypeChooser[type as LabelTypes] || emptyGenerator;
}

export function generateLabel(
    type: ExtendedLabelTypes,
    currentIndex: number,
    currentLabel: string
) {
    const generator = getLabelGenerator(type);

    return generator(currentIndex, currentLabel);
}

export function isUpperCase(str: string) {
    return str === str.toLocaleUpperCase();
}

export function isLowerCase(str: string) {
    return str === str.toLocaleLowerCase();
}
