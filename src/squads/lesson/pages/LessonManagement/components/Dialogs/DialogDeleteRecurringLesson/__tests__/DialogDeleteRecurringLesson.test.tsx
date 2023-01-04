import { getRadioInputByTestId } from "src/squads/lesson/test-utils/utils";

import DialogDeleteRecurringLesson, {
    DialogDeleteRecurringLessonProps,
} from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogDeleteRecurringLesson";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider/index";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonSavingMethodKeys } from "src/squads/lesson/pages/LessonManagement/common/types";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

describe("DialogDeleteRecurringLesson", () => {
    const props: DialogDeleteRecurringLessonProps = {
        onClose: jest.fn(),
        onSave: jest.fn(),
        open: true,
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <TranslationProvider>
                    <DialogDeleteRecurringLesson {...props} />
                </TranslationProvider>
            </TestThemeProvider>
        );
    });

    it("should render DialogDeleteRecurringLesson with 2 method saving options", () => {
        const oneTimeLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME;
        const oneTimeRadio = getRadioInputByTestId(`Radio__${oneTimeLesson}`);

        const weeklyRecurringLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
        const weeklyRecurringRadio = getRadioInputByTestId(`Radio__${weeklyRecurringLesson}`);

        expect(screen.getByTestId("DialogDeleteRecurringLessonMethod__dialog")).toBeInTheDocument();
        expect(oneTimeRadio).toBeInTheDocument();
        expect(weeklyRecurringRadio).toBeInTheDocument();
    });

    it("should save DialogRecurringLesson", async () => {
        const saveButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(saveButton);
        await waitFor(() => {
            expect(props.onSave).toBeCalled();
        });
    });
});
