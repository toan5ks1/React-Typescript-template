import { LabelTypes } from "src/common/utils/label-generator";
import { createEmptyAnswer } from "src/squads/syllabus/models/quiz";

import { QuizType } from "manabie-yasuo/quiz_pb";

import Answer from "../Answer";

import { render } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: () => ({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    }),
}));

jest.mock("src/squads/syllabus/hooks/useFeatureToggle");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

describe("<Answer />", () => {
    it("should render multiple choice answer", () => {
        render(
            <TestThemeProvider>
                <Answer
                    readOnly={false}
                    labelType={LabelTypes.NUMBER}
                    quizType={QuizType.QUIZ_TYPE_MCQ}
                    answer={createEmptyAnswer("123", true)}
                    onChange={jest.fn()}
                    onChangeLabel={jest.fn()}
                    onDelete={jest.fn()}
                    onChangeCorrect={jest.fn()}
                />
            </TestThemeProvider>
        );
    });
});
