import { WORKING_TYPES_CONFIG_KEY } from "src/squads/timesheet/common/constants/timesheet";
import { WorkingTypeAutocompleteOption } from "src/squads/timesheet/common/types";

import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import useTimesheetConfigs from "src/squads/timesheet/hooks/useTimesheetConfigs";

const WorkingTypeAutocompleteHF = (
    props: Omit<AutocompleteHFProps<WorkingTypeAutocompleteOption>, "options" | "optionLabelKey">
) => {
    const { data: options, isFetching } = useTimesheetConfigs(WORKING_TYPES_CONFIG_KEY);

    return (
        <AutocompleteHF
            {...props}
            optionLabelKey="config_value"
            size="small"
            id="WorkingTypeAutocompleteHF__autocomplete"
            data-testid="OtherWorkingHoursUpsertTable__workingType"
            multiple={false}
            disableClearable
            limitChipText="Ellipsis"
            required
            options={options || []}
            loading={isFetching}
        />
    );
};

export default WorkingTypeAutocompleteHF;
