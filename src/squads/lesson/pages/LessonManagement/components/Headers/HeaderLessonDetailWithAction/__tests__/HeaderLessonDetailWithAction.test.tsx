import { getRadioInputByTestId } from "src/squads/lesson/test-utils/utils";

import HeaderLessonDetailWithAction, {
    HeaderLessonDetailWithActionProps,
} from "src/squads/lesson/pages/LessonManagement/components/Headers/HeaderLessonDetailWithAction";

import { RenderResult, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LessonSavingMethodKeys } from "src/squads/lesson/pages/LessonManagement/common/types";
import useDeleteLessonOfLessonManagement, {
    DeleteLessonProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement",
    () => {
        return {
            __esModule: true,
            default: jest.fn(),
        };
    }
);

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: true }),
}));

const mockDeleteHook = () => {
    (useDeleteLessonOfLessonManagement as jest.Mock).mockImplementation(() => {
        return {
            deleteLesson: (props: DeleteLessonProps) => {
                props.onSuccess?.();
            },
            isDeleting: false,
        };
    });
};

const renderWrapper = (props: HeaderLessonDetailWithActionProps) => {
    mockDeleteHook();
    return render(
        <TestThemeProvider>
            <HeaderLessonDetailWithAction {...props} />
        </TestThemeProvider>
    );
};

describe("<HeaderLessonDetailWithAction />", () => {
    const props: HeaderLessonDetailWithActionProps = {
        isLoadingLesson: true,
        lessonStatus: "",
        lessonId: "Test Lesson Id",
        lessonTitle: "Lesson Title",
        onDeleteSuccess: jest.fn(),
        freq: "once",
    };

    it("should visible title", () => {
        const wrapper: RenderResult = renderWrapper(props);

        expect(wrapper.getByText(props.lessonTitle)).toBeVisible();
    });

    it("should delete lesson", () => {
        const wrapper: RenderResult = renderWrapper(props);

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        const actionPanelPopover = screen.getByTestId("ActionPanel__popover--open");
        const deleteButton = actionPanelPopover.querySelector("button:last-child");

        expect(deleteButton).not.toBeNull();
        expect(deleteButton).toBeVisible();

        userEvent.click(deleteButton!);

        const confirmButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmButton);

        expect(props.onDeleteSuccess).toBeCalled();
    });

    it("should render DialogDeleteRecurringLesson with freq weekly", async () => {
        const propsWithFreqWeekly: HeaderLessonDetailWithActionProps = {
            isLoadingLesson: true,
            lessonStatus: "",
            lessonId: "Test Lesson Id",
            lessonTitle: "Lesson Title",
            onDeleteSuccess: jest.fn(),
            freq: "weekly",
        };
        const wrapper: RenderResult = renderWrapper(propsWithFreqWeekly);

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        const deleteButton = screen.getByRole("menuitem", {
            name: /delete/i,
        });

        userEvent.click(deleteButton!);

        const weeklyRecurringLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
        const weeklyRecurringRadio = getRadioInputByTestId(`Radio__${weeklyRecurringLesson}`);

        expect(weeklyRecurringRadio).toBeInTheDocument();

        userEvent.click(weeklyRecurringRadio);

        const confirmButton = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(confirmButton).toBeInTheDocument();

        userEvent.click(confirmButton);

        await waitFor(() => {
            expect(propsWithFreqWeekly.onDeleteSuccess).toBeCalled();
        });
    });
});
