import { useState, useMemo } from "react";

import debounce from "lodash/debounce";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME, KEY_CODE } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import { Timesheet_StaffListV2Query } from "src/squads/timesheet/service/bob/bob-types";

import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useQueryStaffList from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryStaffList";
import useTimesheetInfoRules from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetInfoRules";

const StaffAutocomplete = () => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const [keyword, setKeyword] = useState<string>("");
    const [inputVal, setInputVal] = useState<string>("");

    const { data: staffList } = useQueryStaffList({ keyword });
    const validateRules = useTimesheetInfoRules();

    const setKeywordDebounced = useMemo(
        () => debounce(setKeyword, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setKeyword]
    );

    const staffOptions = useMemo(
        () =>
            staffList.map((staff: ArrayElement<Timesheet_StaffListV2Query["staff"]>) => ({
                id: staff.staff_id,
                name: staff.user?.name,
                email: staff.user?.email,
            })),
        [staffList]
    );

    return (
        <AutocompleteHF
            name="staff"
            label={tTimesheetManagement("labels.staff")}
            data-testid="StaffAutocomplete__autocomplete"
            id="StaffAutocompleteHF__autocomplete"
            required
            optionLabelKey="name"
            optionHelperText="email"
            options={staffOptions}
            rules={{ required: validateRules.required }}
            getOptionSelectedField="id"
            limitChipText="Ellipsis"
            inputValue={inputVal}
            onInputChange={(_e, val) => {
                setKeywordDebounced(val);
                setInputVal(val);
            }}
            onBlur={() => {
                setInputVal("");
            }}
            onKeyDown={(event) => {
                if (event.keyCode === KEY_CODE.KEY_ENTER) {
                    event.preventDefault();
                }
            }}
        />
    );
};

export default StaffAutocomplete;
