import { memo } from "react";

import { KeyNotificationStatus } from "src/common/constants/const";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DoubleDash from "src/components/DoubleDash";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface ReadCountColumnProps {
    readUsers?: number;
    allReceiverUsers?: number;
    status?: string; //NotificationStatusKeys
}

const ReadCountColumn = (props: ReadCountColumnProps) => {
    const { status, readUsers = 0, allReceiverUsers = 0 } = props;
    const theme = useTheme();
    const { primary } = theme.palette.text;

    if (status === KeyNotificationStatus.NOTIFICATION_STATUS_SENT) {
        const isAllRead = readUsers === allReceiverUsers;
        const readColumnVariant = isAllRead ? "body2" : "subtitle2";
        const color = isAllRead ? primary : theme.palette.warning.main;
        return (
            <Box color={color} data-testid="ReadCountColumn__box">
                <TypographyBase variant={readColumnVariant}>
                    {`${readUsers}/${allReceiverUsers}`}
                </TypographyBase>
            </Box>
        );
    }

    return (
        <Box color={primary} data-testid="ReadCountColumn__box">
            <TypographyBase variant="body2">
                <DoubleDash />
            </TypographyBase>
        </Box>
    );
};

export default memo(ReadCountColumn);
