import { createEmptyQuiz } from "src/squads/syllabus/models/quiz";
import { initialState } from "src/squads/syllabus/store/quiz";

import QuizContent from "../QuizContent";

import { render } from "@testing-library/react";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("react-pdf");
jest.mock("../../QuizBuilder/QuizOptions", () => {
    return () => null;
});

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: () => ({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    }),
}));

describe("<QuizContent />", () => {
    it("should render without crash", () => {
        const quiz = createEmptyQuiz({
            schoolId: 123,
            loId: "",
            isLo: false,
        });

        const { container } = render(
            <AppProvider
                customStores={{ quiz: { ...initialState, quizzes: [quiz], currentQuizIndex: 0 } }}
            >
                <TestThemeProvider>
                    <QuizContent pdfUrl={"pdfUrl"} externalIdProps={{}} />
                </TestThemeProvider>
            </AppProvider>
        );

        expect(container.firstChild).toBeInTheDocument();
    });
});
