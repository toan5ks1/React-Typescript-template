import { MathJaxLoadStatus } from "src/common/constants/enum";
import { getExampleDraftContent } from "src/squads/syllabus/test-utils/draft-js";

import useInstallMathJax from "src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax";

import QuizEditor from "../QuizEditor";

import { render, screen } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<QuizEditor />", () => {
    it("should render without crash and equals to LOAD status", async () => {
        (useUploadFiles as jest.Mock).mockImplementation(() => {
            return {
                isUploading: false,
                onUploadFilesAsync: jest.fn(),
            };
        });
        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));

        render(
            <AppProvider>
                <TestThemeProvider>
                    <QuizEditor editorState={getExampleDraftContent()} />
                </TestThemeProvider>
            </AppProvider>
        );

        expect(await screen.findByTestId("Editor__content")).toBeInTheDocument();
    });
});
