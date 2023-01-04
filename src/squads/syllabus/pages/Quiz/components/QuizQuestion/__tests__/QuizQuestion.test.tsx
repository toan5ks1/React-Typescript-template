import { MathJaxLoadStatus } from "src/common/constants/enum";
import { createEmptyQuiz, QuizType } from "src/squads/syllabus/models/quiz";
import { initialState } from "src/squads/syllabus/store/quiz";

import useInstallMathJax from "src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax";

import QuizQuestion from "../QuizQuestion";

import { render, screen } from "@testing-library/react";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: () => ({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    }),
}));

jest.mock("src/squads/syllabus/hooks/useFeatureToggle");

jest.mock("src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<QuizQuestion />", () => {
    beforeEach(() => {
        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));
    });
    const quiz = createEmptyQuiz({
        schoolId: 123,
        loId: "id",
        isLo: false,
    });

    it("should have seven button in editor", () => {
        render(
            <AppProvider
                customStores={{
                    quiz: { ...initialState, quizzes: [quiz], currentQuizIndex: 0 },
                }}
            >
                <QuizQuestion kind={QuizType.QUIZ_TYPE_FIB} onChange={() => {}} />
            </AppProvider>
        );

        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(7);
    });

    it("should have three button in editor", () => {
        render(
            <AppProvider
                customStores={{
                    quiz: { ...initialState, quizzes: [quiz], currentQuizIndex: 0 },
                }}
            >
                <QuizQuestion kind={QuizType.QUIZ_TYPE_TAD} onChange={() => {}} />
            </AppProvider>
        );

        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(3);
    });
});
