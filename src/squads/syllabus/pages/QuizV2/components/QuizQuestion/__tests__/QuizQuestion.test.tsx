import { EditorState } from "draft-js";
import { QuizType } from "src/squads/syllabus/models/quiz";

import QuizQuestion from "../QuizQuestion";

import { render, screen } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";

type RenderProps = {
    kind: QuizType;
};

const renderComponent = (props: RenderProps) => {
    const editorState = EditorState.createEmpty();
    render(
        <TestAppWithQueryClient>
            <TestHookForm
                defaultValues={{
                    kind: props.kind,
                    question: {
                        content: editorState,
                    },
                }}
            >
                <QuizQuestion />
            </TestHookForm>
        </TestAppWithQueryClient>
    );
};

describe(QuizQuestion.name, () => {
    it(`should not render title if quiz type === ${QuizType.QUIZ_TYPE_FIB}`, () => {
        renderComponent({ kind: QuizType.QUIZ_TYPE_FIB });

        expect(screen.queryByTestId("QuizQuestion__title")).not.toBeInTheDocument();
    });

    it("should not render title if quiz is not Flash Card", () => {
        renderComponent({ kind: QuizType.QUIZ_TYPE_MCQ });

        expect(screen.queryByTestId("QuizQuestion__title")).not.toBeInTheDocument();
    });

    it("should render quiz title if quiz is flash card", () => {
        renderComponent({ kind: QuizType.QUIZ_TYPE_TAD });

        expect(screen.getByTestId("QuizQuestion__title")).toBeInTheDocument();
    });

    it("should render subtitle 'Question Description *'", () => {
        renderComponent({ kind: QuizType.QUIZ_TYPE_MCQ });

        const subtitle = screen.getByTestId("QuizQuestion__subtitle");
        expect(subtitle.textContent).toBe("Question Description *");
    });
});
