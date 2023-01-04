import { useFormContext } from "react-hook-form";
import {
    getAutocompleteInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import AutocompleteTimeOfDayHF from "src/squads/lesson/components/Autocompletes/AutocompleteTimeOfDayHF";
import FormSectionLessonTime from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonTime/FormSectionLessonTime";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
    };
});

const mockClearErrorHookForm = jest.fn();

const renderComponent = () => {
    (useFormContext as jest.Mock).mockImplementation(() => {
        return {
            clearErrors: mockClearErrorHookForm,
        };
    });

    render(
        <TestHookFormProvider>
            <FormSectionLessonTime
                render={({ totalTimeByMinutes, validateRules }) => {
                    return (
                        <>
                            <AutocompleteTimeOfDayHF
                                name="startTimeAutocomplete"
                                getOptionSelectedField="value"
                                rules={validateRules.startTime}
                                data-testid="StartTime"
                            />

                            <AutocompleteTimeOfDayHF
                                name="endTimeAutocomplete"
                                getOptionSelectedField="value"
                                rules={validateRules.endTime}
                                data-testid="EndTime"
                            />

                            <p>{`${totalTimeByMinutes} minutes`}</p>
                        </>
                    );
                }}
            />
        </TestHookFormProvider>
    );

    const startTimeInput = getAutocompleteInputByTestId("StartTime");
    const endTimeInput = getAutocompleteInputByTestId("EndTime");

    const submitForm = () => {
        const submitInput = screen.getByTestId("TextFieldHF__submit");
        userEvent.click(submitInput);
    };

    const selectInvalidLessonTime = () => {
        userEvent.click(startTimeInput);
        selectAutocompleteOptionByLabel("01:00");

        userEvent.click(endTimeInput);
        selectAutocompleteOptionByLabel("00:30");
    };

    return {
        startTimeInput,
        endTimeInput,
        submitForm,
        selectInvalidLessonTime,
    };
};

describe("FormSectionLessonTime", () => {
    const errorMessage = "resources.input.error.timeMustComeBefore";

    it("should show alert message when submitting with indefinite time", async () => {
        const { submitForm, startTimeInput, endTimeInput } = renderComponent();

        submitForm();

        const errorMessages = await screen.findAllByText(errorMessage);
        expect(errorMessages).toHaveLength(2);
        expect(screen.getByText("0 minutes")).toBeInTheDocument();

        userEvent.click(startTimeInput);
        selectAutocompleteOptionByLabel("00:30");

        userEvent.click(endTimeInput);
        selectAutocompleteOptionByLabel("01:00");

        await waitFor(() => expect(mockClearErrorHookForm).toBeCalled());
        expect(screen.getByText("30 minutes")).toBeInTheDocument();
    });

    it("should validate lesson time when changing start time", async () => {
        const { selectInvalidLessonTime, submitForm, startTimeInput } = renderComponent();

        selectInvalidLessonTime();
        submitForm();

        const errorMessages = await screen.findAllByText(errorMessage);
        expect(errorMessages).toHaveLength(2);
        expect(screen.getByText("0 minutes")).toBeInTheDocument();

        userEvent.click(startTimeInput);
        selectAutocompleteOptionByLabel("00:00");

        await waitFor(() => expect(mockClearErrorHookForm).toBeCalledWith("endTimeAutocomplete"));
        expect(screen.getByText("30 minutes")).toBeInTheDocument();
    });

    it("should validate lesson time when changing end time", async () => {
        const { selectInvalidLessonTime, submitForm, endTimeInput } = renderComponent();

        selectInvalidLessonTime();
        submitForm();

        const errorMessages = await screen.findAllByText(errorMessage);
        expect(errorMessages).toHaveLength(2);
        expect(screen.getByText("0 minutes")).toBeInTheDocument();

        userEvent.click(endTimeInput);
        selectAutocompleteOptionByLabel("01:30");

        await waitFor(() => expect(mockClearErrorHookForm).toBeCalledWith("startTimeAutocomplete"));
        expect(screen.getByText("30 minutes")).toBeInTheDocument();
    });
});
