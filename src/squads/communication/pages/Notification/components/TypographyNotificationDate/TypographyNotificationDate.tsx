import { DateTime } from "luxon";
import { KeyNotificationStatus } from "src/common/constants/const";
import { ERPModules, FormatDateOptions } from "src/common/constants/enum";
import { formatDate } from "src/common/utils/time";
import { NotificationStatusKeys } from "src/squads/communication/typings/remote";

import DoubleDash from "src/components/DoubleDash";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

interface TypographyNotificationDateProps extends TypographyBaseProps {
    date: Date | string | null;
    format?: FormatDateOptions;
    status?: NotificationStatusKeys;
}

const TypographyNotificationDate = (props: TypographyNotificationDateProps) => {
    const { status, date, format = "yyyy/LL/dd, HH:mm", ...rest } = props;

    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const getTextDateOfNotification = (
        date: TypographyNotificationDateProps["date"],
        status?: TypographyNotificationDateProps["status"]
    ): string | JSX.Element => {
        if (status === KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED) {
            return tNotification("notificationStatus.NOTIFICATION_STATUS_SCHEDULED");
        }

        // Because when we pass string type to fromJSDate function, it will return invalid date.
        // So we have to initialize Date type to pass to fromJSDate function
        return date && DateTime.fromJSDate(new Date(date)).isValid ? (
            formatDate(date, format)
        ) : (
            <DoubleDash />
        );
    };

    return (
        <TypographyBase data-testid="TypographyNotificationDate__root" variant="body2" {...rest}>
            {getTextDateOfNotification(date, status)}
        </TypographyBase>
    );
};

export default TypographyNotificationDate;
