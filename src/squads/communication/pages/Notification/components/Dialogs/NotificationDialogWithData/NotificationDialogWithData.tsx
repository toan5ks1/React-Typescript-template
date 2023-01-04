import { memo } from "react";

import { InfoNotification } from "src/squads/communication/common/constants/types";

import BackdropLoading from "src/components/Backdrops/BackdropLoading";

import NotificationUpsertDialog from "../NotificationUpsertDialog";

import { UseNotificationCategoriesReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationCategories";
import useNotificationDetail from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import useNotificationFormData from "src/squads/communication/pages/Notification/hooks/useNotificationFormData";
import { UseNotificationListReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationList";
import useNotificationMsgDetail from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";
import useTagsSelectedByNotificationId from "src/squads/communication/pages/Notification/hooks/useTagsSelectedByNotificationId";

export interface NotificationDialogWithDataProps {
    onClose: () => void;
    selectedNotificationID: InfoNotification["notification_id"];
    notificationCategoriesRefetch: UseNotificationCategoriesReturn["notificationCategoriesRefetch"];
    readCountOfNotificationsRefetch: UseNotificationListReturn["readCountOfNotificationsRefetch"];
    notificationListRefetch: UseNotificationListReturn["notificationListRefetch"];
    resetPaginationOffset: UseNotificationListReturn["resetPaginationOffset"];
}

const NotificationDialogWithData = ({
    onClose,
    selectedNotificationID,
    notificationCategoriesRefetch,
    readCountOfNotificationsRefetch,
    notificationListRefetch,
    resetPaginationOffset,
}: NotificationDialogWithDataProps) => {
    const {
        notificationInfo,
        courses,
        receivers,
        questionnaire,
        questionnaireQuestions,
        isFetching: isFetchingNotificationDetail,
    } = useNotificationDetail(selectedNotificationID);

    const { notificationMsgDetail, isFetching: isFetchingNotificationMsgDetail } =
        useNotificationMsgDetail(notificationInfo?.notification_msg_id || undefined);

    const { data: tags, isFetching: isFetchingTags } = useTagsSelectedByNotificationId({
        notificationId: selectedNotificationID,
    });

    const { formData: notificationData } = useNotificationFormData({
        receivers,
        courses,
        notificationInfo,
        notificationMsgDetail,
        questionnaire,
        questionnaireQuestions,
        tags,
    });

    if (isFetchingNotificationDetail || isFetchingNotificationMsgDetail || isFetchingTags)
        return <BackdropLoading open />;

    return (
        <NotificationUpsertDialog
            notificationData={notificationData}
            onClose={onClose}
            notificationCategoriesRefetch={notificationCategoriesRefetch}
            notificationListRefetch={notificationListRefetch}
            readCountOfNotificationsRefetch={readCountOfNotificationsRefetch}
            resetPaginationOffset={resetPaginationOffset}
        />
    );
};

export default memo(NotificationDialogWithData);
