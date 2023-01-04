import { memo } from "react";

import { isEmpty } from "lodash";
import { useWatch } from "react-hook-form";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import { UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { formatTimeLength, getDurationInMinute } from "src/squads/timesheet/common/utils/time";

import DoubleDash from "src/components/DoubleDash";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

interface TotalHourColumnProps {
    index?: number;
}

const TotalHourColumn = memo(({ index }: TotalHourColumnProps) => {
    const otherWorkingHours = useWatch<UpsertTimesheetFormProps>({
        name: TimesheetKeys.OTHER_WORKING_HOURS,
    });
    if (index === undefined || isEmpty(otherWorkingHours[index])) {
        return <DoubleDash />;
    }

    const { startTimeAutocomplete, endTimeAutocomplete } = otherWorkingHours[index];

    if (!startTimeAutocomplete?.value || !endTimeAutocomplete?.value) return <DoubleDash />;

    return (
        <TypographyPrimary variant="body2" data-testid="OtherWorkingHoursUpsertTable__totalHours">
            {formatTimeLength(
                getDurationInMinute(startTimeAutocomplete.value, endTimeAutocomplete.value)
            )}
        </TypographyPrimary>
    );
});

export default TotalHourColumn;
