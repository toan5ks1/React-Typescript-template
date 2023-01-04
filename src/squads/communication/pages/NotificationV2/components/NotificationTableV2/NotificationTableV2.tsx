import { useCallback, useMemo, useState } from "react";

import { ERPModules, Features } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { convertTimestampToDate } from "src/common/utils/time";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyNotificationStatus } from "src/squads/communication/common/constants/const";
import { InfoNotificationsByFilter } from "src/squads/communication/common/constants/types";
import {
    checkDraftStatusV2,
    checkScheduleStatusV2,
    checkSentStatusV2,
} from "src/squads/communication/common/utils/utils";

import { Box, Skeleton } from "@mui/material";
import DoubleDash from "src/components/DoubleDash";
import StyledLink from "src/components/StyledLink";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import ChipNotificationStatus from "src/squads/communication/pages/Notification/components/ChipNotificationStatus";
import NotificationDialogWithData from "src/squads/communication/pages/Notification/components/Dialogs/NotificationDialogWithData";
import TypographyNotificationDate from "src/squads/communication/pages/Notification/components/TypographyNotificationDate";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";
import { UserGroup } from "manabuf/common/v1/profiles_pb";

import ReadCountColumn from "./ReadCountColumnV2";

import { arrayHasItem, pick1stElement } from "@manabie-com/mana-utils";
import useDialog from "src/squads/communication/hooks/useDialog";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import { UseNotificationListFilterReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationListFilter";
import { UseNotificationUserReadReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";

const getReadCountOfNotifications = (
    record: InfoNotificationsByFilter,
    readCountOfNotifications: UseNotificationUserReadReturn["readCountOfNotifications"]
) => {
    let allReceiverUsers: number = 0;
    let readUsers: number = 0;

    if (!record.notificationId || !arrayHasItem(readCountOfNotifications)) {
        return { allReceiverUsers, readUsers };
    }

    const notification = readCountOfNotifications.find(
        (notification) => notification.notification_id === record.notificationId
    );

    if (notification) {
        const { all_receiver_aggregate, read_aggregate } = notification;

        if (all_receiver_aggregate?.aggregate?.count) {
            allReceiverUsers = all_receiver_aggregate.aggregate.count;
        }

        if (read_aggregate?.aggregate?.count) {
            readUsers = read_aggregate.aggregate.count;
        }
    }

    return { allReceiverUsers, readUsers };
};

export interface NotificationTableV2Props
    extends Omit<
        UseNotificationListFilterReturn,
        "onCategorize" | "notifications" | "onFilter" | "onSearch" | "keyword"
    > {
    notifications: Array<InfoNotificationsByFilter> | undefined;
}

const NotificationTableV2 = (props: NotificationTableV2Props) => {
    const [selectedNotificationID, setSelectedNotificationID] =
        useState<InfoNotificationsByFilter["notificationId"]>("");
    const {
        open: updateDialogOpen,
        onOpen: onUpdateDialogOpen,
        onClose: onUpdateDialogClose,
    } = useDialog();

    const {
        notifications,
        readCountOfNotifications,
        readCountOfNotificationsLoading,
        readCountOfNotificationsRefetch,
        composerList,
        isFetchingComposerList,
        pagination,
        isLoadingNotification,
        tags,
        isFetchingTags,
        refreshPage,
    } = props;

    const { isEnabled: isShowScheduleManagement } = useFeatureToggle(
        Features.NOTIFICATION_SCHEDULE_MANAGEMENT
    );

    const t = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const onClickNotificationRowTitle = useCallback(
        (e: React.MouseEvent, record: InfoNotificationsByFilter) => {
            if (!checkSentStatusV2(record.status)) {
                e.preventDefault();

                setSelectedNotificationID(record.notificationId);
                if (checkDraftStatusV2(record.status) || checkScheduleStatusV2(record.status)) {
                    onUpdateDialogOpen();
                }
            }
        },
        [onUpdateDialogOpen]
    );

    const columns: TableColumn<InfoNotificationsByFilter>[] = useMemo(() => {
        return [
            {
                title: tNotification("label.title"),
                render: (record) => {
                    // TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
                    if (checkScheduleStatusV2(record.status) && !isShowScheduleManagement) {
                        return (
                            <TypographyShortenStr
                                data-testid="NotificationTableV2__titleTypo"
                                variant="body2"
                                maxLength={24}
                            >
                                {record.title}
                            </TypographyShortenStr>
                        );
                    }

                    return (
                        <StyledLink
                            to={`/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}/${record.notificationId}/show`}
                            data-testid="NotificationTableV2__title"
                            onClick={(e) => {
                                onClickNotificationRowTitle(e, record);
                            }}
                        >
                            <TypographyShortenStr
                                variant="body2"
                                maxLength={24}
                                title={record.title}
                            >
                                {record.title}
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
                    if (!composerList || !arrayHasItem(composerList)) return null;

                    const composerName = composerList.find(
                        (composer) => composer.user_id === record.composerId
                    )?.name;

                    if (!composerName) return null;

                    return (
                        <TypographyShortenStr
                            maxLength={24}
                            variant="body2"
                            data-testid="NotificationTableV2__typographyComposer"
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
                    if (record.userGroupFilter) {
                        const group = record.userGroupFilter.userGroupsList;

                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="NotificationTableV2__recipient"
                            >
                                {group.length === 1
                                    ? t(
                                          `resources.choices.user_group.${getEnumString(
                                              UserGroup,
                                              pick1stElement(group)
                                          )}`
                                      )
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
                    const status = getEnumString(NotificationStatus, record.status);

                    return (
                        <Box position="relative" data-testid="NotificationTableV2__status">
                            <ChipNotificationStatus
                                status={KeyNotificationStatus[status]}
                                label={tNotification(`notificationStatus.${status}`)}
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
                            status={getEnumString(NotificationStatus, record.status)}
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
                title: tNotification("label.sentDate"),
                render: (record) => {
                    if (!record.status) return null;

                    const status = getEnumString(NotificationStatus, record.status);

                    return (
                        <TypographyNotificationDate
                            data-testid="NotificationTableV2__sentDate"
                            date={convertTimestampToDate(record.sentAt)}
                            status={KeyNotificationStatus[status]}
                        />
                    );
                },
                key: "sentDate",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
            },
            {
                title: tNotification("label.tag"),
                render: (record) => {
                    if (isFetchingTags) {
                        return <Skeleton width="100%" height="100%" />;
                    }

                    if (!tags || !arrayHasItem(tags)) return null;

                    const listTagName = record.tagIdsList.map(
                        (tagId) => tags.find((tag) => tag.tag_id === tagId)?.tag_name
                    );

                    if (!arrayHasItem(listTagName)) {
                        return <DoubleDash />;
                    }

                    return (
                        <TypographyMaxLines
                            maxLines={2}
                            variant="body2"
                            data-testid="NotificationTableV2__tag"
                        >
                            {listTagName.join(", ")}
                        </TypographyMaxLines>
                    );
                },
                key: "tag",
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
            },
        ];
    }, [
        tNotification,
        isShowScheduleManagement,
        onClickNotificationRowTitle,
        isFetchingComposerList,
        composerList,
        t,
        readCountOfNotificationsLoading,
        readCountOfNotifications,
        isFetchingTags,
        tags,
    ]);

    return (
        <>
            <TableBase
                data={notifications ?? []}
                columns={columns}
                footer={{ pagination }}
                withIndex
                tableProps={{
                    "data-testid": "Notification__tableV2",
                }}
                body={{
                    rowKey: "notification_id",
                    loading: isLoadingNotification,
                    pagination: pagination,
                }}
                styles={{
                    container: {
                        overflowX: "unset",
                    },
                }}
            />

            {updateDialogOpen && (
                // TODO: @communication refactor with NotificationDialogWithDataV2
                <NotificationDialogWithData
                    selectedNotificationID={selectedNotificationID}
                    onClose={() => onUpdateDialogClose()}
                    notificationCategoriesRefetch={refreshPage}
                    notificationListRefetch={refreshPage}
                    readCountOfNotificationsRefetch={readCountOfNotificationsRefetch}
                    resetPaginationOffset={refreshPage}
                />
            )}
        </>
    );
};

export default NotificationTableV2;
