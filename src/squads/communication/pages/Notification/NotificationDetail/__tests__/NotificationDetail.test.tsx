import { createMemoryHistory } from "history";
import { Router, useParams } from "react-router";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { joinArrayObjectString } from "src/squads/communication/common/utils/utils";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockTagsSelectedByNotificationIdQueryReturn } from "src/squads/communication/test-utils/query-data";
import { createMockQuestionnaireUserAnswer } from "src/squads/communication/test-utils/questionnaire";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useDialog from "src/squads/communication/hooks/useDialog";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import NotificationDetail from "src/squads/communication/pages/Notification/NotificationDetail/NotificationDetail";
import useNotificationDetail, {
    UseNotificationDetailReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import { mockUseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail/__mocks__";
import useNotificationMsgDetail, {
    UseNotificationMsgDetailReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";
import { mockUseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail/__mocks__";
import useNotificationMutation from "src/squads/communication/pages/Notification/hooks/useNotificationMutation";
import useNotificationUserRead from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";
import useQuestionnaireUserAnswersList from "src/squads/communication/pages/Notification/hooks/useQuestionnaireUserAnswersList/useQuestionnaireUserAnswersList";
import useTagsSelectedByNotificationId from "src/squads/communication/pages/Notification/hooks/useTagsSelectedByNotificationId";

jest.mock(
    "src/squads/communication/pages/Notification/hooks/useQuestionnaireUserAnswersList/useQuestionnaireUserAnswersList",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useParams: jest.fn(),
    };
});

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationMutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useDialog", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationUserRead", () => ({
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

const mockOnResendNotification = jest.fn();
const onCloseMock = jest.fn();

const mockUserAnswers = createMockQuestionnaireUserAnswer();
const mockQueryTagsSelectedByNotificationId = createMockTagsSelectedByNotificationIdQueryReturn();

const mockNotificationDetailModules = () => {
    (useTagsSelectedByNotificationId as jest.Mock).mockReturnValue({
        data: [],
        isFetching: false,
    });

    //TODO: remove when release feature flag NOTIFICATION_QUESTIONNAIRE, NOTIFICATION_TAGS on production
    (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
        if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
            return {
                isEnabled: false,
            };
        }
        if (toggleName === Features.NOTIFICATION_TAGS) {
            return { isEnabled: false };
        }
        if (toggleName === Features.NOTIFICATION_CONSOLIDATED_STATISTIC) {
            return { isEnabled: false };
        }
    });

    (useDialog as jest.Mock).mockReturnValue({
        open: false,
        onClose: onCloseMock,
    });

    (useNotificationDetail as jest.Mock).mockReturnValue(mockUseNotificationDetailReturn);

    (useNotificationMsgDetail as jest.Mock).mockReturnValue(mockUseNotificationMsgDetailReturn);

    (useParams as jest.Mock).mockImplementation(() => ({ id: "notification_id_1" }));

    (useNotificationMutation as jest.Mock).mockImplementation(() => {
        return {
            onResend: mockOnResendNotification,
        };
    });

    (useNotificationUserRead as jest.Mock).mockReturnValue({
        readCountOfNotifications: [
            {
                all_receiver_aggregate: { aggregate: { count: 2 } },
                read_aggregate: { aggregate: { count: 1 } },
            },
        ],
    });

    (useQuestionnaireUserAnswersList as jest.Mock).mockReturnValue({
        isLoadingAnswer: false,
        answers: mockUserAnswers,
    });
};

const renderNotificationDetailHookTestComponent = async (shouldRenderLoading = false) => {
    const wrapper: RenderResult = render(
        <TestApp>
            <TestQueryWrapper>
                <NotificationDetail />
            </TestQueryWrapper>
        </TestApp>
    );

    await waitFor(() => {
        shouldRenderLoading
            ? expect(wrapper.queryByTestId("NotificationDetail")).not.toBeInTheDocument()
            : expect(wrapper.queryByTestId("NotificationDetail")).toBeInTheDocument();
    });

    return wrapper;
};

const renderNotificationDetailHookWithRouterTestComponent = async (redirectTo: string) => {
    const history = createMemoryHistory();

    const wrapper: RenderResult = render(
        <TestApp>
            <Router history={history}>
                <TestQueryWrapper>
                    <NotificationDetail />
                </TestQueryWrapper>
            </Router>
        </TestApp>
    );

    expect(history.location.pathname).toBe(redirectTo);

    return wrapper;
};

describe("<NotificationDetail />", () => {
    it("should render correct UI NotificationDetail when NOTIFICATION_QUESTIONNAIRE feature is on", async () => {
        mockNotificationDetailModules();

        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: false };
            }
            if (toggleName === Features.NOTIFICATION_CONSOLIDATED_STATISTIC) {
                return { isEnabled: false };
            }
        });

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));
        expect(wrapper.getByText("Notify Unread")).toBeInTheDocument();
        expect(wrapper.getByText("View Result")).toBeInTheDocument();
        expect(wrapper.getByText("Download Result")).toBeInTheDocument();
        // Expect appear two label questionnaire (one in QuestionnaireDetailSection & one in RecipientTable)
        expect(wrapper.getAllByText("Questionnaire")).toHaveLength(2);
        expect(wrapper.getByTestId("QuestionnaireDetailSection__container")).toBeInTheDocument();
    });

    it("should render correct UI NotificationDetail when hidden feature of Questionnaire", async () => {
        mockNotificationDetailModules();

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        expect(wrapper.getAllByText("General Info")).toHaveLength(1);
        expect(wrapper.getAllByText("Notify Unread")).toHaveLength(1);
        expect(wrapper.getByTestId("NotificationGeneralInfo__container")).toBeInTheDocument();
        expect(wrapper.getByTestId("Recipient__table")).toBeInTheDocument();
        expect(wrapper.getByTestId("RecipientTable__buttonResend")).toBeInTheDocument();
    });

    it("should render correct breadcrumbNotification", async () => {
        mockNotificationDetailModules();
        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        expect(wrapper.queryAllByTestId("Breadcrumbs__entityName").length).toEqual(1);

        expect(wrapper.getByTestId("BreadcrumbItem").querySelector("span")).toHaveTextContent(
            "resources.notifications.name"
        );
        expect(wrapper.getByTestId("BreadcrumbItem")).toHaveAttribute(
            "href",
            "/communication/notifications"
        );

        expect(wrapper.getByTestId("Breadcrumbs__entityName")).toHaveTextContent(
            "info notification msgs 1"
        );
    });

    it("should not have its content being word-break", async () => {
        mockNotificationDetailModules();
        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        expect(wrapper.queryByTestId("Editor__draftEditor")).not.toHaveStyle({
            wordBreak: "break-all",
        });
    });

    it("should render loading icon when notificationId or notificationInfo or notificationMsgDetail is falsy or data is fetching", async () => {
        mockNotificationDetailModules();

        (useNotificationDetail as jest.Mock).mockImplementation((): UseNotificationDetailReturn => {
            return {
                ...mockUseNotificationDetailReturn,
                notificationInfo: undefined,
                isFetching: true,
            };
        });

        (useNotificationMsgDetail as jest.Mock).mockImplementation(
            (): UseNotificationMsgDetailReturn => {
                return {
                    ...mockUseNotificationMsgDetailReturn,
                    notificationMsgDetail: undefined,
                    isFetching: true,
                };
            }
        );

        (useParams as jest.Mock).mockImplementation(() => ({ id: "" }));

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent(true);

        expect(wrapper.queryByTestId("NotificationDetail")).not.toBeInTheDocument();
        expect(wrapper.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("it should redirect to page not found when notificationId or notificationInfo or notificationMsgDetail is falsy and data is done fetching", async () => {
        mockNotificationDetailModules();

        (useNotificationDetail as jest.Mock).mockImplementation((): UseNotificationDetailReturn => {
            return {
                ...mockUseNotificationDetailReturn,
                notificationInfo: undefined,
                isFetching: false,
            };
        });

        (useNotificationMsgDetail as jest.Mock).mockImplementation(
            (): UseNotificationMsgDetailReturn => {
                return {
                    ...mockUseNotificationMsgDetailReturn,
                    notificationMsgDetail: undefined,
                    isFetching: false,
                };
            }
        );

        (useParams as jest.Mock).mockImplementation(() => ({ id: "" }));

        const wrapper: RenderResult = await renderNotificationDetailHookWithRouterTestComponent(
            "/page-not-found"
        );

        expect(wrapper.queryByTestId("NotificationDetail")).not.toBeInTheDocument();
    });

    it("should open correctly notification questionnaire result dialog", async () => {
        mockNotificationDetailModules();

        (useDialog as jest.Mock).mockReturnValue({
            open: true,
        });

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        expect(
            wrapper.getByTestId("NotificationQuestionnaireResultDialog__dialog")
        ).toBeInTheDocument();
        expect(
            wrapper.queryByTestId("NotificationQuestionnaireResultDialog__loading")
        ).not.toBeInTheDocument();
    });

    it("should open loading notification questionnaire result dialog", async () => {
        mockNotificationDetailModules();

        (useDialog as jest.Mock).mockReturnValue({
            open: true,
        });

        (useQuestionnaireUserAnswersList as jest.Mock).mockReturnValue({
            isLoadingAnswer: true,
            answers: undefined,
        });

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        expect(
            wrapper.queryByTestId("NotificationQuestionnaireResultDialog__dialog")
        ).not.toBeInTheDocument();
        expect(
            wrapper.getByTestId("NotificationQuestionnaireResultDialog__loading")
        ).toBeInTheDocument();
    });

    it("should call close dialog resend confirm", async () => {
        mockNotificationDetailModules();

        (useDialog as jest.Mock).mockReturnValue({
            open: true,
            onClose: onCloseMock,
        });

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(onCloseMock).toBeCalled();
    });

    it("should call resend function", async () => {
        mockNotificationDetailModules();

        (useDialog as jest.Mock).mockReturnValue({
            open: true,
            onClose: onCloseMock,
        });

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));
        expect(mockOnResendNotification).toBeCalled();
    });

    it("should hidden ActionPanelRecipient when useNotificationUserRead return empty readCountOfNotifications", async () => {
        mockNotificationDetailModules();

        (useNotificationUserRead as jest.Mock).mockReturnValue({
            readCountOfNotifications: [],
        });

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        expect(wrapper.queryByTestId("ActionPanel__trigger")).not.toBeInTheDocument();
    });
});

