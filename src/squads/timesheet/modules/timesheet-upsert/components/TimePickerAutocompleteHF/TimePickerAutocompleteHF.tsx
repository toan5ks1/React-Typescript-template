import { useCallback, useMemo } from "react";

import { DateTime } from "luxon";
import { TimeAutocompleteOption } from "src/squads/timesheet/common/types";
import { createTimeList } from "src/squads/timesheet/common/utils/time";

import { FilterOptionsState } from "@mui/material";
import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

export interface TimePickerAutocompleteHFProps
    extends Omit<AutocompleteHFProps<TimeAutocompleteOption>, "options" | "optionLabelKey"> {
    minuteStep?: number;
    baseDate?: TimeAutocompleteOption["value"];
}

const TimePickerAutocompleteHF = ({
    minuteStep = 15,
    baseDate,
    ...rest
}: TimePickerAutocompleteHFProps) => {
    const timeOptions = useMemo(() => createTimeList(baseDate), [baseDate]);

    const filterOptions = useCallback(
        (options: TimeAutocompleteOption[], state: FilterOptionsState<TimeAutocompleteOption>) => {
            return options.filter((option) => {
                const isInputValueNull =
                    !state.inputValue && !(option.value!.getMinutes() % minuteStep);

                const isInputValueMatchWithOptionLabel =
                    state.inputValue &&
                    option.label.match(state.inputValue) &&
                    !(option.value!.getMinutes() % minuteStep);

                const isInputValueValidAndMatchWithOptionLabel =
                    state.inputValue &&
                    DateTime.fromFormat(state.inputValue, "HH:mm").isValid &&
                    option.label.match(state.inputValue);

                if (
                    isInputValueNull ||
                    isInputValueValidAndMatchWithOptionLabel ||
                    isInputValueMatchWithOptionLabel
                ) {
                    return option;
                }
            });
        },
        [minuteStep]
    );

    return (
        <AutocompleteHF<TimeAutocompleteOption>
            id="TimePickerAutocompleteHF__autocomplete"
            data-testid="TimePickerAutocompleteHF__autocomplete"
            key="time"
            options={timeOptions}
            optionLabelKey="label"
            isOptionEqualToValue={(option, value) => option.label === value.label}
            filterOptions={filterOptions}
            {...rest}
        />
    );
};

export default TimePickerAutocompleteHF;
