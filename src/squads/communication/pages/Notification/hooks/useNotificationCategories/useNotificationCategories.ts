import { Features } from "src/squads/communication/common/constants/feature-keys";
import { NotificationCategories } from "src/squads/communication/common/constants/types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

const notificationCountDefaultValue: NotificationCategories = {
    all: 0,
    draft: 0,
    sent: 0,
    schedule: 0,
};

export interface UseNotificationCategoriesReturn {
    notificationCategoriesRefetch: () => void;
    notificationCategories: NotificationCategories;
    notificationCategoriesLoading: boolean;
}

const useNotificationCategories = (
    openCompose: boolean = false
): UseNotificationCategoriesReturn => {
    const { isEnabled: isShowScheduleManagement } = useFeatureToggle(
        Features.NOTIFICATION_SCHEDULE_MANAGEMENT
    );

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const {
        refetch: notificationCategoriesRefetch,
        data: notificationCategories,
        isLoading: notificationCategoriesLoading,
    } = inferQuery({ entity: "infoNotifications", action: "communicationCountNotificationStatus" })(
        undefined,
        {
            enabled: !Boolean(openCompose),
            selector: (data) => {
                if (!data) return notificationCountDefaultValue;

                const mapped: NotificationCategories = notificationCountDefaultValue;

                Object.keys(data).forEach((status) => {
                    mapped[status] = data[status].aggregate.count;
                });

                mapped.all = mapped.draft + mapped.sent;

                // TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
                if (isShowScheduleManagement) {
                    mapped.all += mapped.schedule;
                }

                return mapped;
            },
            onError: (error: Error) => {
                window.warner?.warn("useNotificationCategories", error);

                showSnackbar(
                    `${t("ra.notification.item_doesnt_exist")} ${t(error.message)}`,
                    "error"
                );
            },
        }
    );

    return {
        notificationCategoriesRefetch,
        notificationCategories: notificationCategories ?? notificationCountDefaultValue,
        notificationCategoriesLoading,
    };
};

export default useNotificationCategories;
