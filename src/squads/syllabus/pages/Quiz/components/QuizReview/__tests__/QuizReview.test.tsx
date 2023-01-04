import {
    QuizType,
    createDefaultAnswerField,
    getEmptyOption,
} from "src/squads/syllabus/models/quiz";
import { initialState } from "src/squads/syllabus/store/quiz";

import QuizReview from "../QuizReview";

import { render, screen } from "@testing-library/react";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: () => ({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    }),
}));

describe("<QuizReview />", () => {
    const createQuizByKind = (kind: QuizType) => {
        return {
            answer: createDefaultAnswerField(kind),
            difficultyLevel: 1,
            explanation: getEmptyOption(),
            externalId: "31",
            kind: kind,
            loId: "01",
            question: getEmptyOption(),
            quizId: "10",
            schoolId: 10,
            taggedLOs: ["12", "13", "14"],
            attribute: {
                configs: [],
            },
        };
    };

    it("should not see explanation with question type PairOfWords", () => {
        render(
            <AppProvider
                customStores={{
                    quiz: {
                        ...initialState,
                        quizzes: [createQuizByKind(QuizType.QUIZ_TYPE_POW)],
                        currentQuizIndex: 0,
                    },
                }}
            >
                <QuizReview
                    open={true}
                    title="Test Quiz Review POW"
                    quiz={createQuizByKind(QuizType.QUIZ_TYPE_POW)}
                    onClose={() => {}}
                />
            </AppProvider>
        );

        expect(screen.queryByTestId("QuizReview__explanation")).not.toBeInTheDocument();
    });

    it("should not see explanation with question type TermAndDefinition", () => {
        render(
            <AppProvider
                customStores={{
                    quiz: {
                        ...initialState,
                        quizzes: [createQuizByKind(QuizType.QUIZ_TYPE_TAD)],
                        currentQuizIndex: 0,
                    },
                }}
            >
                <QuizReview
                    open={true}
                    title="Test Quiz Review TAD"
                    quiz={createQuizByKind(QuizType.QUIZ_TYPE_TAD)}
                    onClose={() => {}}
                />
            </AppProvider>
        );

        expect(screen.queryByTestId("QuizReview__explanation")).not.toBeInTheDocument();
    });
});
