import {
    InfoNotificationsCountReadQueryVariables,
    InfoNotificationsCountReadQuery,
} from "src/squads/communication/service/bob/bob-types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface UseNotificationUserReadProps extends InfoNotificationsCountReadQueryVariables {}

export type CountReadRecipientsByNotificationIdReturn = UseQueryBaseReturn<
    InfoNotificationsCountReadQuery["info_notifications"] | undefined
>;
export interface UseNotificationUserReadReturn {
    readCountOfNotifications: NonNullable<CountReadRecipientsByNotificationIdReturn["data"]>;
    readCountOfNotificationsLoading: CountReadRecipientsByNotificationIdReturn["isLoading"];
    readCountOfNotificationsRefetch: CountReadRecipientsByNotificationIdReturn["refetch"];
}

const defaultValuesNotificationRead: InfoNotificationsCountReadQuery["info_notifications"] = [];

const useNotificationUserRead = ({
    notification_id,
}: UseNotificationUserReadProps): UseNotificationUserReadReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data: readCountOfNotifications = defaultValuesNotificationRead,
        isLoading,
        refetch,
    } = inferQuery({
        entity: "infoNotifications",
        action: "communicationCountReadRecipientsByNotificationId",
    })(
        {
            notification_id,
        },
        {
            enabled: Boolean(notification_id),
            onError: (error) => {
                showSnackbar(t("ra.manabie-error.unknown"), "error");
                window.warner?.warn(`useNotificationUserRead notification readList`, error);
            },
        }
    );

    return {
        readCountOfNotifications,
        readCountOfNotificationsLoading: isLoading,
        readCountOfNotificationsRefetch: refetch,
    };
};

export default useNotificationUserRead;
