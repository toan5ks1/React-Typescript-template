import { useCallback, useMemo, useState } from "react";

import { ArrayElement } from "src/common/constants/types";
import { combineDateAndTime } from "src/common/utils/time";
import { FormFilterNotificationListValues } from "src/squads/communication/common/constants/types";
import {
    checkDraftStatusV2,
    checkScheduleStatusV2,
    getCurrentDateWithSpecificHour,
} from "src/squads/communication/common/utils/utils";
import {
    Communication_GetListTagsByTagIdsQuery,
    UserNameByIdsQuery,
} from "src/squads/communication/service/bob/bob-types";
import {
    inferQuery,
    inferQueryWithGRPCPagination,
} from "src/squads/communication/service/infer-query";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";
import {
    GetNotificationsByFilterRequest,
    GetNotificationsByFilterResponse,
} from "manabuf/notificationmgmt/v1/notifications_pb";

import { arrayHasItem } from "@manabie-com/mana-utils";
import { UseQueryWithGRPCPaginationReturn } from "@manabie-com/react-utils";
import { convertToFilterDateValue } from "src/hooks/useFormFilterAdvanced";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import useNotificationUserRead, {
    UseNotificationUserReadReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";
import useTagsByTagIds from "src/squads/communication/pages/Notification/hooks/useTagsByTagIds";

export type GetNotificationsByFilterReturn =
    UseQueryWithGRPCPaginationReturn<GetNotificationsByFilterResponse.AsObject>;

export interface UseNotificationListFilterReturn {
    onFilter: (data: FormFilterNotificationListValues) => void;
    onSearch: (keyword: string) => void;
    onCategorize: (notificationStatus: NotificationStatus) => void;
    pagination: GetNotificationsByFilterReturn["pagination"];
    refreshPage: GetNotificationsByFilterReturn["results"]["refetch"];
    keyword: GetNotificationsByFilterRequest.AsObject["keyword"];
    isLoadingNotification: GetNotificationsByFilterReturn["results"]["isFetching"];
    notifications: GetNotificationsByFilterReturn["results"]["data"];
    composerList?: UserNameByIdsQuery["users"];
    isFetchingComposerList: boolean;
    tags?: Communication_GetListTagsByTagIdsQuery["tags"];
    isFetchingTags: boolean;
    readCountOfNotifications: UseNotificationUserReadReturn["readCountOfNotifications"];
    readCountOfNotificationsLoading: UseNotificationUserReadReturn["readCountOfNotificationsLoading"];
    readCountOfNotificationsRefetch: UseNotificationUserReadReturn["readCountOfNotificationsRefetch"];
}

const defaultFilterParams: GetNotificationsByFilterRequest.AsObject = {
    keyword: "",
    status: NotificationStatus.NOTIFICATION_STATUS_NONE,
    tagIdsList: [],
};

const mapNotificationListFilterReturn = (
    notificationList: Array<GetNotificationsByFilterResponse.Notification.AsObject>
) => {
    const notificationIds = new Set<
        GetNotificationsByFilterResponse.Notification.AsObject["notificationId"]
    >();

    const composerIds = new Set<ArrayElement<UserNameByIdsQuery["users"]>["user_id"]>();

    const tagIds = new Set<
        ArrayElement<Communication_GetListTagsByTagIdsQuery["tags"]>["tag_id"]
    >();

    if (arrayHasItem(notificationList)) {
        notificationList.forEach((notificationInfo) => {
            notificationIds.add(notificationInfo.notificationId);

            if (notificationInfo.composerId) {
                composerIds.add(notificationInfo.composerId);
            }

            if (arrayHasItem(notificationInfo.tagIdsList)) {
                notificationInfo.tagIdsList.forEach((tagId) => tagIds.add(tagId));
            }
        });
    }

    return {
        notificationIds: Array.from(notificationIds),
        composerIds: Array.from(composerIds),
        tagIds: Array.from(tagIds),
    };
};

const useNotificationListFilter = (): UseNotificationListFilterReturn => {
    const [filterParams, setFilterParams] =
        useState<GetNotificationsByFilterRequest.AsObject>(defaultFilterParams);

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const {
        results: { data, isFetching, refetch },
        goToFirstPage,
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "infoNotificationsMgmt",
        action: "communicationGetNotificationsByFilter",
    })(filterParams, {
        enabled: true,
        onError: (error) => {
            window.warner?.warn("useNotificationListFilter", error);
            showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
        },
    });

    const handleCategorize = useCallback(
        (notificationStatus: NotificationStatus) => {
            if (!filterParams.status && !notificationStatus) {
                return;
            }

            setFilterParams({ ...filterParams, status: notificationStatus });
            goToFirstPage();
        },
        [filterParams, goToFirstPage]
    );

    const handleSearch = useCallback(
        (keyword: string) => {
            if (!filterParams.keyword && !keyword) {
                return;
            }

            setFilterParams({ ...filterParams, keyword });
            goToFirstPage();
        },
        [filterParams, goToFirstPage]
    );

    const handleFilter = useCallback(
        (data: FormFilterNotificationListValues) => {
            let { fromDate, fromTime, toDate, toTime, tags } = data;
            const tagIdsList = tags.map((tag) => tag.tag_id);

            if (!fromTime)
                fromTime = {
                    label: "00:00",
                    value: getCurrentDateWithSpecificHour("00:00"),
                };

            if (!toTime)
                toTime = {
                    label: "23:59",
                    value: getCurrentDateWithSpecificHour("23:59"),
                };

            const combinedFromDate =
                fromDate && fromTime.value ? combineDateAndTime(fromDate, fromTime.value) : null;
            const combinedToDate =
                toDate && toTime.value ? combineDateAndTime(toDate, toTime.value) : null;

            setFilterParams({
                ...filterParams,
                tagIdsList,
                sentFrom: convertToFilterDateValue(combinedFromDate),
                sentTo: convertToFilterDateValue(combinedToDate),
            });
            goToFirstPage();
        },
        [filterParams, goToFirstPage]
    );

    const { notificationIds, composerIds, tagIds } = useMemo(() => {
        if (!data) {
            return {
                notificationIds: [],
                composerIds: [],
                tagIds: [],
            };
        }
        return mapNotificationListFilterReturn(data.notificationsList);
    }, [data]);

    const {
        readCountOfNotifications,
        readCountOfNotificationsLoading,
        readCountOfNotificationsRefetch,
    } = useNotificationUserRead({
        notification_id:
            checkDraftStatusV2(filterParams.status) || checkScheduleStatusV2(filterParams.status)
                ? []
                : notificationIds,
    });

    const { data: composerList, isFetching: isFetchingComposerList } = inferQuery({
        entity: "users",
        action: "communicationGetUsernames",
    })(
        {
            user_id: composerIds,
        },
        {
            enabled: arrayHasItem(composerIds),
            onError: (error) => {
                window.warner?.warn(
                    `useNotificationListFilter notification getUserNameList`,
                    error
                );
                showSnackbar(t(error.message), "error");
            },
        }
    );

    const { data: tags, isFetching: isFetchingTags } = useTagsByTagIds({ tagIds });

    return {
        notifications: data,
        isLoadingNotification: isFetching,
        keyword: filterParams.keyword,
        onSearch: handleSearch,
        onCategorize: handleCategorize,
        onFilter: handleFilter,
        pagination,
        refreshPage: refetch,
        readCountOfNotifications,
        readCountOfNotificationsLoading,
        readCountOfNotificationsRefetch,
        composerList,
        isFetchingComposerList,
        tags,
        isFetchingTags,
    };
};

export default useNotificationListFilter;
