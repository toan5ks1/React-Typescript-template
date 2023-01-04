export const isTextIncludeMultipleValue = (text: string, arrayString: string[]): boolean => {
    let isIncluded = true;

    arrayString.forEach((str) => {
        if (!text.includes(str)) {
            isIncluded = false;
            return;
        }
    });

    return isIncluded;
};
