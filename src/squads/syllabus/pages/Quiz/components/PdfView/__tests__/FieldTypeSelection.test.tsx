import { RectTypes } from "src/squads/syllabus/models/canvas";
import { FieldTypes, QuizType } from "src/squads/syllabus/models/quiz";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import {
    createMockAnswerGroupFIB,
    createMockAnswerList,
    createMockAnswerListFIB,
    createMockModelAnswer,
} from "src/squads/syllabus/test-utils/quiz";

import FieldTypeSelection, { FieldTypeSelectionProps } from "../FieldTypeSelection";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("react-redux", () => ({
    __esModule: true,
    ...(jest.requireActual("react-redux") as object),
    useSelector: jest.fn(),
}));

//TODO: Remove when release Handwriting feature
jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: true }),
    };
});

const testCasesQuizWithOCR = [QuizType.QUIZ_TYPE_MCQ, QuizType.QUIZ_TYPE_MAQ];
const testCasesOCRWithoutAnswer = [RectTypes.IMAGE, RectTypes.TEX];

const renderUtil = (props: FieldTypeSelectionProps) => {
    return render(<FieldTypeSelection {...props} />, { wrapper: TestApp });
};

describe("<FieldTypeSelection />", () => {
    test.each(testCasesQuizWithOCR)(
        "should show OCR question, explanation, answer options when quiz type is %p",
        (quizType: QuizType) => {
            const mockOnSelect = jest.fn();
            const mockProps: FieldTypeSelectionProps = {
                quizType,
                rectType: RectTypes.TEXT,
                answers: createMockAnswerList({ quantity: 4 }),
                onSelect: mockOnSelect,
            };

            renderUtil(mockProps);

            // 1 question, 1 explanation, 4 answers
            expect(screen.getAllByRole("button")).toHaveLength(6);

            const question = screen.getByTestId("FieldTypeSelection__question"); //first option: question
            const explanation = screen.getByTestId("FieldTypeSelection__explanation"); //second option: explanation
            const answers = screen.getAllByTestId("FieldTypeSelection__answer");
            const answer1 = answers[0]; //third option: answer 1

            expect(question.textContent).toEqual("Question");
            userEvent.click(question);
            expect(getLatestCallParams(mockOnSelect)).toEqual([FieldTypes.QUESTION]);

            expect(explanation.textContent).toEqual("Explanation");
            userEvent.click(explanation);
            expect(getLatestCallParams(mockOnSelect)).toEqual([FieldTypes.EXPLANATION]);

            expect(answers.length).toEqual(mockProps.answers.length);
            expect(answer1.textContent).toEqual("Answer 1");
            userEvent.click(answer1);
            expect(getLatestCallParams(mockOnSelect)).toEqual([
                FieldTypes.ANSWER,
                mockProps.answers[0].id,
            ]);
        }
    );

    it("should hide OCR answer options when quiz type is Manual Input", () => {
        const mockOnSelect = jest.fn();
        const mockProps: FieldTypeSelectionProps = {
            quizType: QuizType.QUIZ_TYPE_MIQ,
            rectType: RectTypes.TEXT,
            answers: [createMockModelAnswer()],
            onSelect: mockOnSelect,
        };

        renderUtil(mockProps);

        // Manual Input has only question and explanation, no answer
        expect(screen.getAllByRole("button")).toHaveLength(2);

        const question = screen.getByTestId("FieldTypeSelection__question"); //first option: question
        const explanation = screen.getByTestId("FieldTypeSelection__explanation"); //second option: explanation

        userEvent.click(question);
        expect(getLatestCallParams(mockOnSelect)).toEqual([FieldTypes.QUESTION]);

        userEvent.click(explanation);
        expect(getLatestCallParams(mockOnSelect)).toEqual([FieldTypes.EXPLANATION]);
    });

    it("should show OCR answer options when choose OCR TEXT in FIB question", () => {
        const mockOnSelect = jest.fn();
        const mainAnswer = { quantity: 3, quantityAlternative: 4 };
        const answerList = createMockAnswerListFIB({ mainAnswer });
        const mockProps: FieldTypeSelectionProps = {
            quizType: QuizType.QUIZ_TYPE_FIB,
            rectType: RectTypes.TEXT,
            answers: answerList,
            onSelect: mockOnSelect,
        };

        renderUtil(mockProps);

        const numberAlternatives = mainAnswer.quantity * mainAnswer.quantityAlternative;
        const answerId1 = mockProps.answers[0].id;
        const answerId2 = mockProps.answers[mainAnswer.quantityAlternative + 1].id;

        // question, explanation, 3 answers with 4 alternatives each answer
        expect(screen.getAllByRole("button")).toHaveLength(
            2 + mainAnswer.quantity + numberAlternatives
        );

        const answers = screen.getAllByTestId("OCRSelectionAnswerFIB__answer");
        const alternatives = screen.getAllByTestId("OCRSelectionAnswerFIB__alternative");

        expect(answers.length).toEqual(mainAnswer.quantity);
        expect(alternatives.length).toEqual(numberAlternatives);

        expect(answers[0].textContent).toEqual("Answer 1");
        userEvent.click(answers[0]);
        expect(getLatestCallParams(mockOnSelect)).toEqual([FieldTypes.ANSWER, answerId1]);

        expect(answers[1].textContent).toEqual("Answer 2");
        userEvent.click(answers[1]);
        expect(getLatestCallParams(mockOnSelect)).toEqual([FieldTypes.ANSWER, answerId2]);
    });

    test.each(testCasesOCRWithoutAnswer)(
        "should hide OCR answer options when choose OCR %p in FIB question",
        (rectType: RectTypes) => {
            const answerList = createMockAnswerGroupFIB();
            const mockProps: FieldTypeSelectionProps = {
                quizType: QuizType.QUIZ_TYPE_FIB,
                rectType,
                answers: answerList,
                onSelect: () => {},
            };

            renderUtil(mockProps);

            // question, explanation, no answer
            expect(screen.getAllByRole("button")).toHaveLength(2);

            const question = screen.getByTestId("FieldTypeSelection__question"); //first option: question
            const explanation = screen.getByTestId("FieldTypeSelection__explanation"); //second option: explanation

            expect(question.textContent).toEqual("Question");
            expect(explanation.textContent).toEqual("Explanation");
        }
    );
});
