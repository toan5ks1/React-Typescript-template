import { getCallParamsAt } from "src/squads/calendar/test-utils/mock-utils";

import userEvent from "@testing-library/user-event";

export const changeAutocompleteInput = (
    autocompleteInputId: string,
    autocompleteInputValue: string,
    optionIndex: number = 1
) => {
    const autocompleteInput = document.getElementById(autocompleteInputId) as HTMLInputElement;
    userEvent.type(autocompleteInput, autocompleteInputValue);
    for (let i = 0; i < optionIndex; i++) {
        userEvent.keyboard("{ArrowDown}");
    }
    userEvent.keyboard("{Enter}");
};

export function getLatestCallParams(mockFn: jest.Mock) {
    return getCallParamsAt(mockFn, mockFn.mock.calls.length - 1);
}

// refer: https://stackoverflow.com/a/5624139
export function hexToRgb(hex: string) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
        : null;
}
