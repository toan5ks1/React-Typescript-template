import { useCallback, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { ERPModules, Features } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { KeyNotificationStatus } from "src/squads/communication/common/constants/const";
import { FormFilterNotificationListValues } from "src/squads/communication/common/constants/types";
import { NotificationStatusKeys } from "src/squads/communication/typings/remote";

import { Add } from "@mui/icons-material";
import { Box, Skeleton } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import ToggleButtonGroupBase from "src/components/Buttons/ToggleButtonGroupBase/ToggleButtonGroupBase";
import HookForm from "src/components/Forms/HookForm";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import FormFilterAdvancedNotificationList, {
    formFilterDefaultValues,
} from "src/squads/communication/pages/Notification/components/Forms/FormFilterAdvancedNotificationList/FormFilterAdvancedNotificationList";
import NotificationTableV2 from "src/squads/communication/pages/NotificationV2/components/NotificationTableV2";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";

import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useNotificationListFilter from "src/squads/communication/pages/Notification/hooks/useNotificationListFilter";
import NotificationUpsertDialogV2 from "src/squads/communication/pages/NotificationV2/NotificationUpsertDialogV2";

const NotificationListV2 = () => {
    const { isEnabled: isShowScheduleManagement } = useFeatureToggle(
        Features.NOTIFICATION_SCHEDULE_MANAGEMENT
    );

    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const [isShowUpsertDialog, setIsShowUpsertDialog] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<NotificationStatusKeys>(
        KeyNotificationStatus.NOTIFICATION_STATUS_NONE
    );

    const methodsNotificationList = useForm<FormFilterNotificationListValues>({
        defaultValues: formFilterDefaultValues,
    });

    const {
        refreshPage,
        onCategorize,
        notifications,
        onFilter,
        onSearch,
        isLoadingNotification,
        ...useNotificationListFilterRest
    } = useNotificationListFilter();

    const onClickNotificationStatus = useCallback(
        (status: NotificationStatusKeys) => () => {
            if (status === currentStatus) return;

            setCurrentStatus(status);
            onCategorize(NotificationStatus[status]);
        },
        [currentStatus, onCategorize]
    );

    const renderCategoryButton = useCallback(
        (status: NotificationStatusKeys | string, statusNumber?: number) => {
            if (typeof statusNumber === "undefined") {
                return (
                    <Box data-testid="NotificationListV2__categorySkeleton">
                        <Skeleton animation="wave" height={22} width={41} />
                    </Box>
                );
            }
            return (
                <TypographyBase variant="button">
                    {status !== KeyNotificationStatus.NOTIFICATION_STATUS_NONE
                        ? tNotification(`notificationStatus.${status}`, {
                              smart_count: 2,
                              count: statusNumber,
                          })
                        : tNotification("notificationStatus.ALL_STATUS", {
                              smart_count: 2,
                              count: statusNumber,
                          })}
                </TypographyBase>
            );
        },
        [tNotification]
    );

    const getTotalItemsForStatusList = useCallback(
        (status: NotificationStatusKeys) => {
            if (notifications) {
                return notifications.totalItemsForStatusList.find((item) => {
                    return status === getEnumString(NotificationStatus, item.status);
                })?.totalItems;
            }
        },
        [notifications]
    );

    const getStatus = useMemo(() => {
        return [
            {
                value: KeyNotificationStatus.NOTIFICATION_STATUS_NONE,
                total: getTotalItemsForStatusList(KeyNotificationStatus.NOTIFICATION_STATUS_NONE),
            },
            {
                value: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
                total: getTotalItemsForStatusList(KeyNotificationStatus.NOTIFICATION_STATUS_SENT),
            },
            ...(isShowScheduleManagement
                ? [
                      {
                          value: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
                          total: getTotalItemsForStatusList(
                              KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED
                          ),
                      },
                  ]
                : []),
            {
                value: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
                total: getTotalItemsForStatusList(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT),
            },
        ];
    }, [getTotalItemsForStatusList, isShowScheduleManagement]);

    const categoryOptions = useMemo(() => {
        return getStatus.map(({ value, total }) => ({
            children: renderCategoryButton(value, total),
            value,
            "data-testid": `NotificationCategoryV2__${value}`,
            onClick: onClickNotificationStatus(value),
        }));
    }, [getStatus, onClickNotificationStatus, renderCategoryButton]);

    return (
        <>
            <WrapperPageContent>
                <TypographyPageTitle title={tNotification("title.notification")} />
                <Box mb={2} display="flex" alignItems="flex-start" justifyContent="space-between">
                    <HookForm methods={methodsNotificationList}>
                        <FormFilterAdvancedNotificationList
                            onApplySubmit={onFilter}
                            onEnterSearchBar={onSearch}
                        />
                    </HookForm>
                    <ButtonPrimaryContained
                        data-testid="NotificationListV2__buttonCompose"
                        startIcon={<Add />}
                        onClick={() => setIsShowUpsertDialog(true)}
                    >
                        {tNotification("button.compose")}
                    </ButtonPrimaryContained>
                </Box>
                <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <ToggleButtonGroupBase
                        data-testid="NotificationListV2__buttonGroupCategory"
                        // Fallback for undefined value (status All) since it doesn't accept undefined value as an option
                        value={currentStatus}
                        options={categoryOptions}
                    />
                </Box>
            </WrapperPageContent>

            <NotificationTableV2
                notifications={notifications?.notificationsList}
                refreshPage={refreshPage}
                isLoadingNotification={isLoadingNotification}
                {...useNotificationListFilterRest}
            />

            {isShowUpsertDialog && (
                <NotificationUpsertDialogV2 onClose={() => setIsShowUpsertDialog(false)} />
            )}
        </>
    );
};

export default NotificationListV2;
