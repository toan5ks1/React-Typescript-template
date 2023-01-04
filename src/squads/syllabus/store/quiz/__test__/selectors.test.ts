import { isQuizValid } from "src/squads/syllabus/models/quiz";
import { createEmptyQuizState } from "src/squads/syllabus/test-utils/quiz";
import { createEmptyRootState } from "src/squads/syllabus/test-utils/root-state";

import {
    answersSelector,
    currentLOSelector,
    currentQuizQuestionSelector,
    currentQuizSelector,
    hasCurrentQuizSelector,
    quizOnReviewSelector,
    quizTypeSelector,
    quizValidSelector,
    totalQuizSelector,
} from "../selectors";

describe("quizTypeSelector", () => {
    it("should return correct quiz type", () => {
        const state = createEmptyRootState();
        expect(quizTypeSelector(state)).toEqual(
            state.quiz.quizzes[state.quiz.currentQuizIndex].kind
        );
    });
});

describe("answersSelector", () => {
    it("should return correct answers as array of tuple", () => {
        const state = createEmptyRootState();

        expect(answersSelector(state)).toEqual(
            Array.from(state.quiz.quizzes[state.quiz.currentQuizIndex].answer.list.values())
        );
    });
});

describe("currentQuizSelector", () => {
    it("should return currently selected quiz", () => {
        const state = createEmptyRootState();

        expect(currentQuizSelector(state)).toEqual(state.quiz.quizzes[state.quiz.currentQuizIndex]);
    });
});

describe("currentLOSelector", () => {
    it("should return current lo of the quiz", () => {
        const state = createEmptyRootState();

        expect(currentLOSelector(state)).toEqual(state.quiz.lo);
    });
});

describe("currentQuizQuestionSelector", () => {
    it("should return question of the current quiz", () => {
        const state = createEmptyRootState();

        expect(currentQuizQuestionSelector(state)).toEqual(
            state.quiz.quizzes[state.quiz.currentQuizIndex].question
        );
    });
});

describe("hasCurrentQuizSelector", () => {
    it("should return if we have current quiz", () => {
        const state = createEmptyRootState();

        expect(hasCurrentQuizSelector(state)).toEqual(true);

        const stateNoQuiz = createEmptyRootState({
            quiz: createEmptyQuizState({ currentQuizIndex: -1 }),
        });

        expect(hasCurrentQuizSelector(stateNoQuiz)).toEqual(false);
    });
});

describe("quizOnReviewSelector", () => {
    it("should return the quiz that is on preview", () => {
        const state = createEmptyRootState();

        expect(quizOnReviewSelector(state)).toEqual(state.quiz.quizOnReview);
    });
});

jest.mock("src/squads/syllabus/models/quiz", () => {
    const actual = jest.requireActual("src/squads/syllabus/models/quiz");

    return {
        ...actual,
        isQuizValid: jest.fn(),
    };
});

describe("quizValidSelector", () => {
    it("should return false in case the quiz is not valid (especially when start creating quiz)", () => {
        (isQuizValid as jest.Mock).mockReturnValue(false);

        const state = createEmptyRootState();
        expect(quizValidSelector(state)).toEqual(false);
    });

    it("should return true in case the quiz is valid", () => {
        (isQuizValid as jest.Mock).mockReturnValue(true);

        const state = createEmptyRootState();
        expect(quizValidSelector(state)).toEqual(true);
    });
});

describe("totalQuizSelector", () => {
    it("should return the length of quizzes", () => {
        const state = createEmptyRootState();
        expect(totalQuizSelector(state)).toEqual(state.quiz.quizzes.length);
    });
});
