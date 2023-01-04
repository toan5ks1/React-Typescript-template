import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { InfoNotification } from "src/squads/communication/common/constants/types";
import { checkDraftStatus, checkScheduleStatus } from "src/squads/communication/common/utils/utils";
import {
    InfoNotificationMsgsTitlesQuery,
    UserNameByIdsQuery,
} from "src/squads/communication/service/bob/bob-types";
import { inferQuery, inferQueryPagination } from "src/squads/communication/service/infer-query";

import { DataWithTotal, PaginationWithTotal } from "@manabie-com/react-utils";
import useNotificationUserRead, {
    UseNotificationUserReadReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";

export interface UseNotificationListReturn {
    notificationInfoList: InfoNotification[];
    readCountOfNotifications: UseNotificationUserReadReturn["readCountOfNotifications"];
    readCountOfNotificationsLoading: UseNotificationUserReadReturn["readCountOfNotificationsLoading"];
    readCountOfNotificationsRefetch: UseNotificationUserReadReturn["readCountOfNotificationsRefetch"];
    notificationListLoading: boolean;
    composerList?: UserNameByIdsQuery["users"];
    pagination: PaginationWithTotal;
    isFetchingComposerList: boolean;
    notificationMsgTitles?: InfoNotificationMsgsTitlesQuery["info_notification_msgs"];
    notificationMsgTitlesFetched: boolean;

    notificationListRefetch: () => void;
    resetPaginationOffset: () => void; // get type from useQueryPaginationV2
}

export interface MappedUseNotificationListIDsReturn {
    notificationInfoList: Array<InfoNotification>;
    notificationIds: string[];
    notificationEditorIds: string[];
    notificationMsgIds: string[];
}

export const defaultMappedNotificationInfoListIDsReturn: DataWithTotal<MappedUseNotificationListIDsReturn> =
    {
        data: {
            notificationInfoList: [],
            notificationIds: [],
            notificationEditorIds: [],
            notificationMsgIds: [],
        },
        total: 0,
    };

const useNotificationList = (notificationStatus?: string): UseNotificationListReturn => {
    const {
        result: { isLoading: notificationListLoading, refetch: notificationListRefetch },
        data: mappedUseNotificationListIDsReturn = defaultMappedNotificationInfoListIDsReturn,
        pagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "infoNotifications",
        action: "communicationGetListOfInfoNotifications",
    })<InfoNotification[], MappedUseNotificationListIDsReturn>(
        {
            status: notificationStatus,
        },
        {
            enabled: true, // if notificationStatus empty means query all status

            selector: ({ data, total }) => {
                const notificationIds = new Set<
                    ArrayElement<MappedUseNotificationListIDsReturn["notificationIds"]>
                >();

                const notificationEditorIds = new Set<
                    ArrayElement<MappedUseNotificationListIDsReturn["notificationIds"]>
                >();

                const notificationMsgIds = new Set<
                    ArrayElement<MappedUseNotificationListIDsReturn["notificationMsgIds"]>
                >();

                if (arrayHasItem(data)) {
                    data.forEach((notificationInfo) => {
                        notificationIds.add(notificationInfo.notification_id);

                        if (notificationInfo.editor_id)
                            notificationEditorIds.add(notificationInfo.editor_id);

                        if (notificationInfo.notification_msg_id)
                            notificationMsgIds.add(notificationInfo.notification_msg_id);
                    });
                }

                return {
                    data: {
                        notificationInfoList: data,
                        notificationIds: [...notificationIds],
                        notificationEditorIds: [...notificationEditorIds],
                        notificationMsgIds: [...notificationMsgIds],
                    },
                    total,
                };
            },
        }
    );

    const { notificationInfoList, notificationIds, notificationEditorIds, notificationMsgIds } =
        mappedUseNotificationListIDsReturn.data;

    const {
        readCountOfNotifications,
        readCountOfNotificationsLoading,
        readCountOfNotificationsRefetch,
    } = useNotificationUserRead({
        notification_id:
            checkDraftStatus(notificationStatus) || checkScheduleStatus(notificationStatus)
                ? []
                : notificationIds,
    });

    const { data: composerList, isLoading: isFetchingComposerList } = inferQuery({
        entity: "users",
        action: "communicationGetUsernames",
    })(
        {
            user_id: notificationEditorIds,
        },
        {
            enabled: arrayHasItem(notificationEditorIds),
            onError: (error) => {
                window.warner?.warn(`useNotificationList notification composerList`, error);
            },
        }
    );

    const { data: notificationMsgTitles, isFetched: notificationMsgTitlesFetched } = inferQuery({
        entity: "infoNotificationMgs",
        action: "communicationGetTitlesOfNotificationByNotificationMsgId",
    })(
        { notification_msg_id: notificationMsgIds },
        {
            enabled: arrayHasItem(notificationMsgIds),
            onError: (error) => {
                window.warner?.warn(
                    `useNotificationList notification notificationMsgTitles`,
                    error
                );
            },
        }
    );

    return {
        pagination,
        notificationInfoList,
        readCountOfNotifications,
        readCountOfNotificationsLoading,
        notificationListLoading,
        composerList,
        isFetchingComposerList,
        notificationMsgTitles,
        notificationMsgTitlesFetched,
        readCountOfNotificationsRefetch,
        notificationListRefetch,
        resetPaginationOffset,
    };
};

export default useNotificationList;
