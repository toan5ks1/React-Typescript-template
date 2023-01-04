import { Features } from "src/squads/communication/common/constants/feature-keys";
import { createCsvFile, handleDownloadFile } from "src/squads/communication/common/utils/files";
import { getDateAfterDuration } from "src/squads/communication/common/utils/utils";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockQuestionnaireUserAnswer } from "src/squads/communication/test-utils/questionnaire";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import ActionPanelRecipient, {
    ActionPanelRecipientProps,
} from "src/squads/communication/pages/Notification/components/ActionPanelRecipient";

import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useDownloadQuestionnaireUserAnswersList from "src/squads/communication/pages/Notification/hooks/useDownloadQuestionnaireUserAnswersList";

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/communication/pages/Notification/hooks/useDownloadQuestionnaireUserAnswersList",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

jest.mock("src/squads/communication/common/utils/files", () => ({
    __esModule: true,
    createCsvFile: jest.fn(),
    handleDownloadFile: jest.fn(),
}));

const onOpenResendDialogMock = jest.fn();
const onOpenQuestionnaireResultDialogMock = jest.fn();
const onQuestionnaireUserAnswersListRefetchMock = jest.fn();

const defaultPropsActionPanelRecipient: ActionPanelRecipientProps = {
    readCountOfNotifications: [
        {
            notification_id: "notification_id_1",
            all_receiver_aggregate: { aggregate: { count: 2 } },
            read_aggregate: { aggregate: { count: 1 } },
        },
    ],
    onOpenResendDialog: onOpenResendDialogMock,
    onOpenQuestionnaireResultDialog: onOpenQuestionnaireResultDialogMock,
};

const mockActionPanelRecipientModules = () => {
    (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
        if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
            return {
                isEnabled: false,
            };
        }
    });

    (useDownloadQuestionnaireUserAnswersList as jest.Mock).mockReturnValue(
        onQuestionnaireUserAnswersListRefetchMock.mockResolvedValue(
            createMockQuestionnaireUserAnswer()
        )
    );
};

const renderActionPanelRecipient = (
    props: ActionPanelRecipientProps = defaultPropsActionPanelRecipient
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <ActionPanelRecipient {...props} />
            </TestQueryWrapper>
        </TestApp>
    );
};

//TODO: remove this describe when release epic: Notification | View Questionnaire.
//      Link epic:  https://manabie.atlassian.net/browse/LT-12927
describe("<ActionPanelRecipient /> just show button Notify Unread", () => {
    function expectDisabledResendButton(wrapper: RenderResult) {
        expect(wrapper.getByTestId("RecipientTable__buttonResend")).toBeInTheDocument();
        expect(wrapper.getByTestId("RecipientTable__buttonResend")).toBeDisabled();
    }

    it("should open dialog resend confirm when click button Notify Unread", () => {
        mockActionPanelRecipientModules();

        const wrapper = renderActionPanelRecipient();

        userEvent.click(wrapper.getByTestId("RecipientTable__buttonResend"));
        expect(onOpenResendDialogMock).toBeCalled();
    });

    it("should disable button Notify Unread when all recipients have read", () => {
        mockActionPanelRecipientModules();

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            readCountOfNotifications: [
                {
                    notification_id: "notification_id_1",
                    all_receiver_aggregate: { aggregate: { count: 1 } },
                    read_aggregate: { aggregate: { count: 1 } },
                },
            ],
        });

        expectDisabledResendButton(wrapper);
    });

    it("should disable button Notify Unread when don't have recipient", () => {
        mockActionPanelRecipientModules();

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            readCountOfNotifications: [],
        });

        expectDisabledResendButton(wrapper);
    });
});

