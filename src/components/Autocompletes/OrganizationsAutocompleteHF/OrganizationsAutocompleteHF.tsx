import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { Users_OrganizationsManyReferenceQuery } from "src/services/bob/bob-types";

import AutocompleteReferenceHF, { AutocompleteReferenceHFProps } from "../AutocompleteReferenceHF";

const OrganizationsAutocompleteHF = (
    props: Omit<
        AutocompleteReferenceHFProps<
            ArrayElement<Users_OrganizationsManyReferenceQuery["organizations"]>
        >,
        "resource"
    >
) => {
    return (
        <AutocompleteReferenceHF
            id="OrganizationsAutocompleteHF__autocomplete"
            data-testid="OrganizationsAutocompleteHF__autocomplete"
            {...props}
            resource={Entities.ORGANIZATIONS}
            optionLabelKey="domain_name"
        />
    );
};

export default OrganizationsAutocompleteHF;
