import { useState, useMemo } from "react";

import debounce from "lodash/debounce";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME, KEY_CODE } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/squads/timesheet/common/constants/types";
import { Timesheet_LocationListByIdsQuery } from "src/squads/timesheet/service/bob/bob-types";

import { SxProps, Theme } from "@mui/material";
import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";

import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useQueryLocationList from "src/squads/timesheet/modules/timesheet-upsert/hooks/useQueryLocationList";
import useTimesheetInfoRules from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetInfoRules";

export interface LocationAutocompleteProps {
    disabled?: boolean;
}

const LocationAutocomplete = ({ disabled }: LocationAutocompleteProps) => {
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const [keyword, setKeyword] = useState<string>("");
    const [inputVal, setInputVal] = useState<string>("");

    const { data: locationList } = useQueryLocationList({ keyword, enabled: !disabled });
    const validateRules = useTimesheetInfoRules();

    const setKeywordDebounced = useMemo(
        () => debounce(setKeyword, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setKeyword]
    );

    const locationOptions = useMemo(
        () =>
            locationList.map(
                (location: ArrayElement<Timesheet_LocationListByIdsQuery["locations"]>) => ({
                    id: location.location_id,
                    value: location.name,
                })
            ),
        [locationList]
    );

    const disabledStyle: SxProps<Theme> = (theme) => {
        if (disabled) {
            return {
                backgroundColor: disabled && theme.palette.grey[50],
            };
        }
        return {};
    };

    return (
        <AutocompleteHF
            name="location"
            label={tTimesheetManagement("labels.location")}
            data-testid="TimesheetLocationAutocomplete__autocomplete"
            id="TimesheetLocationAutocompleteHF__autocomplete"
            required
            optionLabelKey="value"
            options={locationOptions}
            rules={{ required: validateRules.required }}
            getOptionSelectedField="id"
            disabled={disabled}
            inputValue={inputVal}
            limitChipText="Ellipsis"
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
            sx={disabledStyle}
        />
    );
};

export default LocationAutocomplete;
