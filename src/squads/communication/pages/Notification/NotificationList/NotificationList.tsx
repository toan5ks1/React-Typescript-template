import { useCallback, useMemo, useState } from "react";

import { useHistory } from "react-router";
import { KeyNotificationStatus } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { parseQuery, stringifyQuery } from "src/common/utils/query";
import { MicroFrontendTypes } from "src/routing/type";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { getConvertedStatus } from "src/squads/communication/common/utils/utils";
import { NotificationStatusKeys } from "src/squads/communication/typings/remote";

import NotificationUpsertDialog from "../components/Dialogs/NotificationUpsertDialog/NotificationUpsertDialog";
import { Add } from "@mui/icons-material";
import { Box, Skeleton } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import ToggleButtonGroupBase from "src/components/Buttons/ToggleButtonGroupBase/ToggleButtonGroupBase";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import NotificationTable from "src/squads/communication/pages/Notification/components/Tables/NotificationTable";

import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useNotificationCategories from "src/squads/communication/pages/Notification/hooks/useNotificationCategories";
import useNotificationList from "src/squads/communication/pages/Notification/hooks/useNotificationList";

const DEFAULT_ALL_STATUS_VALUE = "ALL_STATUS";

const NotificationList = () => {
    const { isEnabled: isShowScheduleManagement } = useFeatureToggle(
        Features.NOTIFICATION_SCHEDULE_MANAGEMENT
    );

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const history = useHistory();

    const { status: notificationStatusQueryParam } = parseQuery();

    const { notificationCategories, notificationCategoriesLoading, notificationCategoriesRefetch } =
        useNotificationCategories(isCreateDialogOpen);

    const {
        resetPaginationOffset,
        readCountOfNotificationsRefetch,
        notificationListRefetch,
        ...notificationListHookData
    } = useNotificationList(getConvertedStatus(notificationStatusQueryParam));

    const onClickNotificationStatus = useCallback(
        (status: NotificationStatusKeys | typeof DEFAULT_ALL_STATUS_VALUE) => () => {
            const searchQuery =
                status === DEFAULT_ALL_STATUS_VALUE ? undefined : stringifyQuery({ status });

            history.push({
                pathname: `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}`,
                search: searchQuery,
            });

            resetPaginationOffset();
            void notificationCategoriesRefetch();
            void readCountOfNotificationsRefetch();
            notificationListRefetch();
        },
        [
            history,
            resetPaginationOffset,
            notificationCategoriesRefetch,
            readCountOfNotificationsRefetch,
            notificationListRefetch,
        ]
    );

    const renderCategoryLabel = useCallback(
        (label: string) => {
            if (notificationCategoriesLoading) {
                return (
                    <Box data-testid="NotificationList__categorySkeleton">
                        <Skeleton animation="wave" height={22} width={41} />
                    </Box>
                );
            }

            return label;
        },
        [notificationCategoriesLoading]
    );

    const categoryOptions = useMemo(() => {
        const allStatus = DEFAULT_ALL_STATUS_VALUE;
        const draftStatus = KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT;
        const sentStatus = KeyNotificationStatus.NOTIFICATION_STATUS_SENT;
        const scheduledStatus = KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED;

        const categories = [
            {
                children: renderCategoryLabel(
                    `${tNotification("label.all")} (${notificationCategories.all})`
                ),
                value: DEFAULT_ALL_STATUS_VALUE,
                "data-testid": "NotificationCategory__ALL",
                onClick: onClickNotificationStatus(allStatus),
            },
            {
                children: renderCategoryLabel(
                    tNotification(`notificationStatus.${sentStatus}`, {
                        smart_count: 2,
                        count: notificationCategories.sent,
                    })
                ),
                value: sentStatus,
                "data-testid": `NotificationCategory__${sentStatus}`,
                onClick: onClickNotificationStatus(sentStatus),
            },
            {
                children: renderCategoryLabel(
                    tNotification(`notificationStatus.${draftStatus}`, {
                        smart_count: 2,
                        count: notificationCategories.draft,
                    })
                ),
                value: draftStatus,
                "data-testid": `NotificationCategory__${draftStatus}`,
                onClick: onClickNotificationStatus(draftStatus),
            },
        ];

        // TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
        if (isShowScheduleManagement) {
            categories.splice(2, 0, {
                children: renderCategoryLabel(
                    tNotification(`notificationStatus.${scheduledStatus}`, {
                        smart_count: 2,
                        count: notificationCategories.schedule,
                    })
                ),
                value: scheduledStatus,
                "data-testid": `NotificationCategory__${scheduledStatus}`,
                onClick: onClickNotificationStatus(scheduledStatus),
            });
        }

        return categories;
    }, [
        isShowScheduleManagement,
        notificationCategories.all,
        notificationCategories.draft,
        notificationCategories.schedule,
        notificationCategories.sent,
        onClickNotificationStatus,
        renderCategoryLabel,
        tNotification,
    ]);

    return (
        <WrapperPageContent data-testid="NotificationList">
            <TypographyPageTitle
                data-testid="NotificationList__header"
                title={tNotification("title.notification")}
            />

            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <ToggleButtonGroupBase
                    data-testid="NotificationList__buttonGroupCategory"
                    // Fallback for undefined value (status All) since it doesn't accept undefined value as an option
                    value={
                        getConvertedStatus(notificationStatusQueryParam) || DEFAULT_ALL_STATUS_VALUE
                    }
                    options={categoryOptions}
                />

                <ButtonPrimaryContained
                    data-testid="NotificationList__buttonCompose"
                    startIcon={<Add />}
                    onClick={() => {
                        setIsCreateDialogOpen(true);
                    }}
                >
                    {tNotification("button.compose")}
                </ButtonPrimaryContained>
            </Box>

            <NotificationTable
                notificationCategory={getConvertedStatus(notificationStatusQueryParam)}
                notificationCategoriesHookData={{
                    notificationCategories,
                    notificationCategoriesLoading,
                    notificationCategoriesRefetch,
                }}
                notificationListHookData={{
                    resetPaginationOffset,
                    readCountOfNotificationsRefetch,
                    notificationListRefetch,
                    ...notificationListHookData,
                }}
            />

            {isCreateDialogOpen && (
                <NotificationUpsertDialog
                    onClose={() => setIsCreateDialogOpen(false)}
                    notificationCategoriesRefetch={notificationCategoriesRefetch}
                    notificationListRefetch={notificationListRefetch}
                    readCountOfNotificationsRefetch={readCountOfNotificationsRefetch}
                    resetPaginationOffset={resetPaginationOffset}
                />
            )}
        </WrapperPageContent>
    );
};

export default NotificationList;
