import {
    Communication_GetTagsSelectedByNotificationIdQueryVariables,
    Communication_GetTagsSelectedByNotificationIdQuery,
} from "src/squads/communication/service/bob/bob-types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface UseTagsSelectedByNotificationIdProps {
    notificationId: Communication_GetTagsSelectedByNotificationIdQueryVariables["notification_id"];
}

export type UseTagsSelectedByNotificationIdReturn = UseQueryBaseReturn<
    Communication_GetTagsSelectedByNotificationIdQuery["tags"] | undefined
>;

const useTagsSelectedByNotificationId = ({
    notificationId,
}: UseTagsSelectedByNotificationIdProps): UseTagsSelectedByNotificationIdReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "tags",
        action: "communicationGetTagsSelectedByNotificationId",
    })(
        {
            notification_id: notificationId,
        },
        {
            enabled: Boolean(notificationId),
            onError: (error) => {
                showSnackbar(t("ra.manabie-error.unknown"), "error");
                window.warner?.warn(
                    "useTagsSelectedByNotificationId tags selected by notification id",
                    error
                );
            },
        }
    );
};

export default useTagsSelectedByNotificationId;
