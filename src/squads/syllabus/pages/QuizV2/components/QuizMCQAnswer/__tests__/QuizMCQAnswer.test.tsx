import QuizMCQAnswer from "../QuizMCQAnswer";

import { render, screen } from "@testing-library/react";
import { createDefaultAnswerFieldV2, QuizType } from "src/squads/syllabus/models/quizV2";
import TestQuizProvider from "src/squads/syllabus/pages/QuizV2/test-utils/TestQuizProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

const quiz = createTestQuiz({
    kind: QuizType.QUIZ_TYPE_MCQ,
});
const answers = createDefaultAnswerFieldV2(quiz.kind);
quiz.answer = answers;

const renderComponent = () => {
    return render(
        <TestAppWithQueryClient>
            <TestQuizProvider>
                <TestHookForm defaultValues={quiz}>
                    <QuizMCQAnswer />
                </TestHookForm>
            </TestQuizProvider>
        </TestAppWithQueryClient>
    );
};

describe(QuizMCQAnswer.name, () => {
    it("should render answer list", () => {
        renderComponent();

        expect(screen.getByTestId("QuizMCQAnswer__answerList")).toBeInTheDocument();
    });

    it("should render QuizMCQAnswerItem for each answer", () => {
        renderComponent();
        const items = screen.getAllByTestId("QuizMCQAnswerItem__root");

        expect(items.length).toBe(quiz.answer.list.length);
    });
});
