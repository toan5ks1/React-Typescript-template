import { convertEnumKeys } from "src/squads/syllabus/common/utils/enum";
import { QuizHasura, QuizType } from "src/squads/syllabus/models/quiz";

import QuizAction from "..";

import { fireEvent, render } from "@testing-library/react";

describe("<QuizAction />", () => {
    const quizType = convertEnumKeys(QuizType);
    const quiz = {
        id: "Quiz1",
        quiz_id: "Quiz1",
        external_id: "1123",
        kind: quizType.QUIZ_TYPE_MAQ,
    };
    const onAction = jest.fn();
    const onReOrder = jest.fn();
    const onSetQuizReview = jest.fn();
    const moveUpButtonId = "QuizTable__moveUpButton";
    const moveDownButtonId = "QuizTable__moveDownButton";

    it("should match snapshot", () => {
        const { container } = render(
            <QuizAction
                record={quiz as QuizHasura}
                size={1}
                onAction={onAction}
                onReOrder={onReOrder}
                onSetQuizReview={onSetQuizReview}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it("should render correctly", () => {
        const { getByTestId } = render(
            <QuizAction
                record={quiz as QuizHasura}
                size={1}
                onAction={onAction}
                onReOrder={onReOrder}
                onSetQuizReview={onSetQuizReview}
            />
        );

        expect(getByTestId("ActionPanel__root")).toBeInTheDocument();
        expect(getByTestId(moveDownButtonId)).toBeInTheDocument();
        expect(getByTestId(moveUpButtonId)).toBeInTheDocument();
    });

    it("should call move button onClick handler", () => {
        const { getByTestId } = render(
            <QuizAction
                record={quiz as QuizHasura}
                size={1}
                onAction={onAction}
                onReOrder={onReOrder}
                onSetQuizReview={onSetQuizReview}
            />
        );

        fireEvent.click(getByTestId(moveDownButtonId));
        expect(onReOrder).toHaveBeenCalled();
        fireEvent.click(getByTestId(moveUpButtonId));
        expect(onReOrder).toHaveBeenCalled();
    });

    it("should call preview button onClick handler", () => {
        const { getByTestId } = render(
            <QuizAction
                record={quiz as QuizHasura}
                size={1}
                onAction={onAction}
                onReOrder={onReOrder}
                onSetQuizReview={onSetQuizReview}
            />
        );

        fireEvent.click(getByTestId("QuizTable__previewButton"));
        expect(onSetQuizReview).toHaveBeenCalled();
    });

    it("should disable move up and move down button when there is only one item", () => {
        const { getByTestId } = render(
            <QuizAction
                record={quiz as QuizHasura}
                size={1}
                index={0}
                onAction={onAction}
                onReOrder={onReOrder}
                onSetQuizReview={onSetQuizReview}
            />
        );

        expect(getByTestId(moveUpButtonId)).toHaveProperty("disabled", true);
        expect(getByTestId(moveDownButtonId)).toHaveProperty("disabled", true);
    });

    it("should disable move up button and enable move down button when the item is at the top", () => {
        const { getByTestId } = render(
            <QuizAction
                record={quiz as QuizHasura}
                size={2}
                index={0}
                onAction={onAction}
                onReOrder={onReOrder}
                onSetQuizReview={onSetQuizReview}
            />
        );

        expect(getByTestId(moveUpButtonId)).toHaveProperty("disabled", true);
        expect(getByTestId(moveDownButtonId)).toHaveProperty("disabled", false);
    });

    it("should disable move down button and enable move up button when the item is at the bottom", () => {
        const { getByTestId } = render(
            <QuizAction
                record={quiz as QuizHasura}
                size={2}
                index={1}
                onAction={onAction}
                onReOrder={onReOrder}
                onSetQuizReview={onSetQuizReview}
            />
        );

        expect(getByTestId(moveUpButtonId)).toHaveProperty("disabled", false);
        expect(getByTestId(moveDownButtonId)).toHaveProperty("disabled", true);
    });
});
