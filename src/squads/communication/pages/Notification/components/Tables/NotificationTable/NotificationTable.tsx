import { useCallback, useMemo, useState } from "react";

import { useHistory } from "react-router";
import { KeyNotificationStatus } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { MicroFrontendTypes } from "src/routing/type";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import {
    InfoNotification,
    NotificationCategories,
    NotificationStatusType,
} from "src/squads/communication/common/constants/types";
import {
    checkDraftStatus,
    checkScheduleStatus,
    checkSentStatus,
} from "src/squads/communication/common/utils/utils";
import { InfoNotificationsGetStatusByIdQuery } from "src/squads/communication/service/bob/bob-types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import { Box, Skeleton } from "@mui/material";
import StyledLink from "src/components/StyledLink";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import ChipNotificationStatus from "src/squads/communication/pages/Notification/components/ChipNotificationStatus";
import NotificationDialogWithData from "src/squads/communication/pages/Notification/components/Dialogs/NotificationDialogWithData";
import TypographyNotificationDate from "src/squads/communication/pages/Notification/components/TypographyNotificationDate";

import ReadCountColumn from "./ReadCountColumn";

import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import { UseNotificationCategoriesReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationCategories";
import { UseNotificationListReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationList";
import { UseNotificationUserReadReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";

export const getCountOfNotifications = (
    typeCount: NotificationCategories,
    statusNotification?: NotificationStatusType
): number => {
    switch (statusNotification) {
        case KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT:
            return typeCount.draft;
        case KeyNotificationStatus.NOTIFICATION_STATUS_SENT:
            return typeCount.sent;
        case KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED:
            return typeCount.schedule;
        default:
            return typeCount.all;
    }
};

const getReadCountOfNotifications = (
    record: InfoNotification,
    readCountOfNotifications: UseNotificationUserReadReturn["readCountOfNotifications"]
) => {
    let allReceiverUsers: number = 0;
    let readUsers: number = 0;

    if (!record.notification_id || !arrayHasItem(readCountOfNotifications)) {
        return { allReceiverUsers, readUsers };
    }

    const notification = readCountOfNotifications.find(
        (notification) => notification.notification_id === record.notification_id
    );

    if (notification) {
        const { all_receiver_aggregate, read_aggregate } = notification;

        if (
            all_receiver_aggregate &&
            all_receiver_aggregate.aggregate &&
            all_receiver_aggregate.aggregate.count
        ) {
            allReceiverUsers = all_receiver_aggregate.aggregate.count;
        }

        if (read_aggregate && read_aggregate.aggregate && read_aggregate.aggregate.count) {
            readUsers = read_aggregate.aggregate.count;
        }
    }

    return { allReceiverUsers, readUsers };
};

export interface NotificationTableProps {
    notificationListHookData: UseNotificationListReturn;
    notificationCategoriesHookData: UseNotificationCategoriesReturn;
    notificationCategory?: NotificationStatusType;
}

const NotificationTable = ({
    notificationListHookData,
    notificationCategoriesHookData,
    notificationCategory,
}: NotificationTableProps) => {
    const {
        pagination,
        notificationInfoList,
        readCountOfNotifications,
        readCountOfNotificationsLoading,
        notificationListLoading,
        composerList,
        isFetchingComposerList,
        notificationMsgTitles,
        notificationMsgTitlesFetched,
        notificationListRefetch,
        readCountOfNotificationsRefetch,
        resetPaginationOffset,
    } = notificationListHookData;

    const { notificationCategories, notificationCategoriesLoading, notificationCategoriesRefetch } =
        notificationCategoriesHookData;

    const [selectedNotificationID, setSelectedNotificationID] =
        useState<InfoNotification["notification_id"]>("");
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const showSnackbar = useShowSnackbar();
    const history = useHistory();

    const { isEnabled: isShowScheduleManagement } = useFeatureToggle(
        Features.NOTIFICATION_SCHEDULE_MANAGEMENT
    );

    const t = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const onSuccessGetNotificationStatus = useCallback(
        (
            data:
                | ArrayElement<InfoNotificationsGetStatusByIdQuery["info_notifications"]>
                | undefined
        ) => {
            const actualStatus = data?.status;

            if (!actualStatus) {
                showSnackbar(tNotification("message.reloadPage"), "error");
                return;
            }

            if (checkSentStatus(actualStatus)) {
                history.push(
                    `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}/${selectedNotificationID}/show`
                );
            }

            if (checkDraftStatus(actualStatus) || checkScheduleStatus(actualStatus)) {
                setIsUpdateDialogOpen(true);
            }
        },
        [history, selectedNotificationID, showSnackbar, tNotification]
    );

    const { refetch: refetchNotificationStatus } = inferQuery({
        entity: "infoNotifications",
        action: "communicationGetStatusByNotificationId",
    })(
        { notification_id: selectedNotificationID },

        {
            enabled: Boolean(selectedNotificationID),
            onError: (error) => {
                window.warner?.warn(
                    "NotificationTable component ERROR communicationGetStatusByNotificationId",
                    error
                );

                showSnackbar(t(error.message), "error");
            },
            onSuccess: onSuccessGetNotificationStatus,
        }
    );

    const onClickNotificationRowTitle = useCallback(
        (e: React.MouseEvent, record: InfoNotification) => {
            if (!checkSentStatus(record.status)) {
                e.preventDefault();

                setSelectedNotificationID(record.notification_id);

                void refetchNotificationStatus();
            }
        },
        [refetchNotificationStatus]
    );

    const columns: TableColumn<InfoNotification>[] = useMemo(() => {
        return [
            {
                title: tNotification("label.title"),
                render: (record) => {
                    if (!notificationMsgTitlesFetched) {
                        return <Skeleton width="100%" height="100%" />;
                    }

                    if (!notificationMsgTitles) return null;

                    const title = notificationMsgTitles.find(
                        (notificationMsgTitle) =>
                            notificationMsgTitle.notification_msg_id === record.notification_msg_id
                    )?.title;

                    if (!title) return null;

                    // TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
                    if (checkScheduleStatus(record.status) && !isShowScheduleManagement) {
                        return (
                            <TypographyShortenStr
                                data-testid="NotificationTable__titleTypo"
                                variant="body2"
                                maxLength={24}
                            >
                                {title}
                            </TypographyShortenStr>
                        );
                    }

                    return (
                        <StyledLink
                            to={`/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}/${record.notification_id}/show`}
                            data-testid="NotificationTable__title"
                            onClick={(e) => {
                                onClickNotificationRowTitle(e, record);
                            }}
                        >
                            <TypographyShortenStr variant="body2" maxLength={24} title={title}>
                                {title}
                            </TypographyShortenStr>
                        </StyledLink>
                    );
                },
                key: "title",
                cellProps: {
                    style: {
                        width: "20%",
                    },
                },
            },
            {
                title: tNotification("label.composer"),
                render: (record) => {
                    if (isFetchingComposerList) {
                        return <Skeleton width="100%" height="100%" />;
                    }
                    if (!composerList) return null;

                    const composerName = composerList.find(
                        (composer) => composer.user_id === record.editor_id
                    )?.name;

                    if (!composerName) return null;

                    return (
                        <TypographyShortenStr
                            maxLength={24}
                            variant="body2"
                            data-testid="NotificationList__typographyComposer"
                        >
                            {composerName}
                        </TypographyShortenStr>
                    );
                },
                key: "composer",
                cellProps: {
                    style: {
                        width: "18%",
                    },
                },
            },
            {
                title: tNotification("label.audience"),
                render: (record) => {
                    if (
                        record.target_groups &&
                        record.target_groups.user_group_filter &&
                        record.target_groups.user_group_filter.user_group
                    ) {
                        const group =
                            record.target_groups.user_group_filter.user_group.length === 1
                                ? String(record.target_groups.user_group_filter.user_group)
                                : record.target_groups.user_group_filter.user_group;
                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="NotificationTable__recipient"
                            >
                                {group && typeof group === "string"
                                    ? t(`resources.choices.user_group.${group}`)
                                    : tNotification("label.all")}
                            </TypographyBase>
                        );
                    }
                    return <></>;
                },
                key: "recipient",
                cellProps: {
                    style: {
                        width: "12%",
                    },
                },
            },
            {
                title: tNotification("label.status"),
                render: (record) => {
                    return (
                        <Box position="relative" data-testid="NotificationTable__status">
                            <ChipNotificationStatus
                                status={record.status}
                                label={tNotification(`notificationStatus.${record?.status}`)}
                            />
                        </Box>
                    );
                },
                key: "status",
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
            },
            {
                title: tNotification("label.read"),
                render: (record) => {
                    if (readCountOfNotificationsLoading) {
                        return <Skeleton width="100%" height="100%" />;
                    }

                    const { allReceiverUsers, readUsers } = getReadCountOfNotifications(
                        record,
                        readCountOfNotifications
                    );

                    return (
                        <ReadCountColumn
                            status={record.status}
                            allReceiverUsers={allReceiverUsers}
                            readUsers={readUsers}
                        />
                    );
                },
                key: "read",
                cellProps: {
                    style: {
                        width: "7%",
                    },
                },
            },
            {
                key: "sentDate",
                title: tNotification("label.sentDate"),
                render: (record) => {
                    if (!record.status) return null;

                    return (
                        <TypographyNotificationDate
                            data-testid="NotificationTable__sentDate"
                            date={record.sent_at}
                            status={record.status}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
            },
            {
                title: tNotification("label.lastUpdated"),
                render: (record) => {
                    return (
                        <TypographyNotificationDate
                            data-testid="NotificationTable__lastUpdated"
                            date={record.updated_at}
                        />
                    );
                },
                key: "lastUpdated",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
            },
        ];
    }, [
        composerList,
        isFetchingComposerList,
        isShowScheduleManagement,
        notificationMsgTitles,
        notificationMsgTitlesFetched,
        onClickNotificationRowTitle,
        readCountOfNotifications,
        readCountOfNotificationsLoading,
        t,
        tNotification,
    ]);

    return (
        <>
            <TableBase
                data={notificationInfoList}
                columns={columns}
                footer={{
                    pagination: {
                        ...pagination,
                        count: getCountOfNotifications(
                            notificationCategories,
                            notificationCategory
                        ),
                    },
                }}
                withIndex
                tableProps={{
                    "data-testid": "Notification__table",
                }}
                body={{
                    rowKey: "notification_id",
                    loading: notificationListLoading || notificationCategoriesLoading,
                    pagination: pagination,
                }}
                styles={{
                    container: {
                        overflowX: "unset",
                    },
                }}
            />

            {isUpdateDialogOpen && (
                <NotificationDialogWithData
                    selectedNotificationID={selectedNotificationID}
                    onClose={() => setIsUpdateDialogOpen(false)}
                    notificationCategoriesRefetch={notificationCategoriesRefetch}
                    notificationListRefetch={notificationListRefetch}
                    readCountOfNotificationsRefetch={readCountOfNotificationsRefetch}
                    resetPaginationOffset={resetPaginationOffset}
                />
            )}
        </>
    );
};

export default NotificationTable;
