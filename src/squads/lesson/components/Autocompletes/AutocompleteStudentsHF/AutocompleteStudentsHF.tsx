import { memo } from "react";

import { Entities, ProviderTypes } from "src/common/constants/enum";
import { StudentsManyQuery } from "src/squads/lesson/service/bob/bob-types";

import AutocompleteReferenceHF, {
    AutocompleteReferenceHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteReferenceHF";

const AutocompleteStudentsHF = (
    props: Omit<AutocompleteReferenceHFProps<StudentsManyQuery["users"]>, "resource">
) => {
    return (
        <AutocompleteReferenceHF
            optionLabelKey="name"
            optionHelperText="email"
            searchFields={["keyword"]}
            {...props}
            resource={Entities.STUDENTS}
            data-testid="AutocompleteStudentsHF__autocomplete"
            id="AutocompleteStudentsHF__autocomplete"
            providerTypes={ProviderTypes.MANY_REFERENCE_STUDENT_LESSON}
        />
    );
};

export default memo(AutocompleteStudentsHF);
