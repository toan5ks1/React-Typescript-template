import { MathJaxLoadStatus } from "src/common/constants/enum";
import { getEmptyOption, QuizType } from "src/squads/syllabus/models/quiz";

import useInstallMathJax from "src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax";

import AnswerTermAndDefinition from "../AnswerTermAndDefinition";

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

describe("<AnswerTermAndDefinition />", () => {
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

    it("should have seven button in editor", () => {
        render(
            <AppProvider>
                <AnswerTermAndDefinition
                    {...defaultProps}
                    quizType={QuizType.QUIZ_TYPE_FIB}
                    readOnly={false}
                />
            </AppProvider>
        );
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(7);
    });

    it("should have three button in editor", () => {
        render(
            <AppProvider>
                <AnswerTermAndDefinition
                    {...defaultProps}
                    quizType={QuizType.QUIZ_TYPE_POW}
                    readOnly={false}
                />
            </AppProvider>
        );
        const buttons = screen.queryAllByRole("button");
        expect(buttons).toHaveLength(3);
    });
});
