import { UseFormProps } from "react-hook-form";
import { formatDate } from "src/common/utils/time";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockEmptyNotificationFormData } from "src/squads/communication/test-utils/notification";
import { createMockQuestionAnswerItems } from "src/squads/communication/test-utils/questionnaire";

import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import DynamicQuestionSection from "../DynamicQuestionSection";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const dynamicQuestionSectionFormOption: UseFormProps = {
    defaultValues: {},
};

const renderDynamicQuestionSection = (
    questionSectionFormOption: UseFormProps = dynamicQuestionSectionFormOption
) => {
    return render(
        <TestApp>
            <TestHookFormProvider useFormOptions={questionSectionFormOption}>
                <MuiPickersUtilsProvider>
                    <DynamicQuestionSection />
                </MuiPickersUtilsProvider>
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<DynamicQuestionSection />", () => {
    it("should render add question button", () => {
        renderDynamicQuestionSection();

        expect(screen.getByTestId("DynamicQuestionSection__root")).toBeInTheDocument();
        expect(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion")).toBeInTheDocument();
    });

    it("should show question section when click add question button", () => {
        renderDynamicQuestionSection();

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        expect(screen.getByTestId("DynamicQuestionSection__questionSection")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("QuestionSection__buttonDeleteQuestion"));

        expect(
            screen.queryByTestId("DynamicQuestionSection__questionSection")
        ).not.toBeInTheDocument();
    });

    it("should hide add question button when there are 10 questions was added", () => {
        const questionSectionFormValue = createMockQuestionAnswerItems({
            numberOfQuestions: 10,
            numberOfAnswer: 2,
        });

        renderDynamicQuestionSection({
            defaultValues: {
                questionFieldArrayItem: questionSectionFormValue,
            },
        });

        const questionSections = screen.getAllByTestId("DynamicQuestionSection__questionSection");

        questionSections.forEach((questionSection, questionIndex) => {
            expect(
                within(questionSection).getByTestId("QuestionSection__inputQuestion")
            ).toHaveValue(questionSectionFormValue[questionIndex].content);
        });

        expect(questionSections).toHaveLength(questionSectionFormValue.length);
        expect(
            screen.queryByTestId("DynamicQuestionSection__buttonAddQuestion")
        ).not.toBeInTheDocument();
    });

    it("should show expiration date, expiration time and switch allow resubmission correctly when first click add question button", () => {
        renderDynamicQuestionSection({
            defaultValues: {
                expirationDate: createMockEmptyNotificationFormData().expirationDate,
                expirationTime: createMockEmptyNotificationFormData().expirationTime,
                isAllowResubmission: createMockEmptyNotificationFormData().isAllowResubmission,
            },
        });

        expect(
            screen.queryByTestId("DynamicQuestionSection__switchAllowResubmission")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("DynamicQuestionSection__datePickerExpiration")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("TimePickerAutocompleteHF__autocomplete")
        ).not.toBeInTheDocument();

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        expect(
            screen.getByTestId("DynamicQuestionSection__switchAllowResubmission")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("DynamicQuestionSection__datePickerExpiration")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("DynamicQuestionSection__timePickerExpiration")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("DynamicQuestionSection__switchAllowResubmission")
        ).toHaveTextContent("Allow Resubmission");
        expect(screen.getByLabelText("Expiration Time")).toBeInTheDocument();
        expect(screen.getByLabelText("Expiration Date")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("QuestionSection__buttonDeleteQuestion"));

        expect(
            screen.queryByTestId("DynamicQuestionSection__switchAllowResubmission")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("DynamicQuestionSection__datePickerExpiration")
        ).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("TimePickerAutocompleteHF__autocomplete")
        ).not.toBeInTheDocument();
    });

    it("should render correctly default value of expiration date, expiration time and switch allow resubmission", () => {
        renderDynamicQuestionSection({
            defaultValues: {
                expirationDate: createMockEmptyNotificationFormData().expirationDate,
                expirationTime: createMockEmptyNotificationFormData().expirationTime,
                isAllowResubmission: createMockEmptyNotificationFormData().isAllowResubmission,
            },
        });

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        // case default value: Add 7 days
        expect(screen.getByTestId("DatePickerHF__input")).toHaveValue(
            formatDate(
                createMockEmptyNotificationFormData().expirationDate || new Date(),
                "yyyy/LL/dd"
            )
        );
        expect(screen.getByTestId("AutocompleteBase__input")).toHaveValue(
            createMockEmptyNotificationFormData().expirationTime!.label
        );

        const switchAllowResubmission = screen.getByTestId(
            "DynamicQuestionSection__switchAllowResubmission"
        );

        expect(switchAllowResubmission).toBeInTheDocument();

        userEvent.click(switchAllowResubmission);

        expect(switchAllowResubmission.querySelector(".Mui-checked")).not.toBeNull();
    });

    it("should have multiple choice question type by default", () => {
        renderDynamicQuestionSection();

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        expect(screen.getByTestId("DynamicQuestionSection__questionSection")).toBeInTheDocument();

        const questionType = screen.getByTestId("QuestionSection__selectQuestionType");
        expect(questionType).toHaveTextContent("Question Type");
        expect(screen.getByText("Multiple Choice")).toBeInTheDocument();
    });
});
