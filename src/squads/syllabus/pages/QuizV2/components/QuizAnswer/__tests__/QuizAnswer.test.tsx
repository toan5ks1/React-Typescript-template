import { MathJaxLoadStatus } from "src/common/constants/enum";

import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import QuizAnswer from "../QuizAnswer";

import { render, screen } from "@testing-library/react";
import QuizV2, { createDefaultAnswerFieldV2, QuizType } from "src/squads/syllabus/models/quizV2";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderComponent = (overrideQuiz?: Partial<QuizV2>) => {
    const quiz = createTestQuiz(overrideQuiz);
    const answer = createDefaultAnswerFieldV2(quiz.kind);
    quiz.answer = answer;

    return render(
        <TestAppWithQueryClient>
            <TestHookForm defaultValues={quiz}>
                <QuizAnswer />
            </TestHookForm>
        </TestAppWithQueryClient>
    );
};
describe(QuizAnswer.name, () => {
    beforeEach(() => {
        (useInstallMathJax as jest.Mock).mockReturnValue({
            loadStatus: MathJaxLoadStatus.LOADED,
        });
    });

    it("should render MCQ Answers", () => {
        renderComponent({
            kind: QuizType.QUIZ_TYPE_MCQ,
        });

        expect(screen.getByTestId("QuizMCQAnswer__answerList")).toBeInTheDocument();
    });

    it("should render MAQ Answers", () => {
        renderComponent({
            kind: QuizType.QUIZ_TYPE_MAQ,
        });

        expect(screen.getByTestId("QuizMAQAnswer__answerList")).toBeInTheDocument();
    });
});
