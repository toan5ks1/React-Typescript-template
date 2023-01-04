import { memo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import { OtherWorkingHour } from "src/squads/timesheet/common/types";

import WorkingTypeAutocompleteHF from "src/squads/timesheet/modules/timesheet-upsert/components/TimesheetFormSections/WorkingTypeAutocompleteHF";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import { UseOtherWorkingHourFormValidationReturn } from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHourFormValidation";

interface WorkingTypeColumnProps {
    record: OtherWorkingHour;
    index?: number;
    validate: UseOtherWorkingHourFormValidationReturn["validate"];
}

const WorkingTypeColumn = memo(({ record, index, validate }: WorkingTypeColumnProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    return (
        <WorkingTypeAutocompleteHF
            name={`${TimesheetKeys.OTHER_WORKING_HOURS}[${index}].workingTypeAutocomplete`}
            getOptionSelectedField="timesheet_config_id"
            placeholder={tTimesheetManagement("labels.workingType")}
            data-testid="OtherWorkingHoursUpsertTable__workingType"
            rules={validate.workingTypeAutocomplete}
            key={record.id}
        />
    );
});

export default WorkingTypeColumn;
