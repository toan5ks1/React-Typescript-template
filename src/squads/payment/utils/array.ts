export const isLastItemInArray = (index: number, length: number): boolean => {
    return index === length - 1;
};

export const pick1stElement = <T>(arr: T[], defaultValue?: T): T | undefined => {
    return arr[0] || defaultValue || undefined;
};
