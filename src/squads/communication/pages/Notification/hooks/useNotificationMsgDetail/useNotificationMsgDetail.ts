import { useHistory } from "react-router";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { MicroFrontendTypes } from "src/routing/type";
import { Media } from "src/squads/communication/common/constants/types";
import { InfoNotificationMsgsOneQuery } from "src/squads/communication/service/bob/bob-types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import useMediaList from "src/squads/communication/hooks/useMediaList";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface UseNotificationMsgDetailReturn {
    mediaList: Media[];
    notificationMsgDetail?: ArrayElement<InfoNotificationMsgsOneQuery["info_notification_msgs"]>;
    isFetching: boolean;
}

const useNotificationMsgDetail = (id?: string): UseNotificationMsgDetailReturn => {
    const showSnackbar = useShowSnackbar();
    const history = useHistory();
    const t = useTranslate();

    const { data: notificationMsgDetail, isFetching: isFetchingNotificationMsgDetail } = inferQuery(
        {
            entity: "infoNotificationMgs",
            action: "communicationGetInfoNotificationMsgByNotificationMsgId",
        }
    )(
        {
            notification_msg_id: id || "",
        },
        {
            enabled: Boolean(id),
            onError: (error) => {
                window.warner?.warn("useNotificationMsgDetail notification msg info", error);
                showSnackbar(t("ra.notification.item_doesnt_exist"), "error");

                return history.push(
                    `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}`
                );
            },
        }
    );

    const { mediaList, isFetchingMediaList } = useMediaList({
        mediaIds: notificationMsgDetail?.media_ids,
    });

    return {
        mediaList,
        notificationMsgDetail,
        isFetching: isFetchingMediaList || isFetchingNotificationMsgDetail,
    };
};

export default useNotificationMsgDetail;
