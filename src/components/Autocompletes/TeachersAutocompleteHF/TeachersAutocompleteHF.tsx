import { Entities } from "src/common/constants/enum";
import { TeacherManyReference } from "src/services/bob/bob-modify-types";

import AutocompleteReferenceHF, { AutocompleteReferenceHFProps } from "../AutocompleteReferenceHF";

const TeachersAutocompleteHF = (
    props: Omit<AutocompleteReferenceHFProps<TeacherManyReference>, "resource">
) => {
    return (
        <AutocompleteReferenceHF
            {...props}
            optionLabelKey="name"
            optionHelperText="email"
            data-testid="TeachersAutocompleteHF__autocomplete"
            id="TeachersAutocompleteHF__autocomplete"
            resource={Entities.TEACHERS}
            searchFields={["name", "email"]}
        />
    );
};

export default TeachersAutocompleteHF;
