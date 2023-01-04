import { memo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import { OtherWorkingHour } from "src/squads/timesheet/common/types";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TimePickerAutocompleteHF from "src/squads/timesheet/modules/timesheet-upsert/components/TimePickerAutocompleteHF";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import { UseOtherWorkingHourFormValidationReturn } from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHourFormValidation";

interface TimeRangeColumnProps {
    record: OtherWorkingHour;
    index?: number;
    validate: UseOtherWorkingHourFormValidationReturn["validate"];
}

const StyledTimePickerAutocompleteHF = styled(TimePickerAutocompleteHF)({
    [`& #TimePickerAutocompleteHF__autocomplete-helper-text`]: {
        whiteSpace: "pre",
    },
});

const TimeRangeColumn = memo(({ record, index, validate }: TimeRangeColumnProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    return (
        <Grid container flexWrap="nowrap" gap={1} flexDirection="row">
            <StyledTimePickerAutocompleteHF
                name={`${TimesheetKeys.OTHER_WORKING_HOURS}[${index}].startTimeAutocomplete`}
                getOptionSelectedField="value"
                placeholder={tTimesheetManagement("labels.start")}
                disableClearable
                rules={validate.useStartTimeAutocompleteRules(index)}
                data-testid="OtherWorkingHoursUpsertTable__startTime"
                baseDate={record?.start_time}
            />
            <StyledTimePickerAutocompleteHF
                name={`${TimesheetKeys.OTHER_WORKING_HOURS}[${index}].endTimeAutocomplete`}
                getOptionSelectedField="value"
                placeholder={tTimesheetManagement("labels.end")}
                disableClearable
                rules={validate.useEndTimeAutocompleteRules(index)}
                data-testid="OtherWorkingHoursUpsertTable__endTime"
                baseDate={record?.end_time}
            />
        </Grid>
    );
});

export default TimeRangeColumn;
