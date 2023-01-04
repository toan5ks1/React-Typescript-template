import { fireEvent, screen, waitFor, within } from "@testing-library/react";
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
 * @param autocompleteInputId id of autocomplete input
 * @param autocompleteInputValue value of autocomplete input
 * @param index the index of option
 */
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
