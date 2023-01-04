import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

/**
 * change value of text input
 * @param testIdTextInput test id of text input
 * @param textInputValue value of text input
 */
export const changeTextInput = (testIdTextInput: string, textInputValue: string) => {
    const textInput = screen.getByTestId(testIdTextInput) as HTMLInputElement;
    userEvent.type(textInput, textInputValue);
};

export const createArrayNumber = (length: number) => Array.from(Array(length).keys());
