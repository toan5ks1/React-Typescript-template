import { memo } from "react";

import { Entities, ProviderTypes } from "src/common/constants/enum";
import { StudentsManyReferenceByNameAndEmailQuery } from "src/services/bob/bob-types";

import AutocompleteReferenceHF, { AutocompleteReferenceHFProps } from "../AutocompleteReferenceHF";

const StudentsAutocompleteV2HF = (
    props: Omit<
        AutocompleteReferenceHFProps<StudentsManyReferenceByNameAndEmailQuery["users"]>,
        "resource"
    >
) => {
    return (
        <AutocompleteReferenceHF
            optionLabelKey="name"
            optionHelperText="email"
            searchFields={["keyword"]}
            {...props}
            resource={Entities.STUDENTS}
            data-testid="StudentsAutocompleteV2HF__autocomplete"
            id="StudentsAutocompleteV2HF__autocomplete"
            providerTypes={ProviderTypes.MANY_REFERENCE_STUDENT_LESSON}
        />
    );
};

export default memo(StudentsAutocompleteV2HF);
