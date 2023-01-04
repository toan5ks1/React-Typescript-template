import { ERPModules, MutationMenus } from "src/common/constants/enum";
import { pick1stElement } from "src/common/utils/other";
import { dateIsAfter } from "src/common/utils/time";
import { FileType } from "src/squads/communication/common/constants/enum";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import {
    NotificationFormData,
    Questionnaire,
} from "src/squads/communication/common/constants/types";
import { handleDownloadFile } from "src/squads/communication/common/utils/files";
import { createCsvFileQuestionnaireResult } from "src/squads/communication/common/utils/questionnaire-table-utils";

import { NotificationImportantOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";

import { UseDialogReturn } from "src/squads/communication/hooks/useDialog";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import useDownloadQuestionnaireUserAnswersList from "src/squads/communication/pages/Notification/hooks/useDownloadQuestionnaireUserAnswersList";
import { UseNotificationUserReadReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";

const shouldDisableNotifyUnreadButton = (
    readCountOfNotifications: UseNotificationUserReadReturn["readCountOfNotifications"],
    isShowNotificationQuestionnaire: boolean,
    questionnaireExpiration?: NotificationFormData["expirationDate"]
): boolean => {
    // Disable button NotifyUnread when having questionnaire and questionnaireExpiration < today
    if (
        isShowNotificationQuestionnaire &&
        questionnaireExpiration &&
        dateIsAfter(new Date(), new Date(questionnaireExpiration), "millisecond")
    )
        return true;

    // Don't have recipient
    if (!readCountOfNotifications || !readCountOfNotifications.length) return true;

    // All recipients have read notification
    return (
        pick1stElement(readCountOfNotifications)!.all_receiver_aggregate.aggregate?.count ===
        pick1stElement(readCountOfNotifications)!.read_aggregate.aggregate?.count
    );
};

export interface ActionPanelRecipientProps {
    onOpenResendDialog: UseDialogReturn["onOpen"];
    onOpenQuestionnaireResultDialog: UseDialogReturn["onOpen"];
    questionExpirationDate?: NotificationFormData["expirationDate"];
    questionnaireId?: Questionnaire["questionnaireId"];
    readCountOfNotifications: UseNotificationUserReadReturn["readCountOfNotifications"];
}

const ActionPanelRecipient = ({
    onOpenResendDialog,
    onOpenQuestionnaireResultDialog,
    questionExpirationDate,
    questionnaireId,
    readCountOfNotifications,
}: ActionPanelRecipientProps) => {
    const t = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const { isEnabled: isShowNotificationQuestionnaire } = useFeatureToggle(
        Features.NOTIFICATION_QUESTIONNAIRE
    );

    const isDisableNotifyUnreadButton = shouldDisableNotifyUnreadButton(
        readCountOfNotifications,
        isShowNotificationQuestionnaire,
        questionExpirationDate
    );

    const questionnaireUserAnswersListRefetch = useDownloadQuestionnaireUserAnswersList({
        questionnaireId: questionnaireId || "",
        limit:
            pick1stElement(readCountOfNotifications)?.all_receiver_aggregate.aggregate?.count ||
            undefined,
    });

    const getActionsOfActionPanelRecipient = (): Action[] => {
        let actions = [
            {
                label: t("ra.common.action.notifyUnread"),
                action: MutationMenus.COMMUNICATION_NOTIFY_UNREAD,
            },
        ];

        // Without questionnaire don't have options view filter and download csv
        if (questionExpirationDate) {
            actions = [
                ...actions,
                {
                    label: t("ra.common.action.viewResultQuestionnaire"),
                    action: MutationMenus.COMMUNICATION_VIEW_RESULT_QUESTIONNAIRE,
                },
                {
                    label: t("ra.common.action.downloadResultQuestionnaire"),
                    action: MutationMenus.COMMUNICATION_DOWNLOAD_RESULT_QUESTIONNAIRE,
                },
            ];
        }

        return actions;
    };

    const onDownloadQuestionnaireResultByCsv = async () => {
        const answers = await questionnaireUserAnswersListRefetch();

        if (answers?.userAnswersList && answers?.questionsList) {
            const csvFile = createCsvFileQuestionnaireResult(answers, tNotification);
            handleDownloadFile(
                csvFile,
                t("ra.common.action.downloadResultQuestionnaire"),
                FileType.CSV
            );
        }
    };

    const onMutationMenuListRecipient = async (action: MutationMenus) => {
        switch (action) {
            case MutationMenus.COMMUNICATION_NOTIFY_UNREAD: {
                onOpenResendDialog();
                break;
            }
            case MutationMenus.COMMUNICATION_VIEW_RESULT_QUESTIONNAIRE: {
                onOpenQuestionnaireResultDialog();
                break;
            }
            case MutationMenus.COMMUNICATION_DOWNLOAD_RESULT_QUESTIONNAIRE: {
                await onDownloadQuestionnaireResultByCsv();
                break;
            }
        }
    };

    return (
        <Box>
            {isShowNotificationQuestionnaire ? (
                <ActionPanel
                    buttonStyle="square"
                    actions={getActionsOfActionPanelRecipient()}
                    onAction={onMutationMenuListRecipient}
                    recordName=""
                    disables={{
                        [MutationMenus.COMMUNICATION_NOTIFY_UNREAD]: isDisableNotifyUnreadButton,
                    }}
                />
            ) : (
                <ButtonPrimaryOutlined
                    startIcon={<NotificationImportantOutlined />}
                    onClick={onOpenResendDialog}
                    data-testid="RecipientTable__buttonResend"
                    disabled={isDisableNotifyUnreadButton}
                >
                    {tNotification("button.notifyUnread")}
                </ButtonPrimaryOutlined>
            )}
        </Box>
    );
};

export default ActionPanelRecipient;
