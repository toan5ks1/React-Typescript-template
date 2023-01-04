import { waitFor, screen, within, findByText, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export function getCallTimes(mockFn: jest.Mock) {
    return mockFn.mock.calls.length;
}

export function getLatestCallParams(mockFn: jest.Mock) {
    return getCallParamsAt(mockFn, mockFn.mock.calls.length - 1);
}

export function getCallParamsAt(mockFn: jest.Mock, index: number) {
    if (index > mockFn.mock.calls.length - 1) {
        //eslint-disable-next-line no-console
        console.error("Invalid index, current max index is %s", mockFn.mock.calls.length);
        return;
    }

    return mockFn.mock.calls[index];
}

export const getAutocompleteInputByTestId = (autocompleteWrapperTestId: string) => {
    const autocompleteWrapper = screen.getByTestId(autocompleteWrapperTestId);
    const autocompleteInput = within(autocompleteWrapper).getByRole("combobox");
    expect(autocompleteWrapper).toBeInTheDocument();
    expect(autocompleteInput).toBeInTheDocument();

    return { autocompleteInput, autocompleteWrapper };
};

/**
 * change value of auto complete input
 * @param autocompleteInputTestId test id of autocomplete input
 * @param autocompleteInputValue value of autocomplete input
 * @param index the index of option
 */
export const changeAutocompleteInput = (
    autocompleteInputTestId: string,
    autocompleteInputValue: string,
    optionIndex: number = 1
) => {
    const autocompleteInput = screen.getByTestId(autocompleteInputTestId) as HTMLInputElement;
    userEvent.type(autocompleteInput, autocompleteInputValue);
    for (let i = 0; i < optionIndex; i++) {
        userEvent.keyboard("{ArrowDown}");
    }
    userEvent.keyboard("{Enter}");
};
/**
 * check error message in form
 * @param numberOfErrorMessage the number of error message
 * @param errorMessage the error message
 */
export const checkErrorMessage = async (numberOfErrorMessage: number, errorMessage: string) => {
    await waitFor(() => {
        const allErrorText = screen.queryAllByText(errorMessage);
        expect(allErrorText).toHaveLength(numberOfErrorMessage);
        allErrorText.forEach((el) => {
            expect(el).toBeInTheDocument();
        });
    });
};

export const selectDatePicker = async (
    wrapper: RenderResult,
    dataTestId: string | HTMLElement,
    selectDay: number
) => {
    const datePicker =
        typeof dataTestId === "string" ? wrapper.getByTestId(dataTestId) : dataTestId;
    expect(datePicker).toBeInTheDocument();

    // Open date picker dialog
    const buttonDatePicker = datePicker.querySelector("button");
    const inputDatePicker = within(datePicker).getByRole("textbox") as HTMLInputElement;
    userEvent.click(buttonDatePicker as HTMLButtonElement);
    const dialogDatePicker = document.body.querySelector("div[role=dialog]");
    expect(dialogDatePicker).toBeInTheDocument();

    // Select date
    if (dialogDatePicker) {
        const selectDate = await findByText(dialogDatePicker as HTMLElement, `${selectDay}`);
        userEvent.click(selectDate as HTMLButtonElement);
    }

    // Click Ok button
    const buttonOK = await findByText(dialogDatePicker as HTMLElement, "OK");
    userEvent.click(buttonOK as HTMLButtonElement);
    expect(inputDatePicker?.value).toContain(`${selectDay}`);

    await waitFor(() => expect(dialogDatePicker).not.toBeInTheDocument());
};
