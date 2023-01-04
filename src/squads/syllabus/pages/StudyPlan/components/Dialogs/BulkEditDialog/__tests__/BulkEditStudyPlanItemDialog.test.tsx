import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import BulkEditStudyPlanItemDialog, {
    BulkEditStudyPlanItemDialogProps,
} from "../BulkEditStudyPlanItemDialog";

import {
    render,
    screen,
    RenderResult,
    fireEvent,
    findByText,
    waitFor,
    findByRole,
} from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const handleUpdateDateTime = jest.fn();
const handlePostponeAdvanceDate = jest.fn();
const handleClose = jest.fn();

afterAll(() => {
    jest.clearAllMocks();
});

const dialogContexts: Required<BulkEditStudyPlanItemDialogProps>["dialogContext"][] = [
    { label: "Available From", fieldName: "availableFrom" },
    { label: "Available Until", fieldName: "availableTo" },
    { label: "Start Date", fieldName: "startDate" },
    { label: "Due Date", fieldName: "endDate" },
];

const renderComponent = (
    enableFeature?: boolean,
    dialogContext?: BulkEditStudyPlanItemDialogProps["dialogContext"]
) => {
    (useFeatureToggle as jest.Mock).mockImplementation(() => {
        return {
            isEnabled: enableFeature,
        };
    });

    return render(
        <TestTranslationProvider>
            <MuiPickersUtilsProvider>
                <TestThemeProvider>
                    <BulkEditStudyPlanItemDialog
                        open={true}
                        onClose={handleClose}
                        onUpdateDateTime={handleUpdateDateTime}
                        onPostponeAdvance={handlePostponeAdvanceDate}
                        dialogContext={dialogContext}
                    />
                </TestThemeProvider>
            </MuiPickersUtilsProvider>
        </TestTranslationProvider>
    );
};

describe(BulkEditStudyPlanItemDialog.name, () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = renderComponent(false);
    });
    it("should render correctly with date and time picker input field", () => {
        const { baseElement } = wrapper;

        expect(baseElement.querySelector("[name=bulkEditDate]")).toBeInTheDocument();
        expect(baseElement.querySelector("[name=bulkEditTime]")).toBeInTheDocument();

        const dialogSaveButton = screen.getByTestId(/__buttonSave/i);
        expect(dialogSaveButton).toBeInTheDocument();
    });

    it("should disable timepicker when no date is filled", () => {
        const timeAutoComplete = screen.getByRole(/combobox/i);
        expect(timeAutoComplete).toBeDisabled();
    });

    it("should enable timepicker when date is filled", () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const _month = month >= 9 ? month + 1 : "0" + (month + 1);
        const SELECT_DATE_TARGET = "20";
        const EXPECTED_DATE_RENDER = `${year}/${_month}/${SELECT_DATE_TARGET}`;

        const timeAutoComplete = screen.getByRole(/combobox/i);

        const inputDate = screen.getByTestId("DatePickerHF__input");
        fireEvent.click(inputDate);

        const selectDate = screen.getByText(SELECT_DATE_TARGET);
        fireEvent.click(selectDate, { selector: "button" });

        const buttonOK = screen.getByRole("button", { name: /OK/i });

        fireEvent.click(buttonOK as HTMLButtonElement);

        expect(inputDate).toHaveValue(EXPECTED_DATE_RENDER);

        expect(timeAutoComplete).toBeEnabled();
    });
});

const year = new Date().getFullYear();
const month = new Date().getMonth();
const _month = month >= 9 ? month + 1 : "0" + (month + 1);
const SELECT_DATE_TARGET = "20";
const EXPECTED_DATE_RENDER = `${year}/${_month}/${SELECT_DATE_TARGET}`;

const bulkEditActionWithDefaultTime = async () => {
    const inputDate = screen.getByTestId("DatePickerHF__input");
    fireEvent.click(inputDate);
    const dialogDatePicker = screen.getByLabelText("DatePickerHF__dialog");

    const selectDate = await findByText(dialogDatePicker, SELECT_DATE_TARGET);
    fireEvent.click(selectDate, { selector: "button" });

    const buttonOK: HTMLButtonElement = await findByRole(dialogDatePicker, "button", {
        name: /OK/i,
    });
    fireEvent.click(buttonOK);

    await waitFor(() => {
        expect(inputDate).toHaveValue(EXPECTED_DATE_RENDER);
    });

    const saveButton = screen.getByTestId(/__buttonSave/i);

    fireEvent.click(saveButton);
};

