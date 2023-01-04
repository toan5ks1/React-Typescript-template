import { createSelector } from "reselect";

import { isQuizValid } from "../../models/quiz";
import { LOWithQuizSet } from "../../models/quizset-lo";
import { RootState } from "../store-types";

export const answersSelector = createSelector(
    ({ quiz }: RootState) => quiz.quizzes[quiz.currentQuizIndex],
    (quiz) => (quiz ? Array.from(quiz.answer.list.values()) : [])
);

export const quizOnReviewSelector = createSelector(
    (state: RootState) => state.quiz.quizOnReview,
    (quiz) => quiz
);

export const currentQuizSelector = createSelector(
    ({ quiz }: RootState) => {
        return quiz.quizzes[quiz.currentQuizIndex];
    },
    (quiz) => quiz
);

export const currentLOSelector = createSelector(
    ({ quiz }: RootState) => {
        return quiz.lo;
    },
    (lo) => lo as LOWithQuizSet
);

export const totalQuizSelector = createSelector(
    ({ quiz }: RootState) => quiz.quizzes.length,
    (quizLength) => quizLength
);

export const quizValidSelector = createSelector(
    ({ quiz }: RootState) => quiz.quizzes,
    (quizzes) => {
        return quizzes.every((quiz) => {
            return isQuizValid(quiz);
        });
    }
);

export const currentQuizQuestionSelector = createSelector(
    ({ quiz }: RootState) => {
        return quiz.quizzes[quiz.currentQuizIndex];
    },
    (quiz) => (quiz ? quiz.question : null)
);

export const hasCurrentQuizSelector = createSelector(
    ({ quiz }: RootState) => {
        return quiz.quizzes[quiz.currentQuizIndex];
    },
    (quiz) => Boolean(quiz)
);

export const quizTypeSelector = createSelector(
    ({ quiz }: RootState) => {
        return quiz.quizzes[quiz.currentQuizIndex];
    },
    (quiz) => quiz.kind
);
