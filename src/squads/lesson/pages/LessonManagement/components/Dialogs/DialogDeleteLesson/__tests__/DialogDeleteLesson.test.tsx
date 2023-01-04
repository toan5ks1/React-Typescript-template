import { TestThemeProvider } from "src/squads/lesson/test-utils";

import DialogDeleteLesson from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogDeleteLesson";

import { render, screen } from "@testing-library/react";

const renderComponent = ({ isDeleting }: { isDeleting: boolean }) =>
    render(
        <TestThemeProvider>
            <DialogDeleteLesson
                open={true}
                onSave={jest.fn()}
                onClose={jest.fn()}
                isDeleting={isDeleting}
            />
        </TestThemeProvider>
    );

describe("DialogDeleteLesson", () => {
    it("should NOT disable delete button", () => {
        renderComponent({ isDeleting: false });

        expect(screen.getByTestId("DialogDeleteLesson__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).toBeEnabled();
    });

    it("should disable delete button", () => {
        renderComponent({ isDeleting: true });

        expect(screen.getByTestId("DialogDeleteLesson__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).not.toBeEnabled();
    });
});