describe("<NotificationDetail /> without questionnaire detail", () => {
    it("should render correct UI NotificationDetail when NOTIFICATION_QUESTIONNAIRE feature is on", async () => {
        mockNotificationDetailModules();

        (useNotificationDetail as jest.Mock).mockImplementation((): UseNotificationDetailReturn => {
            return { ...mockUseNotificationDetailReturn, questionnaire: undefined };
        });

        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: false };
            }
            if (toggleName === Features.NOTIFICATION_CONSOLIDATED_STATISTIC) {
                return { isEnabled: false };
            }
        });

        const wrapper: RenderResult = await renderNotificationDetailHookTestComponent();

        expect(wrapper.queryAllByText("Questionnaire")).toHaveLength(0);
        expect(
            wrapper.queryByTestId("QuestionnaireDetailSection__container")
        ).not.toBeInTheDocument();
    });
});

describe("<NotificationDetail /> with tag", () => {
    it("should render tag default UI", async () => {
        mockNotificationDetailModules();

        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: false,
                };
            }
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: true };
            }
            if (toggleName === Features.NOTIFICATION_CONSOLIDATED_STATISTIC) {
                return { isEnabled: false };
            }
        });

        (useTagsSelectedByNotificationId as jest.Mock).mockReturnValue({
            data: [],
            isFetching: false,
        });

        await renderNotificationDetailHookTestComponent();

        expect(screen.getByTestId("NotificationGeneralInfo__tags")).toHaveTextContent("--");
    });

    it("should render tag names", async () => {
        mockNotificationDetailModules();

        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: false,
                };
            }
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: true };
            }
            if (toggleName === Features.NOTIFICATION_CONSOLIDATED_STATISTIC) {
                return { isEnabled: false };
            }
        });

        (useTagsSelectedByNotificationId as jest.Mock).mockReturnValue({
            data: mockQueryTagsSelectedByNotificationId,
            isFetching: false,
        });

        await renderNotificationDetailHookTestComponent();

        const tagNames = joinArrayObjectString(mockQueryTagsSelectedByNotificationId, "tag_name");

        expect(screen.getByTestId("NotificationGeneralInfo__tags")).toHaveTextContent(tagNames);
    });

    it("should render consolidated statistic", async () => {
        mockNotificationDetailModules();

        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: false };
            }
            if (toggleName === Features.NOTIFICATION_CONSOLIDATED_STATISTIC) {
                return { isEnabled: true };
            }
        });

        await renderNotificationDetailHookTestComponent();

        screen.getAllByTestId("QuestionSummary__respondents").forEach((respondent) => {
            expect(respondent).toBeInTheDocument();
        });
    });
});
