import { useForm } from "react-hook-form";
import { formatDate } from "src/common/utils/time";
import {
    MAX_LENGTH_ANSWER_CONTENT,
    MAX_LENGTH_EDITOR,
    MAX_LENGTH_QUESTION_CONTENT,
    MAX_LENGTH_TITLE,
    MIN_ANSWER_NUMBER,
} from "src/squads/communication/common/constants/enum";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { getDateAfterDuration } from "src/squads/communication/common/utils/utils";
import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockEmptyNotificationFormData,
    createMockNotificationFormData,
    createMockNotificationScheduleField,
} from "src/squads/communication/test-utils/notification";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";
import {
    changeAutocompleteValue,
    changeDatePicker,
    changeEditorContent,
    changeTextInput,
    checkCloseUpsertDialog,
    checkErrorMessage,
} from "src/squads/communication/test-utils/utils";

import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import NotificationUpsertDialog, {
    NotificationUpsertDialogProps,
} from "../NotificationUpsertDialog";

import { fireEvent, render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useNotificationMutation from "src/squads/communication/pages/Notification/hooks/useNotificationMutation";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationMutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const readCountOfNotificationsRefetch = jest.fn();
const notificationListRefetch = jest.fn();
const notificationCategoriesRefetch = jest.fn();
const onDiscard = jest.fn();
const onUpsert = jest.fn();
const resetPaginationOffset = jest.fn();

const mockNotificationFormData: NotificationFormData = createMockNotificationFormData();
const mockEmptyNotificationFormData: NotificationFormData = createMockEmptyNotificationFormData();

const notificationUpsertDialogProps: NotificationUpsertDialogProps = {
    notificationData: mockEmptyNotificationFormData,
    onClose: jest.fn(),
    notificationCategoriesRefetch,
    notificationListRefetch,
    readCountOfNotificationsRefetch,
    resetPaginationOffset,
};

const ComposeFormWithHookFormProvider = (props: NotificationUpsertDialogProps) => {
    const methods = useForm();

    return (
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider methodsOverride={methods}>
                        <NotificationUpsertDialog {...props} />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
};

const mockImplementationCustomHook = () => {
    (useFeatureToggle as jest.Mock).mockImplementation(() => {
        return {
            isEnabled: true,
        };
    });

    (useNotificationMutation as jest.Mock).mockImplementation(() => {
        return {
            onDiscard,
            onSend: jest.fn(),
            onUpsert,
        };
    });
};

const renderNotificationUpsertDialogWithPermission = (props: NotificationUpsertDialogProps) => {
    // TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
    (useFeatureToggle as jest.Mock).mockImplementation(() => {
        return {
            isEnabled: true,
        };
    });

    const wrapper: RenderResult = render(<ComposeFormWithHookFormProvider {...props} />);

    return wrapper;
};

const renderNotificationUpsertDialogWithMockDefaultHook = () => {
    mockImplementationCustomHook();

    const wrapper: RenderResult = renderNotificationUpsertDialogWithPermission(
        notificationUpsertDialogProps
    );

    return wrapper;
};

describe("<NotificationUpsertDialog/>", () => {
    it("should render correct UI", () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithMockDefaultHook();

        expect(wrapper.queryByTestId("NotificationUpsertDialog__dialog")).toBeInTheDocument();
        expect(wrapper.queryByTestId("NotificationUpsertForm__root")).toBeInTheDocument();
        expect(wrapper.queryByTestId("NotificationUpsertForm__grades")).toBeInTheDocument();
        expect(
            wrapper.queryByTestId("NotificationUpsertForm__radioGroupDeliveryDateType")
        ).toBeInTheDocument();
        expect(wrapper.queryByTestId("NotificationUpsertForm__targetGroup")).toBeInTheDocument();
        expect(wrapper.queryByTestId("NotificationUpsertForm__inputTitle")).toBeInTheDocument();

        expect(wrapper.queryByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED")).toBeInTheDocument();

        expect(wrapper.queryByTestId("Radio__NOTIFICATION_STATUS_DRAFT")).toBeInTheDocument();

        expect(wrapper.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent("Compose");
    });

    it("should display date and time inputs and save scheduled button", () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithMockDefaultHook();

        fireEvent.click(wrapper.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        expect(wrapper.getByTestId("NotificationUpsertForm__scheduledDate")).toBeInTheDocument();

        expect(wrapper.getByTestId("TimePickerAutocompleteHF__autocomplete")).toBeInTheDocument();

        expect(
            wrapper.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule")
        ).toBeInTheDocument();
    });

    it("should close the dialog when closing with empty title and content", () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithMockDefaultHook();

        const buttonClose = wrapper.getByTestId("DialogFullScreen__buttonClose");

        expect(buttonClose).toBeInTheDocument();

        fireEvent.click(buttonClose);

        expect(notificationUpsertDialogProps.onClose).toBeCalled();
    });

    it("shouldn't open discard confirm when click discard button without data", () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithMockDefaultHook();

        const buttonDiscard = wrapper.getByTestId("NotificationDialogFooter__buttonDiscard");
        expect(buttonDiscard).toBeInTheDocument();

        fireEvent.click(buttonDiscard);

        expect(
            wrapper.queryByTestId("NotificationUpsertDialog__dialogDiscardConfirm")
        ).not.toBeInTheDocument();
    });

    it("should render correct title in edit mode", () => {
        mockImplementationCustomHook();

        const props: NotificationUpsertDialogProps = {
            ...notificationUpsertDialogProps,
            notificationData: mockNotificationFormData,
        };

        const wrapper: RenderResult = render(<ComposeFormWithHookFormProvider {...props} />);

        expect(wrapper.getByTestId("DialogFullScreen__dialogTitle")).toHaveTextContent("Edit");
    });
});

describe("<NotificationUpsertDialog /> validation new notification", () => {
    it("should show error messages in case of empty form (Save Draft + Send + Save schedule)", async () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithMockDefaultHook();

        // Save Draft
        fireEvent.click(wrapper.getByTestId("DialogNotificationButtonGroup__buttonSaveDraft"));
        // Expect 2 errors are prompted (Title, Content)
        await checkErrorMessage(2, "This field is required");

        // Send
        fireEvent.click(wrapper.getByTestId("DialogNotificationButtonGroup__buttonSend"));
        // Expect 5 errors are prompted (Title, Content, Course, Grade, Student)
        await checkErrorMessage(5, "This field is required");

        // Save schedule
        fireEvent.click(wrapper.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        const scheduleTimeInput = within(
            wrapper.getByTestId("TimePickerAutocompleteHF__autocomplete")
        ).getByTestId("AutocompleteBase__input") as HTMLInputElement;

        expect(wrapper.getByTestId("NotificationUpsertForm__scheduledDate")).toBeInTheDocument();

        expect(scheduleTimeInput).toBeInTheDocument();
        expect(scheduleTimeInput).toHaveValue("00:00");
        expect(
            wrapper.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule")
        ).toBeInTheDocument();

        fireEvent.click(wrapper.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule"));

        // Expect 5 errors are prompted (Title, Content, Course, Grade, Student)
        await checkErrorMessage(5, "This field is required");

        // change value of schedule time input to empty
        fireEvent.change(scheduleTimeInput, { target: { value: "" } });
        // Expect 6 errors are prompted (Title, Content, Course, Grade, Student, ScheduleTime)
        await checkErrorMessage(6, "This field is required");
    });

    it("should show content and title length limit error when clicking send button", async () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithMockDefaultHook();

        changeEditorContent("Editor__draftEditor", "1".repeat(MAX_LENGTH_EDITOR + 1));
        changeTextInput("NotificationUpsertForm__inputTitle", "a".repeat(MAX_LENGTH_TITLE + 1));

        fireEvent.click(wrapper.getByTestId("DialogNotificationButtonGroup__buttonSend"));

        await checkErrorMessage(1, `Content must not exceed ${MAX_LENGTH_EDITOR} characters`);
        await checkErrorMessage(1, `Title must not exceed ${MAX_LENGTH_TITLE} characters`);
    });

    it("should show discard confirm dialog when field is dirty", () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithMockDefaultHook();

        changeTextInput("NotificationUpsertForm__inputTitle", "Title");

        fireEvent.click(wrapper.getByTestId("NotificationDialogFooter__buttonDiscard"));

        expect(
            wrapper.queryByTestId("NotificationUpsertDialog__dialogDiscardConfirm")
        ).toBeInTheDocument();

        fireEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));
        expect(notificationUpsertDialogProps.onClose).toBeCalled();
    });
});

