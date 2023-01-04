import { useState } from "react";

import { ERPModules } from "src/common/constants/enum";

import { Grid } from "@mui/material";
import AutocompleteLocation from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteLocation";
import SelectLocationType from "src/squads/calendar/domains/Calendar/components/Select/SelectLocationType";

import useResourceTranslate from "src/squads/calendar/hooks/useResourceTranslate";

interface FilterCalendarByLocationProps {
    onChange: (value: string) => void;
}

const FilterCalendarByLocation = ({
    onChange: handleSelectLocation,
}: FilterCalendarByLocationProps) => {
    const tCalendar = useResourceTranslate(ERPModules.SCHEDULE);
    const [locationTypeId, setLocationTypeId] = useState("");

    return (
        <Grid container spacing={1} alignItems="center">
            <Grid item>
                <SelectLocationType onChange={setLocationTypeId} />
            </Grid>
            <Grid item minWidth={439}>
                <AutocompleteLocation
                    data-testid="AutocompleteLocation__wrap"
                    key={locationTypeId ?? "temp_location_id"}
                    locationTypeId={locationTypeId}
                    size="small"
                    multiple={false}
                    disableClearable
                    required
                    placeholder={tCalendar("label.selectLocation")}
                    onChange={(_event, value) => {
                        value && handleSelectLocation(value["location_id"]);
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default FilterCalendarByLocation;
