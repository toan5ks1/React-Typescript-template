import AutocompleteBase, {
    AutocompleteBaseProps,
} from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteBase";

import useLocationsListByLocationTypes from "src/squads/calendar/domains/Calendar/hooks/useLocationsListByLocationTypes";

export interface LocationOptions {
    location_id: string;
    name: string;
    parentLocationName: string;
}
export interface AutocompleteLocationProps
    extends Omit<
        AutocompleteBaseProps<LocationOptions>,
        "options" | "loading" | "optionLabelKey" | "getOptionSelectedField"
    > {
    locationTypeId: string;
}

const AutocompleteLocation = ({ locationTypeId, ...props }: AutocompleteLocationProps) => {
    const { data: locations, isLoading } = useLocationsListByLocationTypes({
        locationTypeId: locationTypeId,
    });

    const options = locations.reduce((filtered: LocationOptions[], location) => {
        if (location.locations) {
            const locationHaveParent = {
                location_id: location.location_id,
                name: location.name,
                parentLocationName: location.locations.name,
            };
            filtered.push(locationHaveParent);
        }
        return filtered;
    }, []);

    return (
        <AutocompleteBase<LocationOptions>
            options={options}
            loading={isLoading}
            optionLabelKey="name"
            optionHelperText="parentLocationName"
            getOptionSelectedField="location_id"
            {...props}
        />
    );
};

export default AutocompleteLocation;
