import QuizMAQAnswer from "../QuizMAQAnswer";

import { render, screen } from "@testing-library/react";
import { createDefaultAnswerFieldV2, QuizType } from "src/squads/syllabus/models/quizV2";
import TestQuizProvider, {
    TestQuizProviderProps,
} from "src/squads/syllabus/pages/QuizV2/test-utils/TestQuizProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm, { TestFormProps } from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

const quiz = createTestQuiz({
    kind: QuizType.QUIZ_TYPE_MAQ,
});
const answers = createDefaultAnswerFieldV2(quiz.kind);
quiz.answer = answers;

type RenderProps = {
    providerProps?: TestQuizProviderProps;
    hfProps?: TestFormProps;
};

const renderComponent = (props?: RenderProps) => {
    return render(
        <TestAppWithQueryClient>
            <TestQuizProvider {...props?.providerProps}>
                <TestHookForm defaultValues={quiz} {...props?.hfProps}>
                    <QuizMAQAnswer />
                </TestHookForm>
            </TestQuizProvider>
        </TestAppWithQueryClient>
    );
};

describe(QuizMAQAnswer.name, () => {
    it("should render answer list", () => {
        renderComponent();

        expect(screen.getByTestId("QuizMAQAnswer__answerList")).toBeInTheDocument();
    });

    it("should render QuizMAQAnswerItem for each answer", () => {
        renderComponent();
        const items = screen.getAllByTestId("QuizMAQAnswerItem__root");

        expect(items).toHaveLength(quiz.answer.list.length);
    });
});
