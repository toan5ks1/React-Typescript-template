import { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Quiz } from "src/squads/syllabus/models/quiz";
import { QuizActions, quizOnReviewSelector } from "src/squads/syllabus/store/quiz";
import { QuizState } from "src/squads/syllabus/store/quiz/quiz-types";

export interface UseQuizReviewValue {
    quizOnReview: Quiz | null;
    onSetQuizReview: (quizz: QuizState["quizOnReview"]) => void;
    onCloseReview: () => void;
}

function useQuizReview(): UseQuizReviewValue {
    const dispatch = useDispatch();
    const quizOnReview = useSelector(quizOnReviewSelector);

    const onSetQuizReview = useCallback(
        (quiz: QuizState["quizOnReview"]) => {
            dispatch(QuizActions.setQuizOnReview(quiz));
        },
        [dispatch]
    );

    const onCloseReview = useCallback(() => {
        dispatch(QuizActions.setQuizOnReview(null));
    }, [dispatch]);

    return {
        quizOnReview,
        onSetQuizReview,
        onCloseReview,
    };
}

export default useQuizReview;
