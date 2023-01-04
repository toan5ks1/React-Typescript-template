import { ReactNode } from "react";

import { MathJaxLoadStatus } from "src/common/constants/enum";
import { getExampleDraftContent } from "src/squads/syllabus/test-utils/draft-js";

import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import QuizEditorHF, { QuizEditorHFProps } from "../QuizEditorHF";

import { render, screen } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const defaultValue = getExampleDraftContent("DEFAULT_VALUE_OF_EDITOR");
const name: string = "content";
const labelText: string = "Editor label";
const label: ReactNode = <label>{labelText}</label>;

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseInstallMathJax = (loadStatus: MathJaxLoadStatus) => {
    (useInstallMathJax as jest.Mock).mockImplementation(() => ({
        loadStatus,
    }));
};

const mockUseUploadFiles = () => {
    (useUploadFiles as jest.Mock).mockReturnValue({ onUploadFilesAsync: jest.fn() });
};

const renderUtil = (props: QuizEditorHFProps) =>
    render(
        <TestHookFormProvider>
            <QuizEditorHF {...props} />
        </TestHookFormProvider>,
        { wrapper: TestApp }
    );

describe(QuizEditorHF.name, () => {
    beforeEach(() => {
        mockUseUploadFiles();
        mockUseInstallMathJax(MathJaxLoadStatus.LOADED);
    });

    it("should render editor with default value", () => {
        renderUtil({ defaultValue, name });

        expect(screen.getByRole("textbox")).toHaveTextContent("DEFAULT_VALUE_OF_EDITOR");
    });

    it("should render correct label", () => {
        renderUtil({ defaultValue, name, label });

        expect(screen.getByText(labelText)).toBeInTheDocument();
    });
});