describe("<NotificationUpsertDialog /> validate questionnaire", () => {
    it("should show error message when question content and answer content are empty string", async () => {
        renderNotificationUpsertDialogWithMockDefaultHook();

        userEvent.click(screen.getByTestId("DialogNotificationButtonGroup__buttonSend"));

        // Expect 5 errors are prompted (Title, Content, Course, Grade, Student)
        await checkErrorMessage(5, "This field is required");

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));
        userEvent.click(screen.getByTestId("DialogNotificationButtonGroup__buttonSend"));

        // Expect 8 errors are prompted (Title, Content, Course, Grade, Student, Question, 2 Answer)
        await checkErrorMessage(8, "This field is required");
    });

    it("should show error message when question content and answer content exceed max length", async () => {
        renderNotificationUpsertDialogWithMockDefaultHook();

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        changeTextInput(
            "QuestionSection__inputQuestion",
            "a".repeat(MAX_LENGTH_QUESTION_CONTENT + 1)
        );
        const answerInputs = screen.getAllByTestId("AnswerItem__inputAnswer");

        expect(answerInputs).toHaveLength(MIN_ANSWER_NUMBER);

        answerInputs.forEach((answerInput) => {
            userEvent.type(answerInput, "a".repeat(MAX_LENGTH_ANSWER_CONTENT + 1));
        });

        userEvent.click(screen.getByTestId("DialogNotificationButtonGroup__buttonSend"));

        await checkErrorMessage(
            1,
            `Question must not exceed ${MAX_LENGTH_QUESTION_CONTENT} characters`
        );
        await checkErrorMessage(
            MIN_ANSWER_NUMBER,
            `Answer must not exceed ${MAX_LENGTH_ANSWER_CONTENT} characters`
        );
    });

    it("should show error message when answer content is duplicated", async () => {
        renderNotificationUpsertDialogWithMockDefaultHook();

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        const answerInputs = screen.getAllByTestId("AnswerItem__inputAnswer");

        expect(answerInputs).toHaveLength(MIN_ANSWER_NUMBER);

        answerInputs.forEach((answerInput) => {
            userEvent.type(answerInput, "Answer");
        });

        userEvent.click(screen.getByTestId("DialogNotificationButtonGroup__buttonSend"));

        await checkErrorMessage(MIN_ANSWER_NUMBER, "Answer contains duplicated content");
    });

    it("should show error message when expiration date < schedule date", async () => {
        renderNotificationUpsertDialogWithMockDefaultHook();

        const scheduleDate = getDateAfterDuration(1);
        const expirationDate = getDateAfterDuration(0);

        userEvent.click(screen.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        changeDatePicker("NotificationUpsertForm__scheduledDate", scheduleDate);

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        changeDatePicker(
            "DynamicQuestionSection__datePickerExpiration",
            expirationDate,
            getDateAfterDuration(7)
        );

        userEvent.click(screen.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule"));

        await checkErrorMessage(1, "Invalid Expiration Date");
    });

    it("should show error message when expiration date = current date and expiration time < current time", async () => {
        renderNotificationUpsertDialogWithMockDefaultHook();

        const expirationDate = getDateAfterDuration(0);
        const expirationTime = formatDate(getDateAfterDuration(-10, "minutes"), "HH:mm");

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        changeDatePicker(
            "DynamicQuestionSection__datePickerExpiration",
            expirationDate,
            getDateAfterDuration(7)
        );
        changeAutocompleteValue("DynamicQuestionSection__timePickerExpiration", expirationTime);

        userEvent.click(screen.getByTestId("DialogNotificationButtonGroup__buttonSend"));

        await checkErrorMessage(1, "Invalid Expiration Time");
    });

    it("should show error message when expiration date = schedule date and expiration time < schedule time", async () => {
        renderNotificationUpsertDialogWithMockDefaultHook();

        const scheduleDate = getDateAfterDuration(0);
        const expirationDate = getDateAfterDuration(0);
        const scheduleTime = "10:00";
        const expirationTime = "9:00";

        userEvent.click(screen.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        changeDatePicker("NotificationUpsertForm__scheduledDate", scheduleDate);
        changeAutocompleteValue("TimePickerAutocompleteHF__autocomplete", scheduleTime);

        userEvent.click(screen.getByTestId("DynamicQuestionSection__buttonAddQuestion"));

        changeDatePicker(
            "DynamicQuestionSection__datePickerExpiration",
            expirationDate,
            getDateAfterDuration(7)
        );
        changeAutocompleteValue("DynamicQuestionSection__timePickerExpiration", expirationTime);

        userEvent.click(screen.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule"));

        await checkErrorMessage(1, "Invalid Expiration Time");
    });
});

describe("<NotificationUpsertDialog/> action with edit notification", () => {
    const props: NotificationUpsertDialogProps = {
        ...notificationUpsertDialogProps,
        notificationData: mockNotificationFormData,
    };

    const renderNotificationUpsertDialogWithNotificationId = () => {
        (useNotificationMutation as jest.Mock).mockImplementation(() => {
            return {
                onUpsert: () => ({
                    notificationId: "notificationId",
                }),
                onDiscard,
                onSend: jest.fn(),
            };
        });

        const wrapper: RenderResult = renderNotificationUpsertDialogWithPermission(props);

        return wrapper;
    };

    it("should close the dialog when click button cancel in discard confirm", async () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithNotificationId();

        // Open dialog discard
        fireEvent.click(wrapper.getByTestId("NotificationDialogFooter__buttonDiscard"));

        await waitFor(() => {
            expect(
                wrapper.queryByTestId("NotificationUpsertDialog__dialogDiscardConfirm")
            ).toBeInTheDocument();
        });

        // Close dialog discard
        fireEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonClose"));

        await waitFor(() => {
            expect(
                wrapper.queryByTestId("NotificationUpsertDialog__dialogDiscardConfirm")
            ).not.toBeInTheDocument();
        });
    });

    it("should calling discard notification when change title input", async () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithNotificationId();

        changeTextInput("NotificationUpsertForm__inputTitle", "Test Title");

        fireEvent.click(wrapper.getByTestId("NotificationDialogFooter__buttonDiscard"));

        fireEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(onDiscard).toBeCalled();
        });
        expect(notificationListRefetch).toBeCalled();
        expect(notificationCategoriesRefetch).toBeCalled();
        expect(props.onClose).toBeCalled();
    });

    it("should calling send notification", async () => {
        const wrapper: RenderResult = renderNotificationUpsertDialogWithNotificationId();

        fireEvent.click(wrapper.getByTestId("DialogNotificationButtonGroup__buttonSend"));

        await waitFor(() => {
            expect(readCountOfNotificationsRefetch).toBeCalled();
        });
        expect(notificationListRefetch).toBeCalled();
        expect(notificationCategoriesRefetch).toBeCalled();
        expect(resetPaginationOffset).toBeCalled();
        expect(props.onClose).toHaveBeenCalled();
    });
});

