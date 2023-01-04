import { memo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";

import TextFieldHF from "src/components/TextFields/TextFieldHF";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";

interface RemarksColumnProps {
    index?: number;
}

const REMARK_MAX_LENGTH = 100;

const RemarksColumn = memo(({ index }: RemarksColumnProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    return (
        <TextFieldHF
            name={`${TimesheetKeys.OTHER_WORKING_HOURS}[${index}].remarks`}
            placeholder={tTimesheetManagement("titles.remark")}
            inputProps={{
                "data-testid": "OtherWorkingHoursUpsertTable__remarkInput",
                maxLength: REMARK_MAX_LENGTH,
            }}
            rows={6.215}
        />
    );
});

export default RemarksColumn;
