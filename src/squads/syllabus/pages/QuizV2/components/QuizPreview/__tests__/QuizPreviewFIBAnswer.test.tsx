import { EditorState } from "draft-js";
import { MathJaxLoadStatus } from "src/common/constants/enum";
import { createEditorStateFromText } from "src/squads/syllabus/common/utils/draft-js";

import QuizPreviewFIBAnswer, {
    QuizPreviewFIBAnswerProps,
} from "src/squads/syllabus/pages/QuizV2/components/QuizPreview/QuizPreviewFIBAnswer";
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

const answerText: string = "answer";
const content: EditorState = createEditorStateFromText(answerText);
const label: string = "1";

const renderUtil = (props: QuizPreviewFIBAnswerProps) =>
    render(<QuizPreviewFIBAnswer {...props} />, { wrapper: TestCommonAppProvider });

describe(QuizPreviewFIBAnswer.name, () => {
    beforeEach(() => {
        mockUseInstallMathJax();
        mockUseUploadFiles();
    });

    it("should render answer with specific label", () => {
        renderUtil({ content, label });

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(answerText)).toBeInTheDocument();
    });

    it("should render answer without label", () => {
        renderUtil({ content, label: "" });

        expect(screen.queryByText(label)).not.toBeInTheDocument();
        expect(screen.getByText(answerText)).toBeInTheDocument();
    });
});
