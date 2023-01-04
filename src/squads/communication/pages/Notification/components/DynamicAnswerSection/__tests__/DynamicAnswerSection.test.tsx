import { UseFormProps } from "react-hook-form";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockQuestionAnswerItems } from "src/squads/communication/test-utils/questionnaire";

import DynamicAnswerSection, {
    DynamicAnswerSectionProps,
} from "src/squads/communication/pages/Notification/components/DynamicAnswerSection/DynamicAnswerSection";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const defaultDynamicAnswerSectionFormOption: UseFormProps = {
    defaultValues: {},
};

const defaultDynamicAnswerSectionProps: DynamicAnswerSectionProps = {
    questionIndex: 0,
    minimumAnswers: 2,
    maximumAnswers: 10,
};

const renderDynamicAnswerSection = (
    dynamicAnswerSectionProps: DynamicAnswerSectionProps = defaultDynamicAnswerSectionProps,
    dynamicAnswerSectionFormOption: UseFormProps = defaultDynamicAnswerSectionFormOption
) => {
    return render(
        <TestApp>
            <TestHookFormProvider useFormOptions={dynamicAnswerSectionFormOption}>
                <DynamicAnswerSection {...dynamicAnswerSectionProps} />
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<DynamicAnswerSection />", () => {
    it("should render 1 Add Answer button, 2 deleteButtons and 2 answer inputs", () => {
        const questions = createMockQuestionAnswerItems({
            numberOfQuestions: 1,
            numberOfAnswer: 2,
        });

        renderDynamicAnswerSection(
            { questionIndex: 0 },
            {
                defaultValues: {
                    questionFieldArrayItem: questions,
                },
            }
        );

        const dynamicAnswerSectionContainer = screen.getByTestId("DynamicAnswerSection__root");

        expect(dynamicAnswerSectionContainer).toBeInTheDocument();

        expect(within(dynamicAnswerSectionContainer).getByText("Add Answer")).toBeInTheDocument();

        expect(
            within(dynamicAnswerSectionContainer).getAllByTestId("AnswerItem__buttonDeleteAnswer")
        ).toHaveLength(2);

        const allAnswerInputs = within(dynamicAnswerSectionContainer).getAllByTestId(
            "AnswerItem__inputAnswer"
        );

        allAnswerInputs.forEach((answerInput, index) => {
            expect(answerInput).toBeInTheDocument();
            expect(answerInput).toHaveValue(questions[0].answerFieldArrayItem[index].content);
        });
    });

    it("should disable and enable delete answer accordingly", () => {
        const questions = createMockQuestionAnswerItems({
            numberOfQuestions: 1,
            numberOfAnswer: 2,
        });

        renderDynamicAnswerSection(defaultDynamicAnswerSectionProps, {
            defaultValues: {
                questionFieldArrayItem: questions,
            },
        });

        const allDeleteButtonWithTwoAnswers = screen.getAllByTestId(
            "AnswerItem__buttonDeleteAnswer"
        );

        expect(allDeleteButtonWithTwoAnswers).toHaveLength(2);

        allDeleteButtonWithTwoAnswers.forEach((button) => {
            expect(button).toBeDisabled();
        });

        userEvent.click(screen.getByText("Add Answer"));

        const allDeleteButtonWithThreeAnswers = screen.getAllByTestId(
            "AnswerItem__buttonDeleteAnswer"
        );

        expect(allDeleteButtonWithThreeAnswers).toHaveLength(3);

        allDeleteButtonWithThreeAnswers.forEach((button) => {
            expect(button).toBeEnabled();
        });

        userEvent.click(allDeleteButtonWithThreeAnswers[0]);

        const finalAllDeleteButtons = screen.getAllByTestId("AnswerItem__buttonDeleteAnswer");

        expect(finalAllDeleteButtons).toHaveLength(2);

        finalAllDeleteButtons.forEach((button) => {
            expect(button).toBeDisabled();
        });
    });

    it("should hide add answer button when equal maximum answer number", () => {
        const questions = createMockQuestionAnswerItems({
            numberOfQuestions: 1,
            numberOfAnswer: 9,
        });

        renderDynamicAnswerSection(defaultDynamicAnswerSectionProps, {
            defaultValues: {
                questionFieldArrayItem: questions,
            },
        });

        // Add last answer
        userEvent.click(screen.getByText("Add Answer"));

        expect(screen.queryByText("Add Answer")).not.toBeInTheDocument();
    });

    it("should disable delete buttons when equal minimum answer number", () => {
        const questions = createMockQuestionAnswerItems({
            numberOfQuestions: 1,
            numberOfAnswer: 3,
        });

        renderDynamicAnswerSection(defaultDynamicAnswerSectionProps, {
            defaultValues: {
                questionFieldArrayItem: questions,
            },
        });

        // Remove last answer
        userEvent.click(screen.getAllByTestId("AnswerItem__buttonDeleteAnswer")[2]);

        const deleteButtons = screen.getAllByTestId("AnswerItem__buttonDeleteAnswer");

        deleteButtons.forEach((deleteButton) => {
            expect(deleteButton).toBeDisabled();
        });
    });
});
