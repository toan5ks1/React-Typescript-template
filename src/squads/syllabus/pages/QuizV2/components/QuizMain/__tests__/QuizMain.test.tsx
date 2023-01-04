import QuizMain from "src/squads/syllabus/pages/QuizV2/components/QuizMain";

import { fireEvent, render, screen } from "@testing-library/react";
import TestQuizProvider from "src/squads/syllabus/pages/QuizV2/test-utils/TestQuizProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestLO, createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

describe("<QuizMain />", () => {
    beforeEach(() => {
        const lo = createTestLO();
        render(
            <TestAppWithQueryClient>
                <TestQuizProvider mode="create" lo={lo}>
                    <TestHookForm
                        defaultValues={createTestQuiz({
                            loId: lo.lo_id,
                        })}
                    >
                        <QuizMain />
                    </TestHookForm>
                </TestQuizProvider>
            </TestAppWithQueryClient>
        );
    });

    it("should render the preview button", () => {
        const previewBtn = screen.getByTestId("QuizMain__buttonPreview");
        const previewBtnIcon = screen.getByTestId("QuizMain__iconPreview");
        expect(previewBtn).toBeInTheDocument();
        expect(previewBtn).toHaveTextContent("Preview");
        expect(previewBtn).toContainElement(previewBtnIcon);
    });

    it("should not render preview panel unless clicked on the preview button", () => {
        expect(screen.queryByTestId("QuizPreview__root")).not.toBeInTheDocument();
    });

    it("should render preview panel once clicked on the preview button", () => {
        fireEvent.click(screen.getByTestId("QuizMain__buttonPreview"));

        expect(screen.getByTestId("QuizPreview__root")).toBeInTheDocument();
    });

    it("should close preview panel once clicked on close button", () => {
        fireEvent.click(screen.getByTestId("QuizMain__buttonPreview"));
        fireEvent.click(screen.getByRole("button", { name: "close preview" }));

        expect(screen.queryByTestId("QuizPreview__root")).not.toBeInTheDocument();
    });
});
