import { useCallback } from "react";

import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { ERPModules } from "src/common/constants/enum";
import { pick1stElement } from "src/common/utils/other";
import { Features } from "src/squads/communication/common/constants/feature-keys";

import { Box, Grid } from "@mui/material";
import Breadcrumbs from "src/components/Breadcrumbs";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DividerDashed from "src/components/Divider/DividerDashed";
import Loading from "src/components/Loading";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import ActionPanelRecipient from "src/squads/communication/pages/Notification/components/ActionPanelRecipient";
import NotificationQuestionnaireResultDialog from "src/squads/communication/pages/Notification/components/Dialogs/NotificationQuestionnaireResultDialog";
import HeaderNotification from "src/squads/communication/pages/Notification/components/HeaderNotification/HeaderNotification";
import NotificationGeneralInfo from "src/squads/communication/pages/Notification/components/NotificationGeneralInfo";
import QuestionnaireDetailSection from "src/squads/communication/pages/Notification/components/QuestionnaireDetailSection";
import RecipientTable from "src/squads/communication/pages/Notification/components/Tables/RecipientTable";

import useTagsSelectedByNotificationId from "../hooks/useTagsSelectedByNotificationId";

import useDialog from "src/squads/communication/hooks/useDialog";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import useNotificationDetail from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import useNotificationMsgDetail from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";
import useNotificationMutation from "src/squads/communication/pages/Notification/hooks/useNotificationMutation";
import useNotificationUserRead from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";

const NotificationDetail = () => {
    const t = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const { isEnabled: isShowNotificationQuestionnaire } = useFeatureToggle(
        Features.NOTIFICATION_QUESTIONNAIRE
    );
    const { id: notificationId } = useParams<{ id: string }>();

    const {
        open: shouldOpenResendDialog,
        onClose: onCloseResendDialog,
        onOpen: onOpenResendDialog,
    } = useDialog();

    const {
        open: shouldOpenQuestionnaireResultDialog,
        onClose: onCloseQuestionnaireResultDialog,
        onOpen: onOpenQuestionnaireResultDialog,
    } = useDialog();

    const { readCountOfNotifications } = useNotificationUserRead({
        notification_id: notificationId ? [notificationId] : [],
    });

    const { onResend } = useNotificationMutation();

    const {
        notificationInfo,
        questionnaire,
        questionnaireQuestions,
        questionnaireUserAnswers,
        receivers,
        courses,
        isFetching: isFetchingNotificationDetail,
    } = useNotificationDetail(notificationId);

    const {
        notificationMsgDetail,
        mediaList,
        isFetching: isFetchingNotificationMsgDetail,
    } = useNotificationMsgDetail(notificationInfo?.notification_msg_id || undefined);

    const { data: tags, isFetching: isFetchingTags } = useTagsSelectedByNotificationId({
        notificationId,
    });

    const onClickResend = useCallback(() => {
        onResend({
            data: {
                notificationId,
            },
        });

        onCloseResendDialog();
    }, [notificationId, onCloseResendDialog, onResend]);

    if (isFetchingNotificationDetail || isFetchingNotificationMsgDetail || isFetchingTags) {
        return <Loading />;
    } else if (!notificationId || !notificationInfo || !notificationMsgDetail) {
        return <Redirect to={"/page-not-found"} />;
    }

    return (
        <WrapperPageContent>
            <Breadcrumbs resource={ERPModules.NOTIFICATIONS} name={notificationMsgDetail.title} />

            <HeaderNotification
                notificationInfo={notificationInfo}
                notificationMsgDetail={notificationMsgDetail}
            />

            <Grid data-testid="NotificationDetail" container spacing={3}>
                <Grid item xs={12}>
                    <Box mb={2}>
                        <TypographyHeader>{tNotification("title.generalInfo")}</TypographyHeader>
                    </Box>
                    <NotificationGeneralInfo
                        tags={tags}
                        notificationInfo={notificationInfo}
                        notificationMsgDetail={notificationMsgDetail}
                        courses={courses}
                        receivers={receivers}
                        mediaList={mediaList}
                    />
                </Grid>
                <Grid item xs={12}>
                    <DividerDashed />
                </Grid>

                {isShowNotificationQuestionnaire && questionnaire && questionnaireQuestions && (
                    <>
                        <Grid item xs={12}>
                            <Box mb={2}>
                                <TypographyHeader>
                                    {tNotification("label.questionnaire")}
                                </TypographyHeader>
                            </Box>
                            <QuestionnaireDetailSection
                                questionnaire={questionnaire}
                                questionnaireQuestions={questionnaireQuestions}
                                questionnaireUserAnswers={questionnaireUserAnswers}
                                numberOfRecipient={
                                    pick1stElement(readCountOfNotifications)?.all_receiver_aggregate
                                        .aggregate?.count ?? 0
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DividerDashed />
                        </Grid>
                    </>
                )}
                <Grid item xs={12}>
                    <Box mb={2} display="flex">
                        <Box flexGrow={1}>
                            <TypographyHeader>
                                {tNotification("label.recipient", { smart_count: 2 })}
                            </TypographyHeader>
                        </Box>

                        <ActionPanelRecipient
                            readCountOfNotifications={readCountOfNotifications}
                            questionnaireId={questionnaire?.questionnaire_id}
                            questionExpirationDate={questionnaire?.expiration_date}
                            onOpenResendDialog={onOpenResendDialog}
                            onOpenQuestionnaireResultDialog={onOpenQuestionnaireResultDialog}
                        />
                    </Box>
                    <RecipientTable
                        notificationId={notificationId}
                        isHaveQuestionnaireData={Boolean(questionnaire)}
                    />
                </Grid>
            </Grid>

            <DialogCancelConfirm
                data-testid="NotificationDetail__dialogResendConfirm"
                textCancelDialog={t("ra.common.resendNotification")}
                title={t("resources.notifications.button.notifyUnread")}
                {...{
                    footerConfirmButtonProps: {
                        color: "primary",
                    },
                }}
                open={shouldOpenResendDialog}
                onSave={onClickResend}
                onClose={onCloseResendDialog}
            />

            {notificationInfo.questionnaire_id && shouldOpenQuestionnaireResultDialog && (
                <NotificationQuestionnaireResultDialog
                    onClose={onCloseQuestionnaireResultDialog}
                    questionnaireId={notificationInfo.questionnaire_id}
                />
            )}
        </WrapperPageContent>
    );
};

export default NotificationDetail;
