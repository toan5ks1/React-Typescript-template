import { TestApp } from "src/squads/lesson/test-utils";
import { getRadioInputByTestId } from "src/squads/lesson/test-utils/utils";

import DialogConfirmSavingMethod from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogConfirmSavingMethod/DialogConfirmSavingMethod";

import { render, screen } from "@testing-library/react";
import { LessonSavingMethodKeys } from "src/squads/lesson/pages/LessonManagement/common/types";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";

describe("DialogConfirmSavingMethod", () => {
    it("should render DialogConfirmSavingMethod with 2 method saving options", () => {
        render(
            <TestApp>
                <TestHookFormProvider>
                    <DialogConfirmSavingMethod open={true} onSave={jest.fn()} onClose={jest.fn()} />
                </TestHookFormProvider>
            </TestApp>
        );

        const oneTimeLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME;
        const oneTimeRadio = getRadioInputByTestId(`Radio__${oneTimeLesson}`);

        const weeklyRecurringLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
        const weeklyRecurringRadio = getRadioInputByTestId(`Radio__${weeklyRecurringLesson}`);

        expect(screen.getByTestId("DialogConfirmSavingMethod__dialog")).toBeInTheDocument();
        expect(oneTimeRadio).toBeInTheDocument();
        expect(weeklyRecurringRadio).toBeInTheDocument();
    });
});
