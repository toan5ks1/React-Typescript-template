import { useCallback } from "react";

import { ERPModules } from "src/common/constants/enum";
import { TIMESHEET_STATUS_KEYS } from "src/squads/timesheet/common/constants/timesheet";

import { ChipBaseProps } from "src/components/Chips/ChipBase";
import ChipStatus from "src/components/Chips/ChipStatus/ChipStatus";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

export interface ChipTimesheetStatusProps extends ChipBaseProps {
    status?: string;
}

const ChipTimesheetStatus = (props: ChipTimesheetStatusProps) => {
    const t = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const mapTimesheetStatusChipType = useCallback((status?: string) => {
        switch (status) {
            case TIMESHEET_STATUS_KEYS.TIMESHEET_STATUS_SUBMITTED:
                return "warning";
            case TIMESHEET_STATUS_KEYS.TIMESHEET_STATUS_APPROVED:
                return "success";
            case TIMESHEET_STATUS_KEYS.TIMESHEET_STATUS_REJECTED:
                return "error";
            case TIMESHEET_STATUS_KEYS.TIMESHEET_STATUS_CONFIRMED:
                return "others";
            default:
                return "default";
        }
    }, []);

    const { status, ...rest } = props;

    return (
        <ChipStatus
            {...rest}
            label={t(`timesheetStatus.${status}`)}
            status={mapTimesheetStatusChipType(status)}
            size="small"
        />
    );
};

export default ChipTimesheetStatus;
