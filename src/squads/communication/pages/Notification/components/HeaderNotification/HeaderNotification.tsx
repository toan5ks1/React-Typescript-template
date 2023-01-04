import { ERPModules } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";

import { Box } from "@mui/material";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import ChipNotificationStatus from "src/squads/communication/pages/Notification/components/ChipNotificationStatus";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import { UseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";
import { UseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail";

const HeaderNotification = ({
    notificationInfo,
    notificationMsgDetail,
}: {
    notificationInfo: UseNotificationDetailReturn["notificationInfo"];
    notificationMsgDetail: UseNotificationMsgDetailReturn["notificationMsgDetail"];
}) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    return (
        <Box display="flex" flexDirection="row" mb={3} alignItems="center">
            <Box mr={2}>
                <ChipNotificationStatus
                    label={tNotification(`notificationStatus.${notificationInfo?.status}`)}
                    status={notificationInfo?.status}
                />
            </Box>
            <Box>
                <TypographyPageTitle
                    disablePadding
                    data-testid="HeaderNotification__title"
                    title={convertString(notificationMsgDetail?.title)}
                />
            </Box>
        </Box>
    );
};

export default HeaderNotification;
