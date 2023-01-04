import { UseFormProps } from "react-hook-form";
import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockQuestionAnswerItems } from "src/squads/communication/test-utils/questionnaire";
import { changeSelectValue } from "src/squads/communication/test-utils/utils";

import QuestionSection, { QuestionSectionProps } from "../QuestionSection";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const onDeleteQuestion = jest.fn();

const defaultQuestionSectionProps: QuestionSectionProps = {
    questionIndex: 0,
    questionType: KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE,
    onDeleteQuestion,
    minimumAnswers: 2,
    maximumAnswers: 10,
};

const mockUseFormOptions: UseFormProps<Partial<NotificationFormData>> = {
    defaultValues: {
        questionFieldArrayItem: createMockQuestionAnswerItems({
            numberOfQuestions: 1,
            numberOfAnswer: 2,
        }),
    },
};

const renderQuestionSection = (props: QuestionSectionProps = defaultQuestionSectionProps) => {
    return render(
        <TestApp>
            <TestHookFormProvider useFormOptions={mockUseFormOptions}>
                <QuestionSection {...props} />
            </TestHookFormProvider>
        </TestApp>
    );
};

describe("<QuestionSection /> Render question section", () => {
    it("should render question section", () => {
        renderQuestionSection();

        const questionTitle = `Question ${defaultQuestionSectionProps.questionIndex + 1}`;

        expect(screen.getByTestId("QuestionSection__root")).toBeInTheDocument();

        expect(screen.getByTestId("QuestionSection__questionTitle")).toBeInTheDocument();
        expect(screen.getByTestId("QuestionSection__questionTitle")).toHaveTextContent(
            questionTitle
        );
        expect(screen.getByTestId("QuestionSection__buttonDeleteQuestion")).toBeInTheDocument();
        expect(screen.getByTestId("QuestionSection__inputQuestion")).toBeInTheDocument();

        expect(screen.getByTestId("SwitchLabelHF__label")).toHaveTextContent("Required");
        expect(screen.getByTestId("QuestionSection__switchRequiredQuestion")).toBeInTheDocument();

        const questionType = screen.getByTestId("QuestionSection__selectQuestionType");

        expect(questionType).toHaveTextContent("Question Type");
        expect(screen.getByText("Multiple Choice")).toBeInTheDocument();

        expect(questionType).toBeInTheDocument();
    });

    it("should call onDeleteQuestion function when click delete icon button", () => {
        renderQuestionSection();

        userEvent.click(screen.getByTestId("QuestionSection__buttonDeleteQuestion"));

        expect(onDeleteQuestion).toBeCalledTimes(1);
    });

    it("should show and hide answer section accordingly to questionType", () => {
        const mockDataWithQuestionTypeIsShortAnswer = {
            questionIndex: 0,
            questionType: KeyQuestionTypes.QUESTION_TYPE_FREE_TEXT,
            onDeleteQuestion,
            minimumAnswers: 2,
            maximumAnswers: 10,
        };

        renderQuestionSection(mockDataWithQuestionTypeIsShortAnswer);

        //Check hide the answer section when initial question type of question section is Short Answer
        expect(screen.queryByTestId("DynamicAnswerSection__root")).not.toBeInTheDocument();

        changeSelectValue("QuestionSection__selectQuestionType", "Checkbox");
        expect(screen.getByTestId("DynamicAnswerSection__root")).toBeInTheDocument();

        changeSelectValue("QuestionSection__selectQuestionType", "Multiple Choice");
        expect(screen.getByTestId("DynamicAnswerSection__root")).toBeInTheDocument();

        changeSelectValue("QuestionSection__selectQuestionType", "Short Answer");
        expect(screen.queryByTestId("DynamicAnswerSection__root")).not.toBeInTheDocument();
    });
});
