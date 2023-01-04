import QuizAnswerList, { WithAnswerProps } from "../QuizAnswerList";

import { fireEvent, render, screen } from "@testing-library/react";
import { createDefaultAnswerFieldV2 } from "src/squads/syllabus/models/quizV2";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const quiz = createTestQuiz();
const answer = createDefaultAnswerFieldV2(quiz.kind);
quiz.answer = answer;

const itemRenderer = ({ onRemove, itemIndex }: WithAnswerProps) => (
    <button data-testid="QuizAnswerList__btnTestDelete" onClick={() => onRemove(itemIndex)}>
        Delete
    </button>
);

const renderComponent = () => {
    return render(
        <TestAppWithQueryClient>
            <TestHookForm defaultValues={quiz}>
                <QuizAnswerList renderItem={itemRenderer} />
            </TestHookForm>
        </TestAppWithQueryClient>
    );
};

describe(QuizAnswerList.name, () => {
    it(`should render ${quiz.answer.list.length} items`, () => {
        renderComponent();
        const answers = screen.getAllByTestId("QuizAnswerList__item");

        expect(answers.length).toBe(quiz.answer.list.length);
    });

    it("should render add answer button", () => {
        renderComponent();
        expect(screen.getByTestId("QuizAnswerList__btnAddAnswer")).toBeInTheDocument();
    });

    it("should add new answer", () => {
        renderComponent();
        const addBtn = screen.getByTestId("QuizAnswerList__btnAddAnswer");

        fireEvent.click(addBtn);

        const answers = screen.getAllByTestId("QuizAnswerList__item");

        expect(answers.length).toBe(quiz.answer.list.length + 1);
    });

    it("should delete item", () => {
        renderComponent();
        const testDeleteBtns = screen.getAllByTestId("QuizAnswerList__btnTestDelete");
        fireEvent.click(testDeleteBtns[0]);

        const answers = screen.getAllByTestId("QuizAnswerList__item");
        expect(answers.length).toBe(quiz.answer.list.length - 1);
    });
});
