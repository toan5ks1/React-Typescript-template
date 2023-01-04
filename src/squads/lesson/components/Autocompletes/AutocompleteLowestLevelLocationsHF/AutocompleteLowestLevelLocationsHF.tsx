import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LocationService } from "src/squads/lesson/service/bob/locations-service/types";

import AutocompleteReferenceHF, {
    AutocompleteReferenceHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteReferenceHF";

const AutocompleteLowestLevelLocationsHF = (
    props: Omit<
        AutocompleteReferenceHFProps<NsLesson_Bob_LocationService.RetrieveLocationsResponseLocation>,
        "resource"
    >
) => {
    return (
        <AutocompleteReferenceHF
            {...props}
            optionLabelKey="name"
            data-testid="AutocompleteLowestLevelLocationsHF__autocomplete"
            id="AutocompleteLowestLevelLocationsHF__autocomplete"
            resource={Entities.LOCATIONS}
            searchFields={["name"]}
        />
    );
};

export default AutocompleteLowestLevelLocationsHF;
