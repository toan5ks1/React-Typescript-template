import { MathJaxLoadStatus } from "src/common/constants/enum";
import { getExampleDraftContent } from "src/squads/syllabus/test-utils/draft-js";

import { EditorProps } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/Editor/types";
import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import QuizEditor from "../QuizEditor";

import { render, screen } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const text: string = "test content";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseUploadFiles = () => {
    (useUploadFiles as jest.Mock).mockImplementation(() => {
        return {
            isUploading: false,
            onUploadFilesAsync: jest.fn(),
        };
    });
};

const mockUseInstallMathJax = (loadStatus: MathJaxLoadStatus) => {
    (useInstallMathJax as jest.Mock).mockImplementation(() => ({
        loadStatus,
    }));
};

const renderUtil = (props: EditorProps) =>
    render(<QuizEditor {...props} />, { wrapper: TestCommonAppProvider });

describe(QuizEditor.name, () => {
    beforeEach(() => {
        mockUseUploadFiles();
    });

    it("should render without crash and equals to LOAD status", async () => {
        mockUseInstallMathJax(MathJaxLoadStatus.LOADED);
        renderUtil({ editorState: getExampleDraftContent(text) });

        expect(await screen.findByTestId("Editor__content")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toHaveTextContent(text);
    });

    it("should render spinner loading instead of editor", () => {
        mockUseInstallMathJax(MathJaxLoadStatus.NOT_INJECTED);
        renderUtil({ editorState: getExampleDraftContent(text) });

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });
});
