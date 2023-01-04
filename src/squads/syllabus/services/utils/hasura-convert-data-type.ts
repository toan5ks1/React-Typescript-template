export const convertArrayToHasuraArrayString = (arr: Array<number | string | undefined>) => {
    return `{${arr.join(",")}}`;
};
