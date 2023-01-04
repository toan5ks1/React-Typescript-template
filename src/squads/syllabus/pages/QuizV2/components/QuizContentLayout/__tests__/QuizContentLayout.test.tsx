import { MathJaxLoadStatus } from "src/common/constants/enum";

import useInstallMathJax from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax";

import QuizContentLayout, { QuizContentLayoutProps } from "../QuizContentLayout";

import { render, screen } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestQuizProvider from "src/squads/syllabus/pages/QuizV2/test-utils/TestQuizProvider";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";
import { createTestLO, createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/pages/QuizV2/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockUseUploadFiles = () => {
    (useUploadFiles as jest.Mock).mockReturnValue({ onUploadFilesAsync: jest.fn() });
};

const mockUseInstallMathJax = (loadStatus: MathJaxLoadStatus) => {
    (useInstallMathJax as jest.Mock).mockImplementation(() => ({
        loadStatus,
    }));
};

const renderUtil = (props: QuizContentLayoutProps = {}) => {
    const lo = createTestLO();

    return render(
        <TestQuizProvider lo={lo}>
            <TestHookForm
                defaultValues={createTestQuiz({
                    loId: lo.lo_id,
                })}
            >
                <QuizContentLayout {...props} />
            </TestHookForm>
            ,
        </TestQuizProvider>,
        { wrapper: TestApp }
    );
};

describe(QuizContentLayout.name, () => {
    beforeEach(() => {
        mockUseInstallMathJax(MathJaxLoadStatus.NOT_INJECTED);
        mockUseUploadFiles();
    });

    it("should render not exist pdf", () => {
        const props: QuizContentLayoutProps = {
            pdfUrl: null,
        };

        renderUtil(props);
        expect(screen.queryByText("Quiz Pdf")).not.toBeInTheDocument();
        expect(screen.getByTestId("QuizMaterialUpload__root")).toBeInTheDocument();
        expect(screen.getByTestId("QuizMain__root")).toBeInTheDocument();
    });

    it("should render exist pdf", () => {
        const props: QuizContentLayoutProps = {
            pdfUrl: "pdfUrl",
        };

        renderUtil(props);
        expect(screen.getByText("Quiz Pdf")).toBeInTheDocument();
        expect(screen.queryByTestId("QuizMaterialUpload__root")).toBeNull();
        expect(screen.getByTestId("QuizMain__root")).toBeInTheDocument();
    });
});
