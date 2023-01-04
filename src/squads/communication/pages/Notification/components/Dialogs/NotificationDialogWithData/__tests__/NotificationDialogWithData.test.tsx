import { useForm } from "react-hook-form";
import { formatDate } from "src/common/utils/time";
import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockQuestionnaireQuestionsList,
    createMockTagsSelectedByNotificationIdQueryReturn,
} from "src/squads/communication/test-utils/query-data";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import NotificationDialogWithData, {
    NotificationDialogWithDataProps,
} from "../NotificationDialogWithData";

import { render, RenderResult, screen, within } from "@testing-library/react";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useNotificationDetail, {
    UseNotificationDetailReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import { mockUseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail/__mocks__";
import useNotificationMsgDetail, {
    UseNotificationMsgDetailReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";
import { mockUseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail/__mocks__";
import useTagsSelectedByNotificationId from "src/squads/communication/pages/Notification/hooks/useTagsSelectedByNotificationId";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/communication/pages/Notification/hooks/useTagsSelectedByNotificationId",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

const readCountOfNotificationsRefetch = jest.fn();
const notificationListRefetch = jest.fn();
const notificationCategoriesRefetch = jest.fn();
const resetPaginationOffset = jest.fn();

const mockQuestionnaireQuestion = createMockQuestionnaireQuestionsList()[0];
const mockQueryTagsSelectedByNotificationId = createMockTagsSelectedByNotificationIdQueryReturn();

const notificationUpsertDialogProps: NotificationDialogWithDataProps = {
    selectedNotificationID: "notification_id_1",
    onClose: jest.fn(),
    notificationCategoriesRefetch,
    notificationListRefetch,
    readCountOfNotificationsRefetch,
    resetPaginationOffset,
};

const ComposeFormWithHookFormProvider = (props: NotificationDialogWithDataProps) => {
    (useFeatureToggle as jest.Mock).mockImplementation(() => {
        return {
            isEnabled: true,
        };
    });

    const methods = useForm();

    return (
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider methodsOverride={methods}>
                        <NotificationDialogWithData {...props} />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
};

describe("<NotificationDialogWithData/>", () => {
    it("should render dialog notification", () => {
        (useNotificationDetail as jest.Mock).mockImplementation(
            (): UseNotificationDetailReturn => mockUseNotificationDetailReturn
        );

        (useNotificationMsgDetail as jest.Mock).mockImplementation(
            (): UseNotificationMsgDetailReturn => mockUseNotificationMsgDetailReturn
        );

        (useTagsSelectedByNotificationId as jest.Mock).mockReturnValue({
            data: mockQueryTagsSelectedByNotificationId,
            isFetching: false,
        });

        const wrapper: RenderResult = render(
            <ComposeFormWithHookFormProvider {...notificationUpsertDialogProps} />
        );

        expect(wrapper.queryByTestId("NotificationUpsertDialog__dialog")).toBeInTheDocument();
    });

    it("should render without notificationInfo", () => {
        (useNotificationDetail as jest.Mock).mockImplementation(
            (): UseNotificationDetailReturn => ({
                ...mockUseNotificationDetailReturn,
                notificationInfo: undefined,
            })
        );

        (useNotificationMsgDetail as jest.Mock).mockImplementation(() => ({
            ...mockUseNotificationMsgDetailReturn,
            notificationMsgDetail: {
                notification_msg_id:
                    mockUseNotificationDetailReturn.notificationInfo?.notification_id,
            },
        }));

        (useTagsSelectedByNotificationId as jest.Mock).mockReturnValue({
            data: mockQueryTagsSelectedByNotificationId,
            isFetching: false,
        });

        const wrapper: RenderResult = render(
            <ComposeFormWithHookFormProvider {...notificationUpsertDialogProps} />
        );

        expect(wrapper.queryByTestId("NotificationUpsertDialog__dialog")).toBeInTheDocument();
    });

    it("should render backdrop loading when fetching detail of notification", () => {
        (useNotificationDetail as jest.Mock).mockImplementation(
            (): UseNotificationDetailReturn => ({
                ...mockUseNotificationDetailReturn,
                isFetching: true,
            })
        );

        (useNotificationMsgDetail as jest.Mock).mockImplementation(
            (): UseNotificationMsgDetailReturn => ({
                ...mockUseNotificationMsgDetailReturn,
                isFetching: true,
            })
        );

        (useTagsSelectedByNotificationId as jest.Mock).mockReturnValue({
            data: mockQueryTagsSelectedByNotificationId,
            isFetching: false,
        });

        const wrapper: RenderResult = render(
            <ComposeFormWithHookFormProvider {...notificationUpsertDialogProps} />
        );

        expect(wrapper.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render questionnaire question and answer", () => {
        (useNotificationDetail as jest.Mock).mockImplementation(
            (): UseNotificationDetailReturn => ({
                ...mockUseNotificationDetailReturn,
                questionnaireQuestions: [mockQuestionnaireQuestion],
            })
        );

        (useNotificationMsgDetail as jest.Mock).mockImplementation(
            (): UseNotificationMsgDetailReturn => mockUseNotificationMsgDetailReturn
        );

        (useTagsSelectedByNotificationId as jest.Mock).mockReturnValue({
            data: mockQueryTagsSelectedByNotificationId,
            isFetching: false,
        });

        render(<ComposeFormWithHookFormProvider {...notificationUpsertDialogProps} />);

        const { questionnaire } = mockUseNotificationDetailReturn;

        expect(
            within(screen.getByTestId("DynamicQuestionSection__datePickerExpiration")).getByTestId(
                "DatePickerHF__input"
            )
        ).toHaveValue(formatDate(questionnaire?.expiration_date, "yyyy/LL/dd"));

        expect(
            within(screen.getByTestId("DynamicQuestionSection__timePickerExpiration")).getByTestId(
                "AutocompleteBase__input"
            )
        ).toHaveValue(formatDate(questionnaire?.expiration_date, "HH:mm"));

        expect(
            within(screen.getByTestId("DynamicQuestionSection__switchAllowResubmission")).getByRole(
                "checkbox"
            )
        ).not.toBeChecked();

        const questionSection = screen.getByTestId("QuestionSection__root");

        expect(within(questionSection).getByTestId("QuestionSection__inputQuestion")).toHaveValue(
            mockQuestionnaireQuestion.title
        );

        const switchBase = within(questionSection).getByTestId("SwitchLabelHF__switchBase");
        expect(within(switchBase).getByRole("checkbox")).not.toBeChecked();

        const questionType = within(questionSection).getByTestId(
            "QuestionSection__selectQuestionType"
        );
        expect(within(questionType).getByRole("textbox", { hidden: true })).toHaveValue(
            mockQuestionnaireQuestion.type
        );

        const answerItems = within(questionSection).getAllByTestId("AnswerItem__inputAnswer");
        answerItems.forEach((answerItem, answerIndex) => {
            expect(answerItem).toHaveValue(mockQuestionnaireQuestion.choices[answerIndex]);
        });
    });
});
