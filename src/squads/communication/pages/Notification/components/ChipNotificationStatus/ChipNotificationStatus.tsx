import { KeyNotificationStatus } from "src/common/constants/const";
import { NotificationStatusKeys } from "src/squads/communication/typings/remote";

import { ChipBaseProps } from "src/components/Chips/ChipBase";
import ChipStatus, { ChipStatusProps } from "src/components/Chips/ChipStatus";

type NotificationChipStatusStyles = {
    [key: string]: ChipStatusProps["status"];
};

const NotificationChipStatus: NotificationChipStatusStyles = {
    [KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT]: "error",
    [KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED]: "warning",
    [KeyNotificationStatus.NOTIFICATION_STATUS_SENT]: "success",
};

const getChipStatusFromVariant = (status?: NotificationStatusKeys): ChipStatusProps["status"] => {
    const chipStatusDefault: ChipStatusProps["status"] = "default";
    if (!status || !NotificationChipStatus[status]) {
        return chipStatusDefault;
    }
    return NotificationChipStatus[status];
};

export interface ChipNotificationStatusProps extends ChipBaseProps {
    status?: NotificationStatusKeys;
}

const ChipNotificationStatus = (props: ChipNotificationStatusProps) => {
    const { status, ...rest } = props;
    const chipStatus = getChipStatusFromVariant(status);
    return (
        <ChipStatus
            {...rest}
            size="small"
            status={chipStatus}
            data-testid="ChipNotificationStatus"
        />
    );
};

export default ChipNotificationStatus;
