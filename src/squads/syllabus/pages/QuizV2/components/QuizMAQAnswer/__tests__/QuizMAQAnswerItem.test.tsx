import { MathJaxLoadStatus } from "src/common/constants/enum";

import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import QuizMAQAnswerItem, { QuizMAQAnswerItemProps } from "../QuizMAQAnswerItem";

import { render, screen } from "@testing-library/react";
import { createDefaultAnswerFieldV2, QuizType } from "src/squads/syllabus/models/quizV2";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const quiz = createTestQuiz({
    kind: QuizType.QUIZ_TYPE_MAQ,
});
const answers = createDefaultAnswerFieldV2(quiz.kind);
quiz.answer = answers;

const onRemove = jest.fn();

const renderComponent = (props?: Partial<QuizMAQAnswerItemProps>) => {
    return render(
        <TestAppWithQueryClient>
            <TestHookForm defaultValues={quiz}>
                <QuizMAQAnswerItem
                    answer={quiz.answer.list[0]}
                    itemIndex={0}
                    onRemove={onRemove}
                    answersCount={quiz.answer.list.length}
                    {...props}
                />
            </TestHookForm>
        </TestAppWithQueryClient>
    );
};

describe(QuizMAQAnswerItem.name, () => {
    beforeEach(() => {
        (useInstallMathJax as jest.Mock).mockReturnValue({
            loadStatus: MathJaxLoadStatus.LOADED,
        });
    });
    it("should render checkbox", () => {
        renderComponent();

        expect(screen.getByTestId("QuizMAQAnswerItem__checkbox")).toBeInTheDocument();
    });

    it("should render editor", () => {
        renderComponent();

        expect(screen.getByTestId("QuizMAQAnswerItem__editor")).toBeInTheDocument();
    });
});
