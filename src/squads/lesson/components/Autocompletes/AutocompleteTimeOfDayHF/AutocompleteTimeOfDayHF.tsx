import { useCallback, useMemo } from "react";

import { DateTime } from "luxon";
import { TimeAutocompleteOption } from "src/squads/lesson/common/types";
import { createTimeList } from "src/squads/lesson/common/utils";

import { FilterOptionsState } from "@mui/material";
import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

export interface AutocompleteTimeOfDayHFProps
    extends Omit<AutocompleteHFProps<TimeAutocompleteOption>, "options" | "optionLabelKey"> {
    minuteStep?: number;
    baseDate?: TimeAutocompleteOption["value"];
}

const AutocompleteTimeOfDayHF = ({
    minuteStep = 15,
    baseDate,
    ...rest
}: AutocompleteTimeOfDayHFProps) => {
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
            id="AutocompleteTimeOfDayHF__autocomplete"
            data-testid="AutocompleteTimeOfDayHF__autocomplete"
            key="time"
            options={timeOptions}
            optionLabelKey="label"
            isOptionEqualToValue={(option, value) => option.label === value.label}
            filterOptions={filterOptions}
            {...rest}
        />
    );
};

export default AutocompleteTimeOfDayHF;
