import { MathJaxLoadStatus } from "src/common/constants/enum";

import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import QuizAnswerEditor from "../QuizAnswerEditor";

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
quiz.answer = createDefaultAnswerFieldV2(quiz.kind);

const onRemove = jest.fn();

const renderComponent = () => {
    return render(
        <TestAppWithQueryClient>
            <TestHookForm defaultValues={quiz}>
                <QuizAnswerEditor name="answer.list.0.content" onRemove={onRemove} />
            </TestHookForm>
        </TestAppWithQueryClient>
    );
};

describe(QuizAnswerEditor.name, () => {
    beforeEach(() => {
        (useInstallMathJax as jest.Mock).mockReturnValue({
            loadStatus: MathJaxLoadStatus.LOADED,
        });
    });

    it("should render delete button", () => {
        renderComponent();
        expect(screen.getByTestId("DeleteButton__root")).toBeInTheDocument();
    });

    it("should render editor", () => {
        renderComponent();
        expect(screen.getByTestId("Editor__content")).toBeInTheDocument();
    });

    it("should call onRemove on click delete button", () => {
        renderComponent();
        const deleteBtn = screen.getByTestId("DeleteButton__root");
        fireEvent.click(deleteBtn);
        expect(onRemove).toBeCalledTimes(1);
    });
});
