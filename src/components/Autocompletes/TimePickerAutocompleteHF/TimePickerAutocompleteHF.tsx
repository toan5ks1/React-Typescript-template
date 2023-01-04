import { useCallback } from "react";

import { DateTime } from "luxon";
import { formatDate, timeOptions } from "src/common/utils/time";
import { TimeAutocompleteOption } from "src/models/time-autocomplete";

import { FilterOptionsState } from "@mui/material";

import AutocompleteHF, { AutocompleteHFProps } from "../AutocompleteHF";

export const getOptionTimePickerByDate = (deliveryDate?: Date): TimeAutocompleteOption => {
    return deliveryDate
        ? {
              label: formatDate(deliveryDate, "HH:mm"),
              value: deliveryDate,
          }
        : {
              label: "00:00",
              value: new Date(new Date().setHours(0, 0, 0, 0)),
          };
};

export interface TimePickerAutocompleteHFProps
    extends Omit<AutocompleteHFProps<TimeAutocompleteOption>, "options" | "optionLabelKey"> {
    minuteStep?: number;
}

const TimePickerAutocompleteHF = ({ minuteStep = 15, ...rest }: TimePickerAutocompleteHFProps) => {
    const filterOptions = useCallback(
        (options: TimeAutocompleteOption[], state: FilterOptionsState<TimeAutocompleteOption>) => {
            return options.filter((option) => {
                if (!state.inputValue && !(option.value!.getMinutes() % minuteStep)) {
                    return option;
                }

                if (
                    state.inputValue &&
                    DateTime.fromFormat(state.inputValue, "HH:mm").isValid &&
                    option.label.match(state.inputValue)
                ) {
                    return option;
                }

                if (
                    state.inputValue &&
                    option.label.match(state.inputValue) &&
                    !(option.value!.getMinutes() % minuteStep)
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
