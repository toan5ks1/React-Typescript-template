import CommonTranslationProvider from "src/providers/TranslationProvider";

import QuizDeleteConfirmDialog, { QuizDeleteConfirmDialogProps } from "../QuizDeleteConfirmDialog";

import { fireEvent, render, RenderResult } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

describe(QuizDeleteConfirmDialog.name, () => {
    const onClose = jest.fn();
    const onSave = jest.fn();
    let renderResult: RenderResult;
    const defaultProps: QuizDeleteConfirmDialogProps = {
        open: true,
        onClose,
        onSave,
    };

    beforeEach(() => {
        renderResult = render(
            <TestApp>
                <CommonTranslationProvider>
                    <QuizDeleteConfirmDialog {...defaultProps} />
                </CommonTranslationProvider>
            </TestApp>
        );
    });

    it("should render UI correctly", () => {
        expect(renderResult.getByText("Delete Question")).toBeInTheDocument();
        expect(renderResult.getByText("Are you sure to delete this question?")).toBeInTheDocument();
        expect(renderResult.getByText("Cancel")).toBeInTheDocument();
        expect(renderResult.getByText("Delete")).toBeInTheDocument();
    });

    it("should call onClose", () => {
        fireEvent.click(renderResult.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(onClose).toHaveBeenCalled();
    });

    it("should call onSave", () => {
        fireEvent.click(renderResult.getByTestId("FooterDialogConfirm__buttonSave"));
        expect(onSave).toHaveBeenCalled();
    });
});
