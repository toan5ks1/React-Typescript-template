import { ArrayElement, OptionSelectType } from "src/common/constants/types";
import { Calendar_LocationTypesListQuery } from "src/squads/calendar/service/bob/bob-types";
import { getOptionsForSelectLocationType } from "src/squads/calendar/service/utils/utils";

import { OutlinedInput } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import SelectBase from "src/squads/calendar/domains/Calendar/components/Select/SelectBase/index";

import useLocationTypesList from "src/squads/calendar/domains/Calendar/hooks/useLocationTypesList";

const sx = {
    selectedValue: {
        fontSize: 14,
        lineHeight: "24px",
        width: "fit-content",
        letterSpacing: "0.4px",
        fontWeight: 500,
        height: "36px",
        textTransform: "capitalize",
    },
    option: {
        textTransform: "capitalize",
    },
};

const renderLabel = (option: LocationSelectType) => {
    const { value } = option;

    return <TypographyBase sx={sx.option}>{value}</TypographyBase>;
};

export interface SelectLocationTypeProps {
    onChange: (value: string) => void;
}

interface LocationSelectType extends OptionSelectType {
    id: ArrayElement<Calendar_LocationTypesListQuery["location_types"]>["location_type_id"];
    value:
        | Exclude<
              ArrayElement<Calendar_LocationTypesListQuery["location_types"]>["display_name"],
              null | undefined
          >
        | ArrayElement<Calendar_LocationTypesListQuery["location_types"]>["name"];
}

export default function SelectLocationType({
    onChange: handleSelectLocationType,
}: SelectLocationTypeProps) {
    const { data: locationTypes } = useLocationTypesList({
        onSuccess: (data) => {
            const { defaultValue } = getOptionsForSelectLocationType(data);
            defaultValue && handleSelectLocationType(defaultValue.location_type_id);
        },
    });

    const { locationTypesOptions, defaultValue } = getOptionsForSelectLocationType(locationTypes);

    const defaultLocationTypeId = defaultValue?.location_type_id;

    const options: LocationSelectType[] = locationTypesOptions.map((locationType) => ({
        id: locationType.location_type_id,
        value: locationType.name,
    }));

    return (
        <SelectBase<LocationSelectType>
            key={defaultLocationTypeId ?? "temp_location_type_id"}
            data-testid="SelectLocationType__select"
            displayEmpty
            sx={sx.selectedValue}
            renderLabel={renderLabel}
            input={<OutlinedInput margin="dense" size="small" />}
            options={options}
            defaultValue={defaultLocationTypeId ?? ""}
            onChange={(event) =>
                typeof event.target.value === "string" &&
                handleSelectLocationType(event.target.value)
            }
        />
    );
}