describe(`${BulkEditStudyPlanItemDialog.name} date time fields`, () => {
    it("should save default time as null when date and time is empty", async () => {
        renderComponent(false, dialogContexts[0]);

        const saveButton = screen.getByTestId(/__buttonSave/i);

        fireEvent.click(saveButton);
        await waitFor(() => {
            expect(handleUpdateDateTime).toHaveBeenCalledWith(null);
        });

        expect(handleClose).toHaveBeenCalled();
    });

    it("should update field Available From with default time", async () => {
        renderComponent(false, dialogContexts[0]);
        await bulkEditActionWithDefaultTime();
        await waitFor(() => {
            expect(handleUpdateDateTime).toHaveBeenCalledWith(`${EXPECTED_DATE_RENDER}, 00:00`);
        });
    });

    it("should update field Start Date with default time", async () => {
        renderComponent(false, dialogContexts[2]);
        await bulkEditActionWithDefaultTime();

        await waitFor(() => {
            expect(handleUpdateDateTime).toHaveBeenCalledWith(`${EXPECTED_DATE_RENDER}, 00:00`);
        });
    });

    it("should update field Available Until with default time", async () => {
        renderComponent(false, dialogContexts[1]);
        await bulkEditActionWithDefaultTime();

        await waitFor(() => {
            expect(handleUpdateDateTime).toHaveBeenCalledWith(`${EXPECTED_DATE_RENDER}, 23:59`);
        });
    });

    it("should update field Due Date with default time", async () => {
        renderComponent(false, dialogContexts[3]);
        await bulkEditActionWithDefaultTime();

        await waitFor(() => {
            expect(handleUpdateDateTime).toHaveBeenCalledWith(`${EXPECTED_DATE_RENDER}, 23:59`);
        });
    });

    it("should update both time and date field", async () => {
        renderComponent(false, dialogContexts[0]);

        const inputDate = screen.getByTestId("DatePickerHF__input");
        fireEvent.click(inputDate);
        const dialogDatePicker = screen.getByLabelText("DatePickerHF__dialog");

        const selectDate = await findByText(dialogDatePicker, SELECT_DATE_TARGET);
        fireEvent.click(selectDate, { selector: "button" });

        const buttonOK: HTMLButtonElement = await findByRole(dialogDatePicker, "button", {
            name: /OK/i,
        });
        fireEvent.click(buttonOK);

        await waitFor(() => {
            expect(inputDate).toHaveValue(EXPECTED_DATE_RENDER);
        });

        const inputTime = "12:12";

        const autoCompleteInput: HTMLInputElement = screen.getByTestId("AutocompleteBase__input");
        autoCompleteInput.focus();
        fireEvent.change(autoCompleteInput, { target: { value: inputTime } });
        const options = screen.getAllByTestId("AutocompleteBase__option");

        fireEvent.click(options[0]);

        await waitFor(() => {
            expect(autoCompleteInput).toHaveValue(inputTime);
        });

        const saveButton = screen.getByTestId(/__buttonSave/i);

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(handleUpdateDateTime).toHaveBeenCalledWith(
                `${EXPECTED_DATE_RENDER}, ${inputTime}`
            );
        });
    });
});

describe(`${BulkEditStudyPlanItemDialog.name} postpone and advance`, () => {
    it("should add date when postpone update", async () => {
        renderComponent(true, dialogContexts[0]);

        const postponeTab = screen.getByRole("tab", { name: /postpone/i });
        fireEvent.click(postponeTab);
        const postponeInput = screen.getByTestId(/postponeInput/i);

        fireEvent.change(postponeInput, { target: { value: 7 } });

        const saveButton = screen.getByTestId(/__buttonSave/i);

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(handlePostponeAdvanceDate).toHaveBeenCalledWith("postpone", "7");
        });
    });

    it("should reduce date when advance update", async () => {
        renderComponent(true, dialogContexts[0]);

        const advanceTab = screen.getByRole("tab", { name: /advance/i });
        fireEvent.click(advanceTab);

        const advanceInput = screen.getByTestId(/advanceInput/i);
        fireEvent.change(advanceInput, { target: { value: 7 } });

        const saveButton = screen.getByTestId(/__buttonSave/i);

        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(handlePostponeAdvanceDate).toHaveBeenCalledWith("advance", "7");
        });
    });
});
