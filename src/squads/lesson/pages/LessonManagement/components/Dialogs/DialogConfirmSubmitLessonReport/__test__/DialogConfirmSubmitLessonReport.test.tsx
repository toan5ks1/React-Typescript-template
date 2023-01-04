import DialogConfirmSubmitLessonReport, {
    DialogConfirmSubmitLessonReportProps,
} from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogConfirmSubmitLessonReport";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

describe("DialogConfirmSubmitLessonReport", () => {
    const props: DialogConfirmSubmitLessonReportProps = {
        open: true,
        onClose: () => {},
        onSave: () => {},
    };

    it("should have correct content", () => {
        render(
            <TestThemeProvider>
                <TranslationProvider>
                    <DialogConfirmSubmitLessonReport {...props} />
                </TranslationProvider>
            </TestThemeProvider>
        );
        const dialog = screen.getByTestId("DialogConfirmSubmitLessonReport__dialog");
        expect(dialog).toHaveTextContent("Submit Lesson Report");
        expect(dialog).toHaveTextContent("Are you sure want to submit this lesson report?");
        expect(dialog).toHaveTextContent(
            "The status of the lesson is Draft, so when you submit this lesson report, the lesson will automatically be published as well."
        );
    });
});
