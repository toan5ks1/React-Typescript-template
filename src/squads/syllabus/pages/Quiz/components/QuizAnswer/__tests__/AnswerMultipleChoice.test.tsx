import { MathJaxLoadStatus } from "src/common/constants/enum";
import { getEmptyOption, QuizType } from "src/squads/syllabus/models/quiz";

import useInstallMathJax from "src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax";

import AnswerMultipleChoice from "../AnswerMultipleChoice";

import { render, screen } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

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

describe("<AnswerMultipleChoice />", () => {
    beforeEach(() => {
        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));
    });

    const defaultProps = {
        content: getEmptyOption().content,
        correct: false,
        onChange: () => {},
        onChangeCorrect: () => {},
        onDelete: () => {},
    };

    it("should have eight button in editor (include button delete)", () => {
        render(
            <TestThemeProvider>
                <AnswerMultipleChoice
                    {...defaultProps}
                    quizType={QuizType.QUIZ_TYPE_FIB}
                    readOnly={false}
                />
            </TestThemeProvider>
        );
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(8);
    });

    it("should have four button in editor (include button delete)", () => {
        render(
            <TestThemeProvider>
                <AnswerMultipleChoice
                    {...defaultProps}
                    quizType={QuizType.QUIZ_TYPE_POW}
                    readOnly={false}
                />
            </TestThemeProvider>
        );
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(4);
    });

    it("should not have any button", () => {
        render(
            <TestThemeProvider>
                <AnswerMultipleChoice
                    {...defaultProps}
                    quizType={QuizType.QUIZ_TYPE_FIB}
                    readOnly={true}
                />
            </TestThemeProvider>
        );
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(0);
    });
});
