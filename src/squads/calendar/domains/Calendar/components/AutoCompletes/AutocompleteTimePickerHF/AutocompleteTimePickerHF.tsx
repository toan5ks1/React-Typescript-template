import { useCallback } from "react";

import { DateTime } from "luxon";

import { FilterOptionsState } from "@mui/material";
import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteHF";

import { TimeAutocompleteOption } from "src/squads/calendar/domains/Calendar/common/types";
import { timeOptions } from "src/squads/calendar/domains/Calendar/common/utils/utils";

export interface AutocompleteTimePickerHFProps
    extends Omit<AutocompleteHFProps<TimeAutocompleteOption>, "options" | "optionLabelKey"> {
    minuteStep?: number;
}

const AutocompleteTimePickerHF = ({ minuteStep = 15, ...rest }: AutocompleteTimePickerHFProps) => {
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
            id="AutocompleteTimePickerHF__autocomplete"
            data-testid="AutocompleteTimePickerHF__autocomplete"
            key="time"
            options={timeOptions}
            optionLabelKey="label"
            isOptionEqualToValue={(option, value) => option.label === value.label}
            filterOptions={filterOptions}
            {...rest}
        />
    );
};

export default AutocompleteTimePickerHF;
