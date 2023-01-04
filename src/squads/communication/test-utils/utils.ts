import { DateTime } from "luxon";
import { dateIsAfter, formatDate } from "src/common/utils/time";

import { getDateAfterDuration } from "./../common/utils/utils";

import { fireEvent, getByRole, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * check the dialog open when clicking action button (search, add button)
 * @param testIdTable test id of table
 * @param dialogTitle the title of dialog
 * @param testIdButton test id of button
 */
export const checkOpenDialogWhenClickActionButton = (
    testIdTable: string,
    dialogTitle: string,
    testIdButton: string
) => {
    const openDialogButton = within(screen.getByTestId(testIdTable)).getByTestId(
        testIdButton
    ) as HTMLButtonElement;
    userEvent.click(openDialogButton);
    const actionDialog = screen.getByTestId("DialogWithHeaderFooter_wrapper");

    expect(actionDialog).toBeInTheDocument();
    expect(screen.getByTitle(dialogTitle)).toBeInTheDocument();

    const cancelDialogButton = within(actionDialog).getByTestId(
        "FooterDialogConfirm__buttonClose"
    ) as HTMLButtonElement;
    // close dialog
    userEvent.click(cancelDialogButton);
};

/**
 * check the dialog close when click cancel button or close icon
 * @param testIdButton test id of button
 * @param onClose the onClose function
 */
export const checkCloseUpsertDialog = (testIdButton: string, onClose: () => void) => {
    const closeDialogButton = screen.getByTestId(testIdButton);
    userEvent.click(closeDialogButton);
    const dialogConfirm = screen.getByTestId("DialogWithHeaderFooter_wrapper");
    expect(dialogConfirm).toBeInTheDocument();

    const saveConfirmButton = within(dialogConfirm).getByTestId(
        "FooterDialogConfirm__buttonSave"
    ) as HTMLButtonElement;
    userEvent.click(saveConfirmButton);
    expect(onClose).toBeCalled();
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

/**
 * change value of text input
 * @param testIdTextInput test id of text input
 * @param textInputValue value of text input
 */
export const changeTextInput = (testIdTextInput: string, textInputValue: string) => {
    const textInput = screen.getByTestId(testIdTextInput) as HTMLInputElement;
    userEvent.type(textInput, textInputValue);
};

/**
 * change value of auto complete input
 * @param autocompleteTestId data test id of autocomplete input
 * @param autocompleteValue value of autocomplete input
 */
export const changeAutocompleteValue = (autocompleteTestId: string, autocompleteValue: string) => {
    const autocompleteInput = within(screen.getByTestId(autocompleteTestId)).getByRole("combobox", {
        hidden: true,
    });
    userEvent.type(autocompleteInput, autocompleteValue);
    userEvent.keyboard("{ArrowDown}");
    userEvent.keyboard("{Enter}");
};

/**
 * change value of editor content
 * @param testIdEditor test id of editor
 * @param editorContent the value of editor content
 */
export const changeEditorContent = (testIdEditor: string, editorContent: string) => {
    const editor = screen.getByTestId(testIdEditor);

    fireEvent.paste(editor, {
        clipboardData: {
            types: ["text/plain"],
            getData: () => editorContent,
        },
    });
};

/**
 * change value of the select component
 * @param selectContainerTestId test id of the select component
 * @param value the value you want to change to in the dropdown
 */
export const changeSelectValue = (selectContainerTestId: string, value: string) => {
    const selectContainer = screen.getByTestId(selectContainerTestId);

    const selectElement = getByRole(selectContainer, "button");
    userEvent.click(selectElement);

    const selectChoice = screen.getByText(value);
    userEvent.click(selectChoice);
};

/**
 * change value of the date picker
 * @param datePickerTestId test id of the date picker
 * @param datePickerValue value of the date picker
 */
export const changeDatePicker = (
    datePickerTestId: string,
    datePickerValue: Date,
    defaultDatePickerValue: Date = getDateAfterDuration(0)
) => {
    const dateInput = within(screen.getByTestId(datePickerTestId)).getByTestId(
        "DatePickerHF__input"
    );

    userEvent.click(dateInput);

    if (dateIsAfter(datePickerValue, defaultDatePickerValue, "month")) {
        const nextMonthButton = screen.getByRole("button", {
            name: /next month/i,
        });
        userEvent.click(nextMonthButton);
    } else if (dateIsAfter(defaultDatePickerValue, datePickerValue, "month")) {
        const previousMonthButton = screen.getByRole("button", { name: /previous month/i });
        userEvent.click(previousMonthButton);
    }

    const convertedDate = DateTime.fromJSDate(datePickerValue).toLocaleString(DateTime.DATE_MED);
    const chosenDate = screen.getByRole("button", {
        name: convertedDate,
    });

    userEvent.click(chosenDate);
    userEvent.click(screen.getByRole("button", { name: /ok/i }));

    expect(dateInput).toHaveValue(formatDate(datePickerValue, "yyyy/LL/dd"));
};
