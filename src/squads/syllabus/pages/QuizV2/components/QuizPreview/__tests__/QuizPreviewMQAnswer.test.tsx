import { EditorState } from "draft-js";
import { MathJaxLoadStatus } from "src/common/constants/enum";
import { createEditorStateFromText } from "src/squads/syllabus/common/utils/draft-js";

import QuizPreviewMQAnswer, {
    QuizPreviewMQAnswerProps,
} from "src/squads/syllabus/pages/QuizV2/components/QuizPreview/QuizPreviewMQAnswer";
import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import { render, screen } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseInstallMathJax = () => {
    (useInstallMathJax as jest.Mock).mockReturnValue({
        loadStatus: MathJaxLoadStatus.LOADED,
    });
};

const mockUseUploadFiles = () => {
    (useUploadFiles as jest.Mock).mockReturnValue({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    });
};

const correctLabel: string = "Correct";
const answerText: string = "answer";
const content: EditorState = createEditorStateFromText(answerText);

const renderUtil = (props: QuizPreviewMQAnswerProps) =>
    render(<QuizPreviewMQAnswer {...props} />, { wrapper: TestCommonAppProvider });

describe(QuizPreviewMQAnswer.name, () => {
    beforeEach(() => {
        mockUseInstallMathJax();
        mockUseUploadFiles();
    });

    it("should render answer with correct label", () => {
        renderUtil({ content, correct: true });

        expect(screen.getByText(answerText)).toBeInTheDocument();
        expect(screen.getByText(correctLabel)).toBeInTheDocument();
    });

    it("should render answer without correct label", () => {
        renderUtil({ content, correct: false });

        expect(screen.getByText(answerText)).toBeInTheDocument();
        expect(screen.queryByText(correctLabel)).not.toBeInTheDocument();
    });
});