describe("<ActionPanelRecipient /> render correct UI items of ActionPanel Recipient", () => {
    function mockFeatureFlagQuestionnaire() {
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
        });
    }

    function expectDisabledItemNotifyUnRead(wrapper: RenderResult) {
        expect(wrapper.getByLabelText("Notify Unread")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Notify Unread")).toHaveAttribute("aria-disabled", "true");
    }

    const dateNotExpired = getDateAfterDuration(1, "year");
    const dateExpired = new Date("2021-12-01T00:00:00+00:00");

    it("should show full action items when have questionnaire expiration date", () => {
        mockActionPanelRecipientModules();
        mockFeatureFlagQuestionnaire();

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            questionExpirationDate: dateNotExpired,
        });

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expect(wrapper.getByLabelText("Notify Unread")).toBeInTheDocument();
        expect(wrapper.getByLabelText("View Result")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Download Result")).toBeInTheDocument();
    });

    it("should just show button Notify Unread when don't have questionnaire expiration date", () => {
        mockActionPanelRecipientModules();
        mockFeatureFlagQuestionnaire();

        const wrapper = renderActionPanelRecipient();

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expect(wrapper.getByLabelText("Notify Unread")).toBeInTheDocument();
        expect(wrapper.queryByLabelText("View Result")).not.toBeInTheDocument();
        expect(wrapper.queryByLabelText("Download Result")).not.toBeInTheDocument();
    });

    it("should disable item Notify Unread when all recipients have read", () => {
        mockActionPanelRecipientModules();

        mockFeatureFlagQuestionnaire();

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            questionExpirationDate: dateNotExpired,
            readCountOfNotifications: [
                {
                    notification_id: "notification_id",
                    all_receiver_aggregate: { aggregate: { count: 1 } },
                    read_aggregate: { aggregate: { count: 1 } },
                },
            ],
        });

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expectDisabledItemNotifyUnRead(wrapper);
    });

    it("should disable item Notify Unread when don't have recipient", () => {
        mockActionPanelRecipientModules();

        mockFeatureFlagQuestionnaire();

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            questionExpirationDate: dateNotExpired,
            readCountOfNotifications: [],
        });

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expectDisabledItemNotifyUnRead(wrapper);
    });

    it("should disable item Notify Unread when questionnaire expiration date is expired", () => {
        mockActionPanelRecipientModules();
        mockFeatureFlagQuestionnaire();

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            questionExpirationDate: dateExpired,
        });

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expectDisabledItemNotifyUnRead(wrapper);
    });
});

describe("<ActionPanelRecipient /> handle onClick of action items in ActionPanelRecipient", () => {
    const dateNotExpiry = getDateAfterDuration(1, "year");

    it("should open dialog resend confirm when click item Notify Unread", () => {
        mockActionPanelRecipientModules();
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
        });

        const wrapper = renderActionPanelRecipient();

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expect(wrapper.getByLabelText("Notify Unread")).toBeInTheDocument();
        userEvent.click(wrapper.getByLabelText("Notify Unread"));

        expect(onOpenResendDialogMock).toBeCalled();
    });

    it("should call onOpen of view questionnaire result dialog", () => {
        mockActionPanelRecipientModules();
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
        });

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            questionExpirationDate: getDateAfterDuration(1, "year"),
        });

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expect(wrapper.getByLabelText("View Result")).toBeInTheDocument();
        userEvent.click(wrapper.getByLabelText("View Result"));

        expect(onOpenQuestionnaireResultDialogMock).toBeCalled();
    });

    it("should download questionnaire result when have data answers list and click item Download result", async () => {
        mockActionPanelRecipientModules();
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
        });

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            questionExpirationDate: dateNotExpiry,
        });

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expect(wrapper.getByLabelText("Download Result")).toBeInTheDocument();
        userEvent.click(wrapper.getByLabelText("Download Result"));

        await waitFor(() => {
            expect(onQuestionnaireUserAnswersListRefetchMock).toHaveBeenCalledTimes(1);
        });

        expect(createCsvFile).toHaveBeenCalledTimes(1);

        expect(handleDownloadFile).toHaveBeenCalledTimes(1);

        expect(wrapper.queryByLabelText("Download Result")).not.toBeInTheDocument();
    });

    it("should not download questionnaire result when list answers is empty", async () => {
        mockActionPanelRecipientModules();
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_QUESTIONNAIRE) {
                return {
                    isEnabled: true,
                };
            }
        });

        (useDownloadQuestionnaireUserAnswersList as jest.Mock).mockReturnValue(
            onQuestionnaireUserAnswersListRefetchMock.mockResolvedValue({
                data: {},
            })
        );

        const wrapper = renderActionPanelRecipient({
            ...defaultPropsActionPanelRecipient,
            questionExpirationDate: dateNotExpiry,
        });

        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        expect(wrapper.getByLabelText("Download Result")).toBeInTheDocument();
        userEvent.click(wrapper.getByLabelText("Download Result"));

        await waitFor(() => {
            expect(onQuestionnaireUserAnswersListRefetchMock).toHaveBeenCalledTimes(1);
        });

        expect(createCsvFile).not.toBeCalled();
        expect(handleDownloadFile).not.toBeCalled();

        expect(wrapper.queryByLabelText("Download Result")).not.toBeInTheDocument();
    });
});