describe("<NotificationUpsertDialog/> scheduled notification with full formData", () => {
    const { deliveryDate, scheduleTime } = createMockNotificationScheduleField();

    const props: NotificationUpsertDialogProps = {
        ...notificationUpsertDialogProps,
        notificationData: {
            ...mockNotificationFormData,
            scheduleDate: deliveryDate,
            scheduleTime: scheduleTime,
        },
    };

    const renderScheduleNotificationUpsertDialog = (
        dialogProps: NotificationUpsertDialogProps = props
    ) => {
        mockImplementationCustomHook();

        const wrapper: RenderResult = renderNotificationUpsertDialogWithPermission(dialogProps);

        return wrapper;
    };

    it("should close dialog when discarding schedule notification", async () => {
        const wrapper: RenderResult = renderScheduleNotificationUpsertDialog();

        fireEvent.click(wrapper.getByTestId("NotificationDialogFooter__buttonDiscard"));

        // Open dialog discard
        expect(
            wrapper.queryByTestId("NotificationUpsertDialog__dialogDiscardConfirm")
        ).toBeInTheDocument();

        // Close dialog discard
        fireEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(onDiscard).toBeCalled();
        });
        expect(notificationListRefetch).toBeCalled();
        expect(notificationCategoriesRefetch).toBeCalled();

        expect(props.onClose).toBeCalled();
    });

    it("should bind correct data to the form", () => {
        const wrapper: RenderResult = renderScheduleNotificationUpsertDialog();

        fireEvent.click(wrapper.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        // Expect all required fields
        expect(wrapper.getByText("Course 1")).toBeInTheDocument();

        expect(
            wrapper.getByTestId("NotificationUpsertForm__inputTitle") as HTMLInputElement
        ).toHaveValue(props.notificationData!.title);

        expect(
            within(wrapper.getByTestId("Editor__draftEditor")).getByText("notification content")
        ).toBeInTheDocument();

        expect(
            within(wrapper.getByTestId("TimePickerAutocompleteHF__autocomplete")).getByTestId(
                "AutocompleteBase__input"
            ) as HTMLInputElement
        ).toHaveValue(props.notificationData!.scheduleTime?.label);

        expect(
            wrapper.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule")
        ).toBeInTheDocument();
    });

    it("should show error on submit when remove required field", async () => {
        const wrapper: RenderResult = renderScheduleNotificationUpsertDialog();

        fireEvent.click(wrapper.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        // Remove the autocomplete time
        fireEvent.change(
            within(wrapper.getByTestId("TimePickerAutocompleteHF__autocomplete")).getByTestId(
                "AutocompleteBase__input"
            ) as HTMLInputElement,
            { target: { value: "" } }
        );

        fireEvent.click(wrapper.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule"));

        await checkErrorMessage(1, "This field is required");
    });

    it("should handle submit schedule notification when close dirty notification", async () => {
        const wrapper: RenderResult = renderScheduleNotificationUpsertDialog();

        fireEvent.click(wrapper.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        changeTextInput("NotificationUpsertForm__inputTitle", "Title");

        checkCloseUpsertDialog("DialogFullScreen__buttonClose", props.onClose);

        expect(notificationListRefetch).toBeCalled();
        expect(notificationCategoriesRefetch).toBeCalled();
    });

    it("should handle submit schedule notification when click save dirty schedule", async () => {
        const wrapper: RenderResult = renderScheduleNotificationUpsertDialog();

        fireEvent.click(wrapper.getByTestId("Radio__NOTIFICATION_STATUS_SCHEDULED"));

        fireEvent.click(wrapper.getByTestId("DialogNotificationButtonGroup__buttonSaveSchedule"));

        // test submit schedule notification
        await waitFor(() => {
            expect(onUpsert).toBeCalled();
        });
        expect(readCountOfNotificationsRefetch).toBeCalled();
        expect(notificationListRefetch).toBeCalled();
        expect(notificationCategoriesRefetch).toBeCalled();
        expect(resetPaginationOffset).toBeCalled();
    });

    it("should create scheduled on close when title and content is filled with close with optimized elapsing time", async () => {
        const wrapper: RenderResult = renderScheduleNotificationUpsertDialog();

        const inputTitle = wrapper.getByTestId(
            "NotificationUpsertForm__inputTitle"
        ) as HTMLInputElement;

        expect(inputTitle.value).toEqual(mockNotificationFormData.title);
        expect(wrapper.queryByText("notification content")).toBeInTheDocument();

        checkCloseUpsertDialog("DialogFullScreen__buttonClose", props.onClose);

        expect(notificationListRefetch).toBeCalled();
        expect(notificationCategoriesRefetch).toBeCalled();
    });
});
