import isEqual from "lodash/isEqual";

export const isLastItemInArray = (index: number, length: number) => {
    return isEqual(index + 1, length);
};
